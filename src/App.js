// App.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import TemplateEditor from './components/TemplateEditor';
import WhatsAppPreview from './components/WhatsAppPreview';
import ThemeToggle from './components/ThemeToggle';
import SaveButton from './components/SaveButton';
import './App.css';

function App() {
  const [template, setTemplate] = useState({
    header: '',
    body: '',
    footer: '',
    buttons: []
  });

  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);  
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    loadMedias(page);
   }, [page]);

   const loadMedias = (pageNumber = 1) => {
     setLoading(true);
     fetch('http://localhost:8080/api/medias', {
        method: 'POST',
        headers: {
          'Client-Token': 'F52d9c9210d984a369cf3f1897d5ab399S',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: '',
          ID: '',
          name: '',
          page: pageNumber
        })
      })
        .then(res => res.json())
        .then(data => {
          setMedias(data.medias || []);
          setHasNextPage(data.hasNextPage || data.medias?.length === 20);
          setLoading(false);
        })
        .catch(err => {
          setError('Erro ao buscar mídias');
          setLoading(false);
        });

   }


  return (
    <ThemeProvider>
    <div className="app-container">
       <div className="header-container">
          <h1>Criador de Templates WhatsApp</h1>
          <div className="action-buttons">
            <SaveButton template={template} />
        </div>
          {/* <ThemeToggle /> */}
      </div>
      <div className="editor-preview-container">
        <TemplateEditor 
          template={template} 
          setTemplate={setTemplate} 
          medias={medias}
          loading={loading}
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage} />
        <WhatsAppPreview template={template} medias={medias} />
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;