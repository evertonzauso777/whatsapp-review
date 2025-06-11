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
        minWidth: 300,
        maxWidth: 400,
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 18 }}>Escolha um emoticon</div>
        
        {/* Abas de categorias */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: 8, marginBottom: 12, paddingBottom: 8 }}>
          {Object.keys(emojiCategories).map((category) => (
            <button
              key={category}
              style={{
                padding: '6px 12px',
                border: 'none',
                background: activeCategory === category ? '#f0f0f0' : 'transparent',
                borderRadius: 20,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: activeCategory === category ? 'bold' : 'normal',
              }}
              onClick={() => setActiveCategory(category)}
            >
              {categoryNames[category]}
            </button>
          ))}
        </div>

        {/* Lista de emojis da categoria selecionada */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 8, 
          justifyContent: 'center',
          maxHeight: 300,
          overflowY: 'auto',
          padding: 8,
        }}>
          {emojiCategories[activeCategory].map((emoji, idx) => (
            <button
              key={idx}
              style={{ 
                fontSize: 24, 
                padding: 6, 
                border: 'none', 
                background: 'none', 
                cursor: 'pointer',
                borderRadius: 8,
                transition: 'background 0.2s',
              }}
              onClick={() => {
                insertEmoji(emoji, emojiTarget);
                setShowEmojiModal(false);
              }}
              onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              {emoji}
            </button>
          ))}
        </div>

        <button
          style={{ 
            marginTop: 16, 
            padding: '8px 16px', 
            background: '#f0f0f0', 
            border: 'none', 
            borderRadius: 4, 
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => setShowEmojiModal(false)}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default EmojiModal;