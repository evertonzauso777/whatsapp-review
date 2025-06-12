// WhatsAppPreview.js
import React from 'react';
import { useTheme } from './ThemeContext';


const WhatsAppPreview = ({ template }) => {
  const { darkMode } = useTheme();  

  function formatWhatsAppText(text) {
    let formatted = text
      .replace(/\*(.*?)\*/g, '<b>$1</b>')    // Negrito
      .replace(/_(.*?)_/g, '<i>$1</i>')      // Itálico
       .replace(/~(.*?)~/g, '<s>$1</s>');    // Tachado   
    return formatted;
  }

  return (
    <div className='whatsapp-preview'>
      <h2>WhatsApp Preview</h2>
      
       <div className='whatsapp-container'>
        <div className="whatsapp-header">
        <div className="wa-contact">
            <div className="wa-contact-avatar">👤</div>
            <div className="wa-contact-info">
            <div className="wa-contact-name">Contact Name</div>
            <div className="wa-contact-status">online</div>
            </div>
        </div>
        </div>
        
        
        
        <div className="whatsapp-message">
          {template.headerType === 'image' && template.headerImage ? (
              <div className="message-header-image" style={{ width: '100%', padding: 0, margin: 0 }}>
                <img src={template.headerImage} alt="Header" 
                style={{  width: '100%',
                          height: 'auto',
                          display: 'block',
                          borderRadius: 0,
                          objectFit: 'cover',
                          maxHeight: 200 }} />
              </div>
           ) : template.header ? (
              <div className="message-header">
                {template.header}
              </div>
            ) : null}
         
          <div className="message-body">
            {template.body.split('\n').map((line, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: formatWhatsAppText(line) }} />
            ))}
          </div>
          
          {template.footer && (
            <div className="message-footer">
              {template.footer}
            </div>
          )}
          
          {template.buttons.length > 0 && (
            <div className="message-buttons">
              {template.buttons.map((button, index) => (
                <button key={index} className={`whatsapp-button ${button.type}`}>
                  {button.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPreview;