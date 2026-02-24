import React, { useState, useEffect } from 'react';

interface DocFile {
  name: string;
  url: string;
}

const Documentation: React.FC = () => {
  const [docs, setDocs] = useState<DocFile[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/docs')
      .then(res => res.json())
      .then(data => setDocs(data))
      .catch(err => console.error('Failed to load docs:', err));
  }, []);

  const loadDoc = async (filename: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/docs/${filename}`);
      const text = await res.text();
      setContent(text);
      setSelectedDoc(filename);
    } catch (err) {
      console.error('Failed to load document:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
      <div style={{ width: '250px', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
        <h2 style={{ marginBottom: '15px' }}>📄 Documentation</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {docs.map(doc => (
            <li key={doc.name} style={{ marginBottom: '10px' }}>
              <button
                onClick={() => loadDoc(doc.name)}
                style={{
                  background: selectedDoc === doc.name ? '#00d4ff' : '#fff',
                  color: selectedDoc === doc.name ? '#fff' : '#333',
                  border: '1px solid #ddd',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                {doc.name.replace('.md', '')}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px', background: '#fff', borderRadius: '8px', overflow: 'auto' }}>
        {loading && <p>Loading...</p>}
        {!selectedDoc && !loading && <p>Select a document to view</p>}
        {selectedDoc && !loading && (
          <div style={{ 
            whiteSpace: 'pre-wrap', 
            fontFamily: 'system-ui, -apple-system, sans-serif', 
            lineHeight: '1.8',
            fontSize: '16px',
            color: '#333'
          }}>
            {content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i} style={{ fontSize: '2em', marginTop: '0.5em', marginBottom: '0.5em' }}>{line.slice(2)}</h1>;
              if (line.startsWith('## ')) return <h2 key={i} style={{ fontSize: '1.5em', marginTop: '0.5em', marginBottom: '0.5em' }}>{line.slice(3)}</h2>;
              if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize: '1.2em', marginTop: '0.5em', marginBottom: '0.5em' }}>{line.slice(4)}</h3>;
              if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight: 'bold', margin: '0.5em 0' }}>{line.slice(2, -2)}</p>;
              if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: '2em' }}>{line.slice(2)}</li>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} style={{ margin: '0.5em 0' }}>{line}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documentation;
