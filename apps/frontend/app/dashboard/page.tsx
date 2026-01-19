'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getKeycloak, logout, getToken } from '../../lib/keycloak';

interface UserInfo {
  userId: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
}

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const keycloak = getKeycloak();
      
      if (!keycloak.authenticated) {
        router.push('/');
        return;
      }

      const token = getToken();
      if (!token) {
        router.push('/');
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error('Failed to fetch user info');
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Voting Platform Dashboard</h1>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>User Information</h2>
          <div style={styles.infoGrid}>
            <div style={styles.infoRow}>
              <span style={styles.label}>Username:</span>
              <span style={styles.value}>{userInfo.username}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Email:</span>
              <span style={styles.value}>{userInfo.email}</span>
            </div>
            {userInfo.firstName && (
              <div style={styles.infoRow}>
                <span style={styles.label}>First Name:</span>
                <span style={styles.value}>{userInfo.firstName}</span>
              </div>
            )}
            {userInfo.lastName && (
              <div style={styles.infoRow}>
                <span style={styles.label}>Last Name:</span>
                <span style={styles.value}>{userInfo.lastName}</span>
              </div>
            )}
            <div style={styles.infoRow}>
              <span style={styles.label}>User ID:</span>
              <span style={styles.value}>{userInfo.userId}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Roles:</span>
              <span style={styles.value}>{userInfo.roles.join(', ')}</span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Welcome to the Voting Platform</h2>
          <p style={styles.cardText}>
            This is your secure dashboard. Future features will include:
          </p>
          <ul style={styles.featureList}>
            <li>Create and manage voting sessions</li>
            <li>Cast votes securely</li>
            <li>View voting results</li>
            <li>Audit trail verification</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f5f5',
  },
  header: {
    background: 'white',
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #eaeaea',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  logoutButton: {
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    color: 'white',
    background: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  main: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
  },
  card: {
    background: 'white',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#1a1a1a',
  },
  cardText: {
    marginBottom: '1rem',
    color: '#666',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem',
    background: '#f9f9f9',
    borderRadius: '4px',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    color: '#333',
  },
  featureList: {
    paddingLeft: '1.5rem',
    color: '#666',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem',
    color: '#666',
  },
};
