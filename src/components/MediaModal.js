import React from 'react';

const getDocumentIcon = (url) => {
  // Você pode melhorar para diferentes tipos de documento
  if (url.endsWith('.pdf')) {
    return (
      <span role="img" aria-label="PDF" style={{ fontSize: 40 }}>📄</span>
    );
  }
  return (
    <span role="img" aria-label="Documento" style={{ fontSize: 40 }}>📁</span>
  );
};

const MediaModal = ({
  show,
  medias,
  onSelect,
  onClose,
  title = 'Escolha uma mídia'
}) => {
  if (!show) return null;

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
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: 10, fontWeight: 'bold' }}>{title}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          {medias
            .filter(m => m.type === 'image' || m.type === 'video' || m.type === 'document')
            .map(media => (
              <div key={media.ID} style={{ cursor: 'pointer', width: 100, textAlign: 'center' }}>
                {media.type === 'image' ? (
                  <img
                    src={media.URL}
                    alt={media.name}
                    style={{ width: 100, height: 60, objectFit: 'cover', border: '2px solid #eee', borderRadius: 4 }}
                    onClick={() => onSelect(media)}
                  />
                ) : media.type === 'video' ? (
                  <video
                    src={media.URL}
                    style={{ width: 100, height: 60, objectFit: 'cover', border: '2px solid #eee', borderRadius: 4 }}
                    onClick={() => onSelect(media)}
                    controls={false}
                    muted
                  />
                ) : (
                  <div
                    onClick={() => onSelect(media)}
                    style={{
                      width: 100,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #eee',
                      borderRadius: 4,
                      background: '#f5f5f5'
                    }}
                  >
                    {getDocumentIcon(media.URL)}
                  </div>
                )}
                <div style={{ fontSize: 12, marginTop: 4 }}>{media.name}</div>
              </div>
            ))}
        </div>
        <button
          type="button" 
          className="add-button"
          style={{ marginTop: 16 }}
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default MediaModal;