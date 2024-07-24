const FormRowSelect = ({ labelText, name, defaultValue, changeHandler, list }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <select
          name={name}
          defaultValue={defaultValue}
          onChange={changeHandler}
          className='form-select'
        >
          {list.map((itemValue, index) => {
            return (
              <option key={index} defaultValue={itemValue}>
                {itemValue}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
  
  export default FormRowSelect