import React from 'react'

const FormRow = ({ type, name, labelText, defaultValue, changeHandler }) => {
    return (
      <div className='flex flex-col mb-4'>
        <label htmlFor={name} className='mb-2 text-gray-700'>
          {labelText || name.split('')[0].toUpperCase()+name.slice(1, name.length)}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className='p-2 border border-gray-300 rounded'
          defaultValue={defaultValue || ''}
          onChange={(e)=>changeHandler(e.target.value, name)}
        />
      </div>
    );
  };

export default FormRow