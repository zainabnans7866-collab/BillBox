import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>📦 BillBox</h2>
        <div>
          <Link to="/login" style={styles.navLink}>Log In</Link>
          <Link to="/signup" style={styles.navButton}>Sign Up</Link>
        </div>
      </nav>

      <section style={styles.hero}>
        <h1 className="text-6xl font-bold text-blue-600">
          BillBox
        </h1>
        <p style={styles.subtitle}>
          Snap a photo of your bill. BillBox reads it, tracks your warranty,
          and reminds you before it expires.
        </p>
        <Link to="/signup" style={styles.cta}>Get Started Free</Link>
      </section>

      <section style={styles.features}>
        <div style={styles.featureCard}>
          <h3>📸 Snap & Save</h3>
          <p>Upload a photo of any bill — we extract the details automatically using AI.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>⏰ Never Forget</h3>
          <p>Get email reminders before your warranties expire.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>📊 Track Everything</h3>
          <p>See your spending and warranty status in one clean dashboard.</p>
        </div>
      </section>
    </div>
  )
}

const styles = {
  container: { fontFamily: 'system-ui, sans-serif' },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 3rem',
  },
  logo: { margin: 0 },
  navLink: {
    marginRight: '1.5rem',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 500,
  },
  navButton: {
    textDecoration: 'none',
    background: '#2563eb',
    color: 'white',
    padding: '0.5rem 1.25rem',
    borderRadius: '6px',
  },
  hero: {
    textAlign: 'center',
    padding: '5rem 2rem',
    background: 'linear-gradient(135deg, #eff6ff, #f5f5f5)',
  },
  title: {
    fontSize: '2.75rem',
    maxWidth: '700px',
    margin: '0 auto 1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    maxWidth: '550px',
    margin: '0 auto 2rem',
  },
  cta: {
    textDecoration: 'none',
    background: '#2563eb',
    color: 'white',
    padding: '0.9rem 2rem',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 600,
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '4rem 2rem',
    flexWrap: 'wrap',
  },
  featureCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    maxWidth: '280px',
    textAlign: 'center',
  },
}