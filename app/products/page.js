"use client";
import { useState, useEffect, Suspense } from "react"; // Added Suspense
import { useSearchParams } from "next/navigation";
import { client } from "../../sanityClient";
import ProductCard from "../../components/ProductCard";

export const dynamic = 'force-dynamic';

// --- 1. Sub-component containing all your working logic ---
function ProductsGallery() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);

  // --- CART & SIDEBAR STATE ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- Indigenous Earth Palette ---
  const ochre = "#A3432F"; 
  const gold = "#EBB035";
  const charcoal = "#2D2926";
  const paper = "#F9F4EE"; 

  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) setCategory(catFromUrl);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch('*[_type == "product"]');
        setProducts(data || []);
        setFiltered(data || []);
      } catch (err) {
        console.error("Sanity connection failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (category !== "All") result = result.filter((item) => item.category === category);
    if (searchTerm) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortBy === "lowToHigh") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "highToLow") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "nameAsc") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "latest")  result.sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt));

    setFiltered(result);
  }, [category, searchTerm, sortBy, products]);

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("All");
    setSortBy("latest");
  };

  const addToCart = (product, quantity, event) => {
    if (quantity <= 0) return;
    if (event) {
      const flyer = document.createElement('img');
      flyer.src = product.image?.asset?.url || "/placeholder.png"; 
      flyer.className = 'flying-item';
      flyer.style.setProperty('--start-x', `${event.clientX}px`);
      flyer.style.setProperty('--start-y', `${event.clientY}px`);
      flyer.style.width = '50px';
      flyer.style.height = '50px';
      document.body.appendChild(flyer);
      setTimeout(() => {
        flyer.remove();
        setIsCartOpen(false);
      }, 800);
    }
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const sendWhatsApp = () => {
    const phone = "94716095523"; 
    if (cart.length === 0) return;
    let message = `*DANDIART ORDER REQUEST*%0A--------------------------%0A`;
    cart.forEach((item, i) => {
      message += `${i + 1}. *${item.name}* (x${item.quantity}) - $ ${item.price * item.quantity}%0A`;
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `--------------------------%0A*TOTAL: $ ${total}*%0A%0AIs this order available?`;
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px', color: ochre, backgroundColor: paper, minHeight: '100vh' }}>
      <h2 style={{ fontWeight: '300', letterSpacing: '2px' }}>GATHERING COLLECTION...</h2>
    </div>
  );

  return (
    <main style={{ backgroundColor: paper, minHeight: '100vh', padding: '20px', position: 'relative' }}>
      
      {/* --- 1. TOP RIGHT CART ICON --- */}
      <div 
        onClick={() => setIsCartOpen(true)}
        style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 1100,
          backgroundColor: charcoal, width: '60px', height: '60px', borderRadius: '50%',
          display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)', border: `2px solid ${gold}`
        }}
      >
        <span style={{ fontSize: '24px' }}>🛒</span>
        {cart.length > 0 && (
          <div style={{
            position: 'absolute', top: '0', right: '0', backgroundColor: ochre, color: 'white',
            borderRadius: '50%', width: '22px', height: '22px', fontSize: '12px',
            display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', border: `2px solid ${paper}`
          }}>
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        )}
      </div>

      {/* --- 2. RIGHT SIDE OVERLAY DRAWER --- */}
      {isCartOpen && (
        <>
          <div onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1200, backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '400px', height: '100%', backgroundColor: 'white', zIndex: 1300, boxShadow: '-5px 0 25px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: charcoal, margin: 0 }}>Your Order</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cart.length === 0 ? <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>Your cart is empty</p> : 
                cart.map(item => (
                  <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: charcoal }}>{item.name}</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Qty: {item.quantity} × $ {item.price}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold', color: ochre }}>$ {item.quantity * item.price}</div>
                      <button onClick={() => setCart(cart.filter(i => i._id !== item._id))} style={{ background: 'none', border: 'none', color: '#999', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
                    </div>
                  </div>
                ))
              }
            </div>
            {cart.length > 0 && (
              <div style={{ borderTop: `2px solid ${gold}`, paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: charcoal }}>
                  <span>Total:</span><span>$ {cart.reduce((s, i) => s + (i.price * i.quantity), 0)}</span>
                </div>
                <button onClick={sendWhatsApp} style={{ width: '100%', backgroundColor: '#25D366', color: 'white', border: 'none', padding: '18px', borderRadius: '50px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginBottom: '10px' }}>ORDER VIA WHATSAPP</button>
                <button onClick={() => { if(window.confirm("Clear all?")) setCart([]) }} style={{ width: '100%', background: 'none', border: 'none', color: ochre, cursor: 'pointer', fontSize: '13px' }}>Clear Entire Order</button>
              </div>
            )}
          </div>
        </>
      )}

       <header style={{ textAlign: 'center', marginBottom: '30px', marginTop: '40px' }}>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 54px)', color: charcoal, fontWeight: '800', textTransform: 'uppercase' }}>
          OUR <span style={{ color: ochre }}>COLLECTION</span>
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: i % 2 === 0 ? gold : ochre }} />
          ))}
        </div>
      </header>

      {/* FILTER BAR CONTAINER */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 40px auto', padding: '0 10px' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          backgroundColor: 'white', 
          padding: '25px', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          
          {/* SEARCH & SORT ROW */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 2, minWidth: '250px' }}>
              <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
              <input 
                type="text" 
                placeholder="Search for jewelry..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '14px 14px 14px 50px', borderRadius: '12px', border: '1px solid #eee', outline: 'none', backgroundColor: paper, fontSize: '15px' }}
              />
            </div>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ flex: 1, minWidth: '150px', padding: '14px', borderRadius: '12px', border: '1px solid #eee', backgroundColor: paper, cursor: 'pointer', outline: 'none', fontWeight: 'bold', color: charcoal }}
            >
              <option value="latest">Newest First</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="nameAsc">Name: A-Z</option>
            </select>
          </div>

          {/* CATEGORY BUTTONS ROW */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', marginRight: '10px' }}>Filter by:</span>
            {["All", "earrings", "necklaces", "rings"].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)} 
                style={{ 
                  padding: '10px 20px', 
                  borderRadius: '10px', 
                  border: 'none', 
                  cursor: 'pointer', 
                  backgroundColor: category === cat ? ochre : '#ddd',
                  color: category === cat ? 'white' : charcoal,
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize'
                }}
              >
                {cat}
              </button>
            ))}

            {(searchTerm || category !== "All") && (
              <button 
                onClick={resetFilters} 
                style={{ background: 'none', border: 'none', color: ochre, cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- 4. PRODUCT GRID --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', maxWidth: '1100px', margin: '0 auto' }}>
        {filtered.map((item) => {
          const cartItem = cart.find(c => c._id === item._id);
          return (
            <ProductCard key={item._id} product={item} onAddToCart={addToCart} cartCount={cartItem ? cartItem.quantity : 0} />
          );
        })}
      </div>
    </main>
  );
}

// --- 2. THE FINAL EXPORT WRAPPER ---
// This is what satisfies the Next.js build requirement
export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading Gallery...</div>}>
      <ProductsGallery />
    </Suspense>
  );
}