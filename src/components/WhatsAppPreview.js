// WhatsAppPreview.js
import React from 'react';
import { useTheme } from './ThemeContext';


const WhatsAppPreview = ({ template, medias }) => {
  const { darkMode } = useTheme();  

  const headerMedia = medias.find(
    m => m.ID === template.headerImage && (m.type === 'image' || m.type === 'video' || m.type === 'document')
  );

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
          {template.headerType === 'image' && headerMedia ? (
          <div className="message-header-media" style={{ width: '100%', height: 200, overflow: 'hidden' }}>
            {headerMedia.type === 'image' ? (
                <img
                  src={headerMedia.URL}
                  alt="Header"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              ) : headerMedia.type === 'video' ? (
              <video
                src={headerMedia.URL}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                controls
              />
            ) : (
              <a
                href={headerMedia.URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  textDecoration: 'none',
                  color: '#128c7e',
                  fontWeight: 'bold',
                  fontSize: 18
                }}
              >
                <span style={{ fontSize: 48 }}>📄</span>
                {headerMedia.name || 'Documento'}
                <span style={{ fontSize: 12, color: '#555', marginTop: 4 }}>Clique para visualizar</span>
              </a>
            )}
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