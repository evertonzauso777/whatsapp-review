// App.js
import React, { useState } from 'react';
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
        <TemplateEditor template={template} setTemplate={setTemplate} />
        <WhatsAppPreview template={template} />
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;