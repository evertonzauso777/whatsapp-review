// TemplateEditor.js
import React from 'react';

const TemplateEditor = ({ template, setTemplate }) => {
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

  return (
    <div className="editor">
      <h2>Template Editor</h2>
      
      <div className="form-group">
        <label>Header:</label>
        <input 
          type="text" 
          value={template.header} 
          onChange={handleChange('header')} 
          placeholder="Header text (optional)"
        />
      </div>
      
      <div className="form-group">
        <label>Body:</label>
        <textarea 
          value={template.body} 
          onChange={handleChange('body')} 
          placeholder="Main message content"
          rows={5}
        />
      </div>
      
      <div className="form-group">
        <label>Footer:</label>
        <input 
          type="text" 
          value={template.footer} 
          onChange={handleChange('footer')} 
          placeholder="Footer text (optional)"
        />
      </div>
      
      <h3>Buttons</h3>
      {template.buttons.map((button, index) => (
        <div key={index} className="button-editor">
          <select 
            value={button.type} 
            onChange={(e) => updateButton(index, 'type', e.target.value)}
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
          />
        </div>
      ))}
      
      <button onClick={addButton}>Add Button</button>
    </div>
  );
};

export default TemplateEditor;