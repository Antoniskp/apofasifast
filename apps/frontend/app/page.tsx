'use client';

import { useEffect, useState } from 'react';
import { initKeycloak, login, isAuthenticated } from '../lib/keycloak';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [keycloakReady, setKeycloakReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const authenticated = await initKeycloak();
      setKeycloakReady(true);
      if (authenticated) {
        router.push('/dashboard');
      }
    };
    init();
  }, [router]);

  const handleLogin = () => {
    login();
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <h1 style={styles.title}>Voting Platform</h1>
        <p style={styles.description}>
          A secure, transparent, and self-hosted voting platform built with modern web technologies.
        </p>
        
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <h3>🔒 Secure Authentication</h3>
            <p>Enterprise-grade authentication powered by Keycloak</p>
          </div>
          <div style={styles.featureCard}>
            <h3>📊 Transparent Voting</h3>
            <p>All votes are recorded with cryptographic audit trails</p>
          </div>
          <div style={styles.featureCard}>
            <h3>🏠 Self-Hosted</h3>
            <p>Full control over your data and infrastructure</p>
          </div>
        </div>

        {keycloakReady && !isAuthenticated() && (
          <button style={styles.loginButton} onClick={handleLogin}>
            Login to Continue
          </button>
        )}
      </main>
      
      <footer style={styles.footer}>
        <p>Built with Next.js, NestJS, and Keycloak</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1a1a1a',
  },
  description: {
    fontSize: '1.25rem',
    textAlign: 'center' as const,
    maxWidth: '600px',
    marginBottom: '3rem',
    color: '#666',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '900px',
    marginBottom: '3rem',
  },
  featureCard: {
    padding: '1.5rem',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  loginButton: {
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: 'white',
    background: '#0070f3',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  footer: {
    padding: '2rem',
    textAlign: 'center' as const,
    borderTop: '1px solid #eaeaea',
    color: '#666',
  },
};
