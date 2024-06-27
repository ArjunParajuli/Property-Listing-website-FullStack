import React from 'react'

const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
    return (
      <div className='flex flex-col mb-4'>
        <label htmlFor={name} className='mb-2 text-gray-700'>
          {labelText || name}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className='p-2 border border-gray-300 rounded'
          defaultValue={defaultValue || ''}
          onChange={(e)=>onChange(e.target.value, name)}
        />
      </div>
    );
  };

export default FormRow