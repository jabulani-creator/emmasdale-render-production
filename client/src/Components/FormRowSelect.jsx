import React from 'react'

export const FormRowSelect = ({name, value, handleChange, labelText, list}) => {
  return (
    <div className="form-row">
        <label htmlFor={name} className='form-label'>
            {labelText || name}
        </label>

        <select
          value={value}
          name={name}
          onChange={handleChange}
          className='form-select'
          >
            {list.map((itemValue, index) => {
              return (
                <option key={index} value={itemValue}>
                {itemValue}
              </option>
              )
            })}
            </select>
    </div>
  )
}
