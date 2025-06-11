import { useState } from 'react';

const EmojiModal = ({ insertEmoji, emojiTarget, setShowEmojiModal }) => {
  const [activeCategory, setActiveCategory] = useState('faces');

  // Lista de emojis organizados por categoria
  const emojiCategories = {
    faces: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️'],
    gestures: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👋', '👐', '🙌', '👏', '🙏'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐮', '🐷', '🐸', '🐵', '🦄'],
    nature: ['🌈', '🌞', '🌻', '🌍', '🌎', '🌏'],
    food: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🍲', '🍕', '🍔', '🍟', '🥪', '🌮', '🍣', '🍦', '🍄', '☕', '🍷', '🍹'],
    objects: ['💡', '📱', '💻', '🖥', '🖨', '📸', '🎥', '📞', '☎️', '📺', '📻', '⏰', '⏳', '📆', '📌', '📍', '✂️', '🎁', '🏷', '🛒', '💰', '💳', '✉️', '✏️', '📝', '📚', '🔍', '🔎', '🔒', '🔓'],
    symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '♻️', '✨', '❓', '❗', '⭕', '✅', '❌'],
  };

  // Navegação entre categorias
  const categoryNames = {
    faces: 'Rostos',
    gestures: 'Gestos',
    animals: 'Animais',
    nature: 'Natureza',
    food: 'Comidas',
    objects: 'Objetos',
    symbols: 'Símbolos',
  };

  return (
      <div className="emoji-modal-overlay">
      <div className="emoji-modal-container">
        <div className="emoji-modal-header">
          <h3 className="emoji-modal-title">Selecione um emoji</h3>
          <button 
            className="emoji-modal-close-btn"
            onClick={() => setShowEmojiModal(false)}
          >
            &times;
          </button>
        </div>
        
        {/* Abas de categorias */}
        <div className="emoji-category-tabs">
          {Object.keys(emojiCategories).map((category) => (
            <button
              key={category}
              className={`emoji-category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {categoryNames[category]}
            </button>
          ))}
        </div>

        {/* Lista de emojis da categoria selecionada */}
        <div className="emoji-grid">
          {emojiCategories[activeCategory].map((emoji, idx) => (
            <button
              key={idx}
              className="emoji-item"
              onClick={() => {
                insertEmoji(emoji, emojiTarget);
                setShowEmojiModal(false);
              }}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="emoji-modal-footer">
          <button
            className="emoji-modal-close-button"
            onClick={() => setShowEmojiModal(false)}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmojiModal;