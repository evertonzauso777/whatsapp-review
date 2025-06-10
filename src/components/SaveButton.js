// SaveButton.js
import React, { useState } from 'react';
import Modal from './Modal';

const SaveButton = ({ template }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [templateName, setTemplateName] = useState('');

  const save = () => {

    // Recupera templates existentes ou inicializa array vazio
    const savedTemplates = JSON.parse(localStorage.getItem('whatsappTemplates')) || [];

    // Verifica se já existe um template com esse nome
    const existingIndex = savedTemplates.findIndex(t => t.name === templateName);

    if (!templateName.trim()) {
        setModalMessage('Por favor, digite um nome para o template');
        setShowModal(true);
        return;
    }
   
    // Formata o template conforme as especificações da API do WhatsApp
    const whatsappTemplate = {
      name: `template_${Date.now()}`,
      language: {
        code: 'pt_BR',
        policy: 'deterministic'
      },
      components: [
        {
          type: 'BODY',
          text: template.body,
          example: {
            body_text: ['Exemplo de texto']
          }
        }
      ]
    };

    // Adiciona header se existir
    if (template.header) {
      whatsappTemplate.components.push({
        type: 'HEADER',
        format: 'TEXT',
        text: template.header,
        example: {
          header_text: ['Exemplo de cabeçalho']
        }
      });
    }

       // Adiciona headerimage se existir
    if (template.headerImage) {
      whatsappTemplate.components.push({
        type: 'HEADER',
        format: 'TEXT',
        text: template.headerImage,
      });
    }

    // Adiciona footer se existir
    if (template.footer) {
      whatsappTemplate.components.push({
        type: 'FOOTER',
        text: template.footer
      });
    }

    // Adiciona botões se existirem
    if (template.buttons && template.buttons.length > 0) {
      const buttonsComponent = {
        type: 'BUTTONS',
        buttons: []
      };

      template.buttons.forEach(button => {
        buttonsComponent.buttons.push({
          type: button.type === 'quick_reply' ? 'QUICK_REPLY' : button.type.toUpperCase(),
          text: button.text
        });
      });

      whatsappTemplate.components.push(buttonsComponent);
    }
    
    // const jsonString = JSON.stringify(whatsappTemplate, null, 2);
    

    if (existingIndex >= 0) {
        // Atualiza template existente
        savedTemplates[existingIndex] = whatsappTemplate;
        setModalMessage('Template atualizado com sucesso!');
      } else {
        // Adiciona novo template
        savedTemplates.push(whatsappTemplate);
        setModalMessage('Template salvo com sucesso!');
      }

     localStorage.setItem('whatsappTemplates', JSON.stringify(whatsappTemplate));
     setShowModal(true);
     setTemplateName(''); 

  }



  const saveTemplate = () => {
    if (!templateName.trim()) {
      setModalMessage('Por favor, digite um nome para o template');
      setShowModal(true);
      return;
    }

    try {
      // Recupera templates existentes ou inicializa array vazio
      const savedTemplates = JSON.parse(localStorage.getItem('whatsappTemplates')) || [];
      
      // Verifica se já existe um template com esse nome
      const existingIndex = savedTemplates.findIndex(t => t.name === templateName);
      
      const templateToSave = {
        name: templateName,
        date: new Date().toISOString(),
        data: template
      };

      if (existingIndex >= 0) {
        // Atualiza template existente
        savedTemplates[existingIndex] = templateToSave;
        setModalMessage('Template atualizado com sucesso!');
      } else {
        // Adiciona novo template
        savedTemplates.push(templateToSave);
        setModalMessage('Template salvo com sucesso!');
      }

      // Salva no localStorage
      localStorage.setItem('whatsappTemplates', JSON.stringify(savedTemplates));
      setShowModal(true);
      setTemplateName(''); // Limpa o campo após salvar
    } catch (error) {
      setModalMessage(`Erro ao salvar template: ${error.message}`);
      setShowModal(true);
    }
  };

  const handleNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  return (
    <div className="save-options">
      <button 
        onClick={() => setShowModal(true)} 
        className="save-button"
      >
        Salvar Template
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>{modalMessage ? '' : 'Salvar Template'}</h3>
          {modalMessage ? (
            <p>{modalMessage}</p>
          ) : (
            <>
              <label htmlFor="templateName">Nome do Template:</label>
              <input
                id="templateName"
                type="text"
                value={templateName}
                onChange={handleNameChange}
                placeholder="Digite um nome para o template"
                className="template-name-input"
              />
            </>
          )}
          <div className="modal-buttons">
            {!modalMessage && (
              <button onClick={save} className="confirm-save">
                Confirmar
              </button>
            )}
            <button onClick={() => setShowModal(false)} className="close-modal">
              {modalMessage ? 'OK' : 'Cancelar'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SaveButton;