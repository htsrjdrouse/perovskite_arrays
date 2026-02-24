import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

interface DocPageProps {
  filename: string;
}

const DocPage: React.FC<DocPageProps> = ({ filename }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/docs/${filename}`)
      .then(res => res.text())
      .then(text => {
        const html = marked(text) as string;
        setContent(html);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load document:', err);
        setLoading(false);
      });
  }, [filename]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#000' }}>
      <style>{`
        h1 { color: #00d4ff; }
        ul { margin-left: 20px; }
        li { margin-bottom: 8px; }
        img { max-width: 100%; height: auto; margin: 20px 0; }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default DocPage;
