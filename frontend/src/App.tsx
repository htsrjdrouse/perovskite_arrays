import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Intro from './components/Intro';
import RecipeViewer from './components/RecipeViewer';

const Layout: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{
        width: '250px',
        background: '#1a1a2e',
        color: '#eee',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#00d4ff' }}>📖 Notebook TOC</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/" style={{ color: '#00d4ff', textDecoration: 'none' }}>🏠 Introduction</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/recipes" style={{ color: '#00d4ff', textDecoration: 'none' }}>🧪 Mimic Ink Recipes</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/experiments" style={{ color: '#00d4ff', textDecoration: 'none' }}>🔬 Experiments</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/hardware" style={{ color: '#00d4ff', textDecoration: 'none' }}>⚙️ Hardware</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/software" style={{ color: '#00d4ff', textDecoration: 'none' }}>💻 Software</Link>
          </li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: '20px', background: '#f8fafc' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Intro />} />
          <Route path="recipes" element={<RecipeViewer />} />
          <Route path="experiments" element={<div><h1>Experiments</h1><p>Coming soon...</p></div>} />
          <Route path="hardware" element={<div><h1>Hardware</h1><p>Coming soon...</p></div>} />
          <Route path="software" element={<div><h1>Software</h1><p>Coming soon...</p></div>} />
        </Route>
      </Routes>
    </Router>
  );
}
