import React from 'react'

const FormRow = ({ type, name, labelText, value, changeHandler }) => {
  return (
    <div className='flex flex-col mb-4'>
      <label htmlFor={name} className='mb-2 text-gray-700'>
        {labelText || name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='p-2 border border-gray-300 rounded'
        value={value}  
        onChange={changeHandler}
      />
    </div>
  );
};

export default FormRow;
