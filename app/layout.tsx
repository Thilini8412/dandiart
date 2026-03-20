import BackToTop from "../components/BackToTop";
import "./globals.css";
import Link from "next/link";


//export default function RootLayout({ children }) {
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const charcoal = "#2D2926";
  const gold = "#D4AF37";
  const paper = "#FDFCF8";

  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        fontFamily: 'sans-serif', 
        backgroundColor: paper,
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}>
        
        <nav style={{
          padding: '20px',
          background: '#fff',
          borderBottom: '1px solid #eee',
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>HOME</Link>
          <Link href="/products" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>OUR PRODUCTS</Link>
        </nav>

        <div style={{ flex: 1 }}>
          {children}
        </div>

        <BackToTop />

        <footer style={{ 
          backgroundColor: charcoal, 
          color: paper, 
          padding: '80px 20px 40px 20px', 
          marginTop: '80px',
          borderTop: `4px solid ${gold}` 
        }}>
          <div style={{ 
            maxWidth: '1100px', 
            margin: '0 auto', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '60px' 
          }}>
            
            <div>
              <h3 style={{ color: gold, letterSpacing: '2px', fontSize: '20px', marginBottom: '15px' }}>THE MEETING PLACE</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.8', opacity: 0.8 }}>
                Questions about our materials or custom pieces? <br />
                Reach out to our partners or visit our studio.
              </p>
              <div style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '16px', color: gold }}>
                dandiart@outlook.com
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Heritage</h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.7 }}>
                Handcrafted jewelry inspired by indigenous heritage. Each piece tells a story of earth, art, and timeless elegance.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Connect</h4>
              <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.8 }}>📍 Darwin, Australia</div>
              <div style={{ fontSize: '14px', marginBottom: '20px', opacity: 0.8 }}>📞 +61 411 841 597</div>
              
              <div style={{ display: 'flex', gap: '15px' }}>
                <a 
                  href="https://www.instagram.com/dandiart" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  📸
                </a>

                <a 
                  href="https://www.facebook.com/dandiart1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  👤
                </a>
              </div>
            </div>
          </div>

          <div style={{ 
            maxWidth: '1100px', margin: '60px auto 0 auto', paddingTop: '30px', 
            borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', 
            justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', 
            gap: '20px', fontSize: '11px', opacity: 0.4, letterSpacing: '1px' 
          }}>
            <div>© 2026 DANDIART JEWELRY. ALL RIGHTS RESERVED.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span>SECURE WHATSAPP ORDERING</span>
              <span>DARWIN • AUSTRALIA</span>
            </div>
          </div>
        </footer>





      </body>
    </html>
  );
}