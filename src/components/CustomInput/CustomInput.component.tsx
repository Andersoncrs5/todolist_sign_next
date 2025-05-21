import React from 'react';
import Types from './types'

const CustomInput: React.FC<Types> = ({ min = 0 ,max = 0, nameLabel = '' ,id = '' ,value, onChange, placeholder = '', type = 'text', more = '' }) => {
  return (
    <div>
      <label htmlFor={nameLabel}>{nameLabel || 'NO NAME' }</label>
      <input
        type={type}
        id={id}
        name={nameLabel}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded px-3 py-2 w-[100%] outline-none focus:ring-2 focus:ring-blue-500 ${more}`}
        required
        maxLength={max == 0 ? 99999 : max }
        minLength={min == 0 ? 1 : min }
      />
    </div>
    
  );
};

export default CustomInput;