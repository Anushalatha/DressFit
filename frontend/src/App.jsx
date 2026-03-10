import TryOnPage from './pages/TryOnPage.jsx';

export default function App() {
  const path = window.location.pathname;

  if (path === '/try-on') {
    return <TryOnPage />;
  }

  return (
    <div className="tryon-root">
      <header className="tryon-header">
        <h1>AI Fashion Futures</h1>
        <p>Welcome. Use the link below to open the Virtual Try-On experience.</p>
      </header>
      <main className="tryon-main">
        <div className="tryon-left">
          <div className="tryon-panel">
            <h2 className="tryon-panel-title">Virtual Try-On</h2>
            <p>
              Open the dedicated Try-On page at <code>/try-on</code> to adjust measurements and
              preview garments on the 3D avatar.
            </p>
            <p>
              When running locally, visit{' '}
              <a href="/try-on" style={{ color: 'var(--accent)' }}>
                /try-on
              </a>{' '}
              in your browser.
            </p>
          </div>
        </div>
        <section className="tryon-right" />
      </main>
    </div>
  );
}


