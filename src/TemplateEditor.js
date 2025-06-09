// TemplateEditor.js
import React, { useState } from 'react';


const emojiList = ['😀', '😂', '😍', '😎', '😭', '😡', '🎉', '👍', '🙏', '🔥', '🥳', '😅', '😉', '😇', '🤔'];


const TemplateEditor = ({ template, setTemplate }) => {
  const [showEmojiModal, setShowEmojiModal] = useState(false);
  const [headerType, setHeaderType] = useState(template.headerType || 'text');
  const [emojiTarget, setEmojiTarget] = useState('body');


  const handleHeaderTypeChange = (e) => {
    setHeaderType(e.target.value);
    setTemplate({ ...template, headerType: e.target.value, header: '', headerImage: '' });
  };

  const handleChange = (field) => (e) => {
    setTemplate({ ...template, [field]: e.target.value });
  };

  const addButton = () => {
    setTemplate({
      ...template,
      buttons: [...template.buttons, { text: '', type: 'url' }]
    });
  };

  const updateButton = (index, field, value) => {
    const newButtons = [...template.buttons];
    newButtons[index][field] = value;
    setTemplate({ ...template, buttons: newButtons });
  };

  const removeButton = (index) => {
    const newButtons = template.buttons.filter((_, i) => i !== index);
    setTemplate({ ...template, buttons: newButtons });
  };

  const insertFormatting = (format, field = 'body') => {
      const textarea = document.getElementById(`${field}-textarea`);

      console.log(`${field}-textarea`)  
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = template[field];
      let formatted;
      if (format === 'bold') {
        formatted = value.slice(0, start) + '*' + value.slice(start, end) + '*' + value.slice(end);
      } else if (format === 'italic') {
        formatted = value.slice(0, start) + '_' + value.slice(start, end) + '_' + value.slice(end);
      }
      setTemplate({ ...template, [field]: formatted });
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 1, end + 1);
      }, 0);
      setShowEmojiModal(false); 
  };

  const insertEmoji = (emoji, field = 'body') => {
      const textarea = document.getElementById(`${field}-textarea`);
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = template[field];
      const formatted = value.slice(0, start) + emoji + value.slice(end);
      setTemplate({ ...template, [field]: formatted });
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
      setShowEmojiModal(false);
  };

  const insertNextVariableFull = (field = 'body') => {
      // Junte todos os campos relevantes em uma string só
      const allText = [template.header, template.body, template.footer]
        .filter(Boolean)
        .join(' ');

      // Encontre todas as variáveis usadas no template inteiro
      const matches = allText.match(/{{(\d+)}}/g) || [];
      const usedNumbers = matches.map(v => parseInt(v.replace(/[^\d]/g, ''), 10));
      const nextNumber = usedNumbers.length > 0 ? Math.max(...usedNumbers) + 1 : 1;
      const variableText = `{{${nextNumber}}}`;

      const textarea = document.getElementById(`${field}-textarea`);
      if (!textarea) return;
      const value = template[field];
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const formatted = value.slice(0, start) + variableText + value.slice(end);
      setTemplate({ ...template, [field]: formatted });
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variableText.length, start + variableText.length);
      }, 0);
  };

  const insertNextVariable = (field = 'body') => {
      const textarea = document.getElementById(`${field}-textarea`);
      if (!textarea) return;
      const value = template[field];
      // Encontra todas as variáveis já usadas no texto
      const matches = value.match(/{{(\d+)}}/g) || [];
      // Extrai os números e encontra o maior
      const usedNumbers = matches.map(v => parseInt(v.replace(/[^\d]/g, ''), 10));
      const nextNumber = usedNumbers.length > 0 ? Math.max(...usedNumbers) + 1 : 1;
      const variableText = `{{${nextNumber}}}`;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const formatted = value.slice(0, start) + variableText + value.slice(end);
      setTemplate({ ...template, [field]: formatted });
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variableText.length, start + variableText.length);
      }, 0);
  };

  
  return (
    <div className="editor">
      <h2>Editar Template</h2>
      
      <div className="form-group">
        
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <label style={{ marginBottom: 8 }}>Selecione o Tipo do Cabeçalho:</label>
          <div style={{ display: 'flex', gap: 16 }}>
            <label style={{ textAlign: 'center' }}>
              <input
                type="radio"
                name="headerType"
                value="text"
                checked={headerType === 'text'}
                onChange={handleHeaderTypeChange}
              />
              Texto
            </label>
            <label style={{ textAlign: 'center' }}>
              <input
                type="radio"
                name="headerType"
                value="image"
                checked={headerType === 'image'}
                onChange={handleHeaderTypeChange}
              />
              Imagem
            </label>
          </div>
        </div>
       
       
        <label>Cabeçalho</label>
        {headerType === 'text' ? (
          <React.Fragment>
             <div className="formatting-toolbar">
              <button
                type="button"
                onClick={() => insertFormatting('bold', 'header')}
                className="format-button bold-button"
                aria-label="Negrito"
              >
                <b>B</b>
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('italic', 'header')}
                className="format-button italic-button"
                aria-label="Itálico"
              >
                <i>I</i>
              </button>

               <button 
                  type="button" 
                  onClick={() => insertNextVariableFull('header')}
                  className="format-button variable-button"
                >
                  Adicionar variável
             </button>

                <button 
                  type="button" 
                  onClick={() => { setEmojiTarget('header'); setShowEmojiModal(true); }}
                  className="format-button emoji-button"
                  aria-label="Emoticons"
              >
                <span className="emoji-icon">😀</span> Emoticons
              </button>
            </div>
            

            <input
              id="header-textarea"
              type="text"
              value={template.header}
              onChange={handleChange('header')}
              placeholder="Header text (opcional)"
            />
          </React.Fragment>
          
        ) : (
          <input
            type="text"
            value={template.headerImage || ''}
            onChange={handleChange('headerImage')}
            placeholder="Cole a URL da imagem do header"
          />
        )}
      </div>
      
      <div className="form-group">
        <label>Conteúdo</label>
        <div className="formatting-toolbar">
          <button 
            type="button" 
            onClick={() => insertFormatting('bold')}
            className="format-button bold-button"
            aria-label="Negrito"
          >
            <b>B</b>
          </button>
          
          <button 
            type="button" 
            onClick={() => insertFormatting('italic')}
            className="format-button italic-button"
            aria-label="Itálico"
          >
            <i>I</i>
          </button>
          
          <button 
            type="button" 
            onClick={() => insertNextVariableFull('body')}
            className="format-button variable-button"
          >
            Adicionar variável
          </button>
          
          <button 
            type="button" 
            onClick={() => { setEmojiTarget('body'); setShowEmojiModal(true); }}
            className="format-button emoji-button"
            aria-label="Emoticons"
          >
            <span className="emoji-icon">😀</span> Emoticons
          </button>
        </div>
        
        <textarea 
          id="body-textarea"
          value={template.body} 
          onChange={handleChange('body')} 
          placeholder="Main message content"
          rows={5}
        />
      </div>

      {showEmojiModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            padding: 20,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            minWidth: 250,
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: 10, fontWeight: 'bold' }}>Escolha um emoticon</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {emojiList.map((emoji, idx) => (
                <button
                  key={idx}
                  style={{ fontSize: 24, padding: 6, border: 'none', background: 'none', cursor: 'pointer' }}
                  onClick={() => insertEmoji(emoji, emojiTarget)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <button
              style={{ marginTop: 16 }}
              className="add-button"
              onClick={() => setShowEmojiModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      
      <div className="form-group">
        <label>Rodapé</label>
        <div className="formatting-toolbar">
            <button
              type="button"
              onClick={() => insertFormatting('bold', 'footer')}
              className="format-button bold-button"
              aria-label="Negrito"
            >
              <b>B</b>
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('italic', 'footer')}
              className="format-button italic-button"
              aria-label="Itálico"
            >
              <i>I</i>
            </button>

              <button 
                type="button" 
                onClick={() => insertNextVariableFull('footer')}
                className="format-button variable-button"
              >
                Adicionar variável
            </button>

              <button 
                type="button" 
                onClick={() => { setEmojiTarget('footer'); setShowEmojiModal(true); }}
                className="format-button emoji-button"
                aria-label="Emoticons"
            >
              <span className="emoji-icon">😀</span> Emoticons
            </button>
         </div>
       
        <input 
          id="footer-textarea"
          type="text" 
          value={template.footer} 
          onChange={handleChange('footer')} 
          placeholder="Footer text (optional)"
        />
      </div>
      
      <h3 className="section-title">Buttons</h3>
      {template.buttons.map((button, index) => (
        <div key={index} className="button-editor">
          <select 
            value={button.type} 
            onChange={(e) => updateButton(index, 'type', e.target.value)}
            className="button-select"
          >
            <option value="url">URL Button</option>
            <option value="call">Call Button</option>
            <option value="quick_reply">Quick Reply</option>
          </select>
          
          <input
            type="text"
            value={button.text}
            onChange={(e) => updateButton(index, 'text', e.target.value)}
            placeholder="Button text"
            className="button-input"
          />

          {/* Campo para URL, só aparece se for URL Button */}
          {button.type === 'url' && (
            <input
              type="text"
              value={button.url || ''}
              onChange={e => updateButton(index, 'url', e.target.value)}
              placeholder="URL do botão"
              className="button-input"
              style={{ marginTop: 4 }}
            />
          )}
          
          <button 
            type="button" 
            onClick={() => removeButton(index)}
            className="remove-button"
          >
            Remover
          </button>
        </div>
      ))}
      
     <button 
        onClick={addButton}
        className="add-button">
        <span className="add-button-icon">+</span>
          Adicionar Botão
    </button>
    </div>
  );
};

export default TemplateEditor;