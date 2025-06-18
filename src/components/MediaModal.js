import React from 'react';
import { FiX, FiFile, FiImage, FiFilm, FiFileText } from 'react-icons/fi';
import '../MediaModal.css';

const getDocumentIcon = (url, size = 24) => {
  if (url.endsWith('.pdf')) {
    return <FiFileText size={size} className="document-icon-pdf" />;
  }
  return <FiFile size={size} className="document-icon-default" />;
};

const MediaModal = ({
  show,
  medias,
  onSelect,
  onClose,
  title = 'Selecione uma mídia'
}) => {
  if (!show) return null;

  return (
    <div className="media-modal-overlay">
      <div className="media-modal-container">
        {/* Header */}
        <div className="media-modal-header">
          <h3 className="media-modal-title">{title}</h3>
          <button 
            onClick={onClose}
            className="media-modal-close-btn"
          >
            <FiX size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="media-modal-content">
          <div className="media-modal-grid">
            {medias
              .filter(m => m.type === 'image' || m.type === 'video' || m.type === 'document')
              .map(media => (
                <div 
                  key={media.ID} 
                  onClick={() => onSelect(media)}
                  className="media-item"
                >
                  <div className="media-thumbnail-container">
                    {media.type === 'image' ? (
                      <>
                        <img
                          src={media.URL}
                          alt={media.name}
                          className="media-thumbnail"
                        />
                        <div className="media-thumbnail-overlay" />
                        <FiImage 
                          size={24} 
                          className="media-thumbnail-icon" 
                        />
                      </>
                    ) : media.type === 'video' ? (
                      <>
                        <video
                          src={media.URL}
                          className="media-thumbnail"
                          controls={false}
                          muted
                        />
                        <div className="media-thumbnail-overlay" />
                        <FiFilm 
                          size={24} 
                          className="media-thumbnail-icon" 
                        />
                      </>
                    ) : (
                      <>
                        <div className="p-4">
                          {getDocumentIcon(media.URL, 32)}
                        </div>
                        <div className="media-thumbnail-overlay" />
                      </>
                    )}
                  </div>
                  <div className="media-name">
                    {media.name}
                  </div>
                  <div className="media-type">
                    {media.type === 'document' ? media.URL.split('.').pop().toUpperCase() : media.type}
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="media-modal-footer">
          <button
            onClick={onClose}
            className="media-modal-cancel-btn"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;