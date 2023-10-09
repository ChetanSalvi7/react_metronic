import React from 'react'

export const Checkbox = ({isSelected, onChange, label, field, extraText, extraClass}: any) => {
  return (
    <>
      {extraText && (
        <p className="text-muted font-weight-lighter">{extraText}</p>
      )}
      <div className={`form-check form-check-sm form-check-custom form-check-solid ${extraClass}`}>
        <input
          className='form-check-input'
          type='checkbox'
          checked={isSelected}
          onChange={onChange}
          {...field}
        />
      </div>
    </>
  )
}