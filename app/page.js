/*import { client } from "../sanityClient";
import ProductCard from "../components/ProductCard";

async function getProducts() {
const query = '*[_type == "product"]';
return await client.fetch(query);
}

export default async function Home() {
const products = await getProducts();

return (
<main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
<h1 style={{ textAlign: 'center' }}>DandiArt Jewelry</h1>
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
{products.map((item) => (
<ProductCard key={item._id} product={item} />
))}
</div>
</main>
);
}
*/


/*
import Link from "next/link";

export default function Home() {
return (
<main style={{ textAlign: 'center', padding: '100px 20px' }}>
<h1>DandiArt Jewelry</h1>
<p>Handcrafted Elegance & Artistry</p>
<Link href="/products" style={{ background: 'black', color: 'white', padding: '10px 20px', textDecoration: 'none' }}>
Explore Our Collection
</Link>
</main>
);
}

*/


"use client";
import Link from 'next/link';


export default function HomePage() {
  const ochre = "#A3432F";
  const charcoal = "#2D2926";
  const paper = "#F9F4EE";
  const gold = "#EBB035";

  return (
    <main style={{ backgroundColor: paper, minHeight: '100vh', color: charcoal, overflowX: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      

      {/* --- 1. BRAND-FIRST HERO SECTION --- */}
      <section style={{ 
        display: 'flex', 
        minHeight: '80vh', 
        alignItems: 'center', 
        position: 'relative',
        padding: '0 5%' 
      }}>
        {/* Subtle Background Ghost Text */}
        <div style={{ 
          position: 'absolute', 
          top: '15%', 
          left: '-2%', 
          fontSize: '12vw', 
          fontWeight: '900', 
          color: 'rgba(163, 67, 47, 0.03)', 
          whiteSpace: 'nowrap',
          zIndex: 0,
          pointerEvents: 'none'
        }}>
          DANDIART
        </div>

        <div style={{ flex: 1, zIndex: 1 }}>
          {/* Brand Identity Label */}
          <h2 style={{ fontSize: '12px', letterSpacing: '6px', color: ochre, marginBottom: '10px', fontWeight: '800' }}>
            EST. 2026
          </h2>
          
          {/* Massive Brand Name */}
          <h1 style={{ 
            fontSize: 'clamp(50px, 9vw, 120px)', 
            lineHeight: '0.8', 
            margin: '0 0 25px 0', 
            fontWeight: '900',
            color: charcoal,
            letterSpacing: '-3px'
          }}>
            DANDI<span style={{ color: ochre }}>ART</span>
          </h1>

          {/* Elevated Slogan */}
          <p style={{ 
            fontSize: '16px', 
            textTransform: 'uppercase', 
            letterSpacing: '5px', 
            color: charcoal, 
            fontWeight: '300',
            marginBottom: '35px'
          }}>
            Earth <span style={{ color: ochre }}>•</span> Into <span style={{ color: ochre }}>•</span> Jewelry
          </p>

          <p style={{ maxWidth: '400px', marginBottom: '40px', fontSize: '17px', lineHeight: '1.6', opacity: 0.7 }}>
            Celebrate the connection between ancient materials and modern adornment. Hand-painted, hand-shaped, and heart-led.
          </p>

          <Link href="/products">
            <button style={{ 
              padding: '20px 50px', 
              backgroundColor: charcoal, 
              color: 'white', 
              border: 'none', 
              fontSize: '13px', 
              letterSpacing: '4px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: `8px 8px 0px ${gold}` 
            }}>
              Enter Gallery
            </button>
          </Link>
        </div>

        {/* Hero Image Pill */}
        <div style={{ flex: 1.2, position: 'relative', height: '65vh', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ 
            width: '85%', 
            height: '100%', 
            backgroundColor: '#e0e0e0', 
            borderRadius: '200px 0 0 200px',
            overflow: 'hidden',
            borderRight: `20px solid ${ochre}`
          }}>
            {/* <img src="/hero.jpg" style={{width: '100%', height: '100%', objectFit: 'cover'}} /> */}

            <img 
      src="/Pic/2.jpg" 
      alt="Close up of hand-painted dots on DandiArt jewelry" 
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover' 
      }} 
    />
          </div>


     


{/* Dot Pattern decoration - matches the paint theme */}
  <div style={{ position: 'absolute', bottom: '10%', left: '0', display: 'grid', gridTemplateColumns: 'repeat(3, 12px)', gap: '15px' }}>
    {[...Array(9)].map((_, i) => (
      <div key={i} style={{ 
        width: '8px', 
        height: '8px', 
        borderRadius: '50%', 
        backgroundColor: i % 2 === 0 ? ochre : gold,
        boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.2)' // Makes them look like raised paint dots
      }} />
    ))}
  </div>
</div>

        
      </section>

      {/* --- 2. THE STORY SECTION --- */}
      <section style={{ padding: '120px 5%', textAlign: 'center', backgroundColor: charcoal, color: paper }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '14px', letterSpacing: '6px', textTransform: 'uppercase', color: gold, marginBottom: '30px' }}>
            The Essence of DandiArt
          </h2>
          <p style={{ fontSize: 'clamp(22px, 4vw, 36px)', lineHeight: '1.3', fontWeight: '300', fontStyle: 'italic' }}>
            "We listen to the land. We harvest with respect. We create with spirit."
          </p>
        </div>
      </section>

  


      {/* --- 3. CATEGORY TILES (Staggered) --- */}

