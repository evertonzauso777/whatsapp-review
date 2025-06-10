import React from 'react';

const LimitedTextField = ({
  value,
  onChange,
  maxLength,
  placeholder,
  type = 'text',
  id,
  rows = 1
}) => (
  <div className="limited-text-field">
    {type === 'textarea' ? (
      <textarea
        id={id}
        value={value}
        onChange={e => {
          if (e.target.value.length <= maxLength) onChange(e);
        }}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
      />
    ) : (
      <input
        id={id}
        type="text"
        value={value}
        onChange={e => {
          if (e.target.value.length <= maxLength) onChange(e);
        }}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    )}
    <div style={{ fontSize: 12, marginLeft: '5px', color: '#888' }}>
      {value.length}/{maxLength}
    </div>
  </div>
);

export default LimitedTextField;