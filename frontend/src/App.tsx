import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Intro from './components/Intro';
import RecipeViewer from './components/RecipeViewer';
import DocPage from './components/DocPage';

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
        <h2 style={{ marginBottom: '20px', color: '#00d4ff' }}>📖 NOTEBOOK</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/" style={{ color: '#00d4ff', textDecoration: 'none' }}>📋 Executive Summary</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/project-overview" style={{ color: '#00d4ff', textDecoration: 'none' }}>📊 Project Overview</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/fabrication-workflow" style={{ color: '#00d4ff', textDecoration: 'none' }}>⚗️ Fabrication Workflow</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/current-progress" style={{ color: '#00d4ff', textDecoration: 'none' }}>✅ Current Progress</Link>
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
          <Route index element={<DocPage filename="executive_summary.md" />} />
          <Route path="project-overview" element={<DocPage filename="project_overview.md" />} />
          <Route path="fabrication-workflow" element={<DocPage filename="fabrication_workflow.md" />} />
          <Route path="current-progress" element={<DocPage filename="current_progress.md" />} />
          <Route path="recipes" element={<RecipeViewer />} />
        </Route>
      </Routes>
    </Router>
  );
}