{/*}
      <section style={{ padding: '100px 5%', display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
        <Link href="/products" style={{ flex: 1.3, minWidth: '320px', textDecoration: 'none' }}>
          <div style={{ position: 'relative', height: '550px', backgroundColor: '#ddd' }}>
            <div style={{ position: 'absolute', bottom: '-20px', right: '20px', backgroundColor: paper, padding: '20px 40px', boxShadow: '10px 10px 0px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: charcoal, fontSize: '30px', margin: 0, fontWeight: '900' }}>EARRINGS</h3>
              <p style={{ color: ochre, fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px' }}>DISCOVER</p>
            </div>
          </div>
        </Link>

       /* <Link href="/products" style={{ flex: 1, minWidth: '320px', textDecoration: 'none', marginTop: '120px' }}>
          <div style={{ position: 'relative', height: '550px', backgroundColor: '#ccc' }}>
            <div style={{ position: 'absolute', top: '-20px', left: '20px', backgroundColor: paper, padding: '20px 40px', boxShadow: '10px 10px 0px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: charcoal, fontSize: '30px', margin: 0, fontWeight: '900' }}>NECKLACES</h3>
              <p style={{ color: ochre, fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px' }}>DISCOVER</p>
            </div>
          </div>
        </Link>

        
      </section>
      */
}

      

<section style={{ padding: '100px 5%', display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
  
  {/* EARRINGS TILE */}
 {/*} <Link href="/products" style={{ flex: 1.3, minWidth: '320px', textDecoration: 'none' }}>*/}
  <Link href="/products?category=earrings" style={{ flex: 1.3, minWidth: '320px', textDecoration: 'none' }}>
    <div 
      style={{ 
        position: 'relative', 
        height: '550px', 
        overflow: 'hidden', 
        backgroundColor: '#f0f0f0',
        transition: 'transform 0.4s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <img 
        src="/Pic/earrings-cat.jpg" // Put a nice earring photo here
        alt="DandiArt Earrings"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ 
        position: 'absolute', 
        bottom: '-20px', 
        right: '20px', 
        backgroundColor: paper, 
        padding: '20px 40px', 
        boxShadow: '15px 15px 40px rgba(0,0,0,0.1)',
        zIndex: 2
      }}>
        <h3 style={{ color: charcoal, fontSize: '30px', margin: 0, fontWeight: '900' }}>EARRINGS</h3>
        <p style={{ color: ochre, fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px', marginTop: '5px' }}>DISCOVER</p>
      </div>
    </div>
  </Link>

  {/* NECKLACES TILE */}
 {/* <Link href="/products" style={{ flex: 1, minWidth: '320px', textDecoration: 'none', marginTop: '120px' }}>*/}
  <Link href="/products?category=necklaces" style={{ flex: 1, minWidth: '320px', textDecoration: 'none', marginTop: '120px' }}>
    <div 
      style={{ 
        position: 'relative', 
        height: '550px', 
        overflow: 'hidden', 
        backgroundColor: '#e8e8e8',
        transition: 'transform 0.4s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <img 
        src="/Pic/necklaces-cat.jpg" // Put a nice necklace photo here
        alt="DandiArt Necklaces"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ 
        position: 'absolute', 
        top: '-20px', 
        left: '20px', 
        backgroundColor: paper, 
        padding: '20px 40px', 
        boxShadow: '15px 15px 40px rgba(0,0,0,0.1)',
        zIndex: 2
      }}>
        <h3 style={{ color: charcoal, fontSize: '30px', margin: 0, fontWeight: '900' }}>NECKLACES</h3>
        <p style={{ color: ochre, fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px', marginTop: '5px' }}>DISCOVER</p>
      </div>
    </div>
  </Link>
</section>


      {/* --- 4. THE MEETING PLACE --- */}

      {/*
      <footer style={{ padding: '80px 5%', borderTop: `1px solid rgba(0,0,0,0.1)`, textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: ochre, fontSize: '24px', marginBottom: '20px' }}>The Meeting Place</h2>
          <p style={{ lineHeight: '1.8', opacity: 0.7 }}>
            Questions about our materials or custom pieces? <br />
            Reach out to our vendor partners or visit our studio.
          </p>
          <div style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '18px' }}>
            hello@dandiart.com.au
          </div>
          <div style={{ marginTop: '10px', color: gold }}>
            Sydney, Australia • Handcrafted Locally
          </div>
        </div>
        <div style={{ marginTop: '60px', fontSize: '12px', opacity: 0.4, letterSpacing: '2px' }}>
          © 2026 DANDIART JEWELRY. ALL RIGHTS RESERVED.
        </div>
      </footer>

      */}

      {/* --- WHATSAPP CONCIERGE SECTION --- */}
<section style={{ 
  backgroundColor: '#f9f9f9', // Very light grey to separate it from the white body
  padding: '100px 20px',
  textAlign: 'center',
  borderTop: '1px solid #eee'
}}>
  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
    <span style={{ 
      color: ochre, 
      letterSpacing: '3px', 
      fontSize: '12px', 
      fontWeight: 'bold', 
      textTransform: 'uppercase' 
    }}>
      Bespoke Service
    </span>
    
    <h2 style={{ 
      fontSize: '32px', 
      fontFamily: 'serif', 
      marginTop: '10px', 
      color: charcoal 
    }}>
      Design Your Own Story
    </h2>
    
    <p style={{ 
      lineHeight: '1.8', 
      color: '#666', 
      marginBottom: '40px',
      fontSize: '16px' 
    }}>
      Looking for a custom size, a specific gemstone, or a gift for someone special? 
      Chat with us directly for personalized styling advice.
    </p>

    <a 
      href="https://wa.me/94716095523?text=Hi%20Dandiart,%20I'm%20interested%20in%20a%20custom%20jewelry%20piece." 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        backgroundColor: charcoal,
        color: gold,
        padding: '18px 40px',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
        letterSpacing: '1px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <span style={{ fontSize: '20px' }}>💬</span>
      MESSAGE ON WHATSAPP
    </a>
  </div>
</section>

    </main>
  );
}