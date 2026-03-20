"use client";
import { useState } from "react";
import { urlFor } from "../sanityClient";


export default function ProductCard({ product, onAddToCart, cartCount }) {
  const [qty, setQty] = useState(0);
  const isOutOfStock = product.isOutOfStock;
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  // --- NEW ARRIVAL LOGIC ---
  const createdAt = new Date(product._createdAt);
  const now = new Date();
  const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);
  const isNew = diffInDays <= 7; // True if added in the last 7 days

const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
const [isZooming, setIsZooming] = useState(false);
const [isAdded, setIsAdded] = useState(false);
  
  // Your Brand Colors
  const ochre = "#A3432F";
  const gold = "#EBB035";
  const charcoal = "#2D2926";
  const paper = "#F9F4EE";

 /* const handleAdd = (e) => {
    if (qty > 0) {
      onAddToCart(product, qty, e);
      setQty(0);
    }
  };
  */

  const handleAdd = (e) => {
  if (qty > 0) {
    onAddToCart(product, qty, e);
    setIsAdded(true); // Trigger the success look
    setQty(0);

    // Reset the button back to normal after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  }
};

  return (
    <div style={{ 
      border: '1px solid rgba(0,0,0,0.05)', 
      padding: '15px', 
      borderRadius: '20px', 
      background: 'white', 
      position: 'relative', 
      opacity: isOutOfStock ? 0.7 : 1,
      display: 'flex', 
      flexDirection: 'column', 
      gap: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.04)', // Subtle professional shadow
      transition: 'transform 0.3s ease',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.08)' : '0 10px 30px rgba(0,0,0,0.04)'
    }}>
      
      {/* 1. PREMIUM BADGE */}
      {cartCount > 0 && (
        <div style={{
          position: 'absolute', top: '15px', left: '15px',
          background: ochre, color: 'white', padding: '4px 12px',
          borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', zIndex: 5,
          letterSpacing: '1px'
        }}>
          {cartCount} IN CART
        </div>
      )}

      {/* NEW ARRIVAL BADGE */}
      {isNew && !product.isOutOfStock && (
        <div style={{
          position: 'absolute', 
          top: '15px', 
          right: '15px', // Opposite side of the "In Cart" badge
          background: gold, // Using your Gold color for "New"
          color: charcoal, 
          padding: '4px 10px',
          borderRadius: '5px', 
          fontSize: '10px', 
          fontWeight: '900', 
          zIndex: 10,
          letterSpacing: '1px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          NEW ARRIVAL
        </div>
      )}

      {isNew && !isOutOfStock && (
      <div style={{
        position: 'absolute', top: '15px', right: '15px',
        background: gold, color: charcoal, padding: '4px 10px',
        borderRadius: '5px', fontSize: '10px', fontWeight: '900', zIndex: 10
      }}>
        NEW ARRIVAL
      </div>
    )}


      {/* 2. LIMITED EDITION BADGE (Bottom of Image) */}
      {product.isLimited && (
        <div style={{
          position: 'absolute', 
          //top: '50px', // Placed slightly below the New Arrival badge if both exist
          top: isNew ? '50px' : '15px', // Smart Logic: If it's also "New", move it down so they don't overlap!
          right: '15px',
          background: charcoal, 
          color: gold, 
          padding: '4px 10px',
          borderRadius: '5px', 
          fontSize: '10px', 
          fontWeight: '900', 
          zIndex: 10,
          border: `1px solid ${gold}`,
          letterSpacing: '1px'
        }}>
          LIMITED EDITION
        </div>
      )}

     

     

      {isOutOfStock && (
        <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#555', color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', zIndex: 2 }}>
          SOLD OUT
        </div>
      )}


      {/* IMAGE SECTION */}

      {/*
      <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
        <img 
          src={urlFor(product.image).url()} 
          style={{ 
            width: '100%', 
            height: '280px', 
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }} 
          alt={product.name}
        />
      </div>

      */}


      {/* IMAGE SECTION with Zoom Effect */}

      {/*
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          overflow: 'hidden', 
          borderRadius: '12px', 
          position: 'relative',
          cursor: 'pointer' 
        }}
      >
        <img 
          src={urlFor(product.image).url()} 
          style={{ 
            width: '100%', 
            height: '280px', 
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)', // Smooth "boutique" zoom
            transform: isHovered ? 'scale(1.1)' : 'scale(1)' 
          }} 
          alt={product.name}
        />

        */}
        
        {/* Subtle dark gradient overlay on hover to make it feel premium */}

        {/*}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.1) 100%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }} />
      </div>
      */}


    <div 
  onMouseMove={(e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // We use clientX/Y to ensure it works even if you've scrolled down the page
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPos({ x, y });
  }}
  onMouseEnter={() => setIsZooming(true)}
  onMouseLeave={() => setIsZooming(false)}
  style={{ 
    overflow: 'hidden', 
    borderRadius: '12px', 
    position: 'relative',
    height: '280px',
    cursor: 'crosshair',
    backgroundColor: '#f8f8f8', // Fallback color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}
>
  <img 
    src={urlFor(product.image).url()} 
    alt={product.name}
    style={{ 
      width: '100%', 
      height: '100%', 
      objectFit: 'cover',
     // transition: isZooming ? 'transform 0.1s ease-out' : 'transform 0.5s ease', 
     // transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, 
     // transform: isZooming ? 'scale(2.5)' : 'scale(1)',
      transition: 'transform 0.4s ease-out', 
      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, 
      transform: isZooming ? 'scale(1.6)' : 'scale(1)',
      display: 'block'
    }} 
  />

  {/* Only show label if not zooming and not out of stock */}
  {!isZooming && !isOutOfStock && (
    <div style={{
      position: 'absolute', bottom: '12px', right: '12px',
      background: 'rgba(255,255,255,0.9)', padding: '5px 10px',
      borderRadius: '6px', fontSize: '10px', color: charcoal,
      fontWeight: 'bold', pointerEvents: 'none', border: '1px solid #eee'
    }}>
      🔍 HOVER TO INSPECT
    </div>
  )}
</div>




      
      {/* TEXT SECTION */}
      {/*}
      <div style={{ padding: '0 5px' }}>
        <h2 style={{ fontSize: '18px', margin: '0', color: charcoal, fontWeight: '600', letterSpacing: '-0.5px' }}>
          {product.name}
        </h2>
        <p style={{ color: ochre, fontWeight: '700', fontSize: '20px', margin: '5px 0' }}>
          $  {product.price.toLocaleString()}
        </p>

 

      </div>

      */}



{/* --- 1. PRODUCT INFO SECTION --- */}
<div style={{ padding: '0 5px', marginTop: '5px' }}>
  {/* PRODUCT NAME */}
  <h2 style={{ 
    fontSize: '18px', 
    margin: '0', 
    color: charcoal, 
    fontWeight: '600', 
    letterSpacing: '-0.5px' 
  }}>
    {product.name}
  </h2>

  {/* SPECIAL DETAIL (Artisan Note) */}
  {product.details && (
    <div style={{ 
      fontSize: '12px', 
      fontStyle: 'italic', 
      color: '#777', 
      marginTop: '4px',
      marginBottom: '8px'
    }}>
      <span style={{ color: gold }}>✦</span> {product.details}
    </div>
  )}
</div>

{/* --- 2. PRICE & STOCK ROW --- */}
<div style={{ 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  padding: '0 5px' 
}}>
  <span style={{ fontSize: '18px', fontWeight: 'bold', color: ochre }}>
    $ {product.price}
  </span>
  
  {/* Compact Inline Warning */}
  {product.isLowStock && !isOutOfStock && (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span className="pulse-dot" style={{ 
        width: '6px', height: '6px', backgroundColor: '#E63946', borderRadius: '50%',
        display: 'inline-block'
      }} />
      <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#E63946' }}>
        LAST 2
      </span>
    </div>
  )}
</div>



      {!isOutOfStock ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
          
          {/* 2. MODERN QUANTITY SELECTOR */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            backgroundColor: paper, 
            borderRadius: '12px', 
            padding: '4px' 
          }}>
            <button 
              onClick={() => setQty(q => q > 0 ? q - 1 : 0)} 
              style={{ background: 'white', border: 'none', borderRadius: '8px', width: '35px', height: '35px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: charcoal, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
            >–</button>
            
            <span style={{ fontWeight: '700', color: charcoal, fontSize: '16px' }}>{qty}</span>
            
            <button 
              onClick={() => setQty(q => q + 1)} 
              style={{ background: 'white', border: 'none', borderRadius: '8px', width: '35px', height: '35px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: charcoal, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
            >+</button>
          </div>

          {/* 3. PRIMARY ACTION BUTTON */}
         <button 
          onClick={handleAdd}
          disabled={qty === 0 && !isAdded}
          style={{ 
          // If added, change background to a "Success" color
          background: isAdded ? "#4CAF50" : (qty === 0 ? '#E5E5E5' : charcoal), 
          color: 'white', 
          padding: '14px', 
          borderRadius: '12px', 
          fontWeight: '700', 
          border: 'none', 
          cursor: (qty === 0 && !isAdded) ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Elegant "pop" animation
          boxShadow: (qty > 0 || isAdded) ? `0 4px 15px rgba(0,0,0,0.15)` : 'none',
          transform: isAdded ? 'scale(1.02)' : 'scale(1)', // Slight grow when successful
          width: '100%'
        }}
>
  {/* --- DYNAMIC BUTTON TEXT --- */}
  {isAdded ? (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      ✓ ADDED TO BAG
    </span>
  ) : (
    qty === 0 ? "Select Amount" : "Add to Order"
  )}
</button>

         

          
        </div>
      ) : (
        <div style={{ 
          background: paper, 
          color: '#999', 
          padding: '14px', 
          textAlign: 'center', 
          borderRadius: '12px', 
          fontSize: '14px', 
          fontWeight: '600',
          border: '1px dashed #ccc'
        }}>
          Currently Unavailable
        </div>
      )}
    </div>
  );
}