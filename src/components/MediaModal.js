import React, { useState } from 'react';
import { FiX, FiFile, FiImage, FiFilm, FiFileText, FiSearch } from 'react-icons/fi';
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
  loading,
  page,
  setPage,
  hasNextPage,
  onSelect,
  onClose,
  title = 'Selecione uma mídia'
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!show) return null;

  // Filtrar mídias com base no termo de busca
  const filteredMedias = medias.filter(media => {
    const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isSupportedType = ['image', 'video', 'document'].includes(media.type);
    return matchesSearch && isSupportedType;
  });

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
        
        {/* Search Bar */}
        <div className="media-modal-search">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar mídia por nome..."
              className="media-search-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="media-modal-content">
          <div className="media-modal-grid">
            {filteredMedias.length > 0 ? (
              filteredMedias.map(media => (
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
              ))
            ) : (
              <div className="media-no-results">
                {searchTerm ? (
                  `Nenhuma mídia encontrada para "${searchTerm}"`
                ) : (
                  'Nenhuma mídia disponível'
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1 || loading}
            style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #ccc', background: '#f5f5f5', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
          >
            Página anterior
          </button>
          <span style={{ alignSelf: 'center' }}>Página {page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={!hasNextPage || loading}
            style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #ccc', background: '#f5f5f5', cursor: !hasNextPage ? 'not-allowed' : 'pointer' }}
          >
            Próxima página
          </button>
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