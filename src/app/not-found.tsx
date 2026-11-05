export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      fontFamily: 'system-ui, sans-serif',
      color: '#444',
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
