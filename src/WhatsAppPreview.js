// WhatsAppPreview.js
import React from 'react';
import { useTheme } from './ThemeContext';


const WhatsAppPreview = ({ template }) => {
  const { darkMode } = useTheme();  

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
          {template.header && (
            <div className="message-header">
              {template.header}
            </div>
          )}
          
          <div className="message-body">
            {template.body.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
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