import React from 'react';
import Types from './types';

const CustomTextarea: React.FC<Types> = ({
  value,
  onChange,
  placeholder = '',
  rows = 4,
  more = '',
  nameLabel = '',
  maxLength = 9999999,
  minLength = 1
}) => {
  return (
    <div>
      <label htmlFor={nameLabel}>{nameLabel || 'NO NAME'}</label>
      <textarea
        id={nameLabel}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none w-full ${more}`}
        required
        maxLength={maxLength}
        minLength={minLength}
      />
    </div>
  );
};

export default CustomTextarea;