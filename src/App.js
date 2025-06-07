// App.js
import React, { useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import TemplateEditor from './TemplateEditor';
import WhatsAppPreview from './WhatsAppPreview';
import ThemeToggle from './ThemeToggle';
import SaveButton from './SaveButton';
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
          <h1>Criador de templates WhatsApp</h1>
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