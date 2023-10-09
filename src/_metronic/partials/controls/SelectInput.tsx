import React from 'react'

const getFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control']
  /*if (touched && errors) {
    classes.push('is-invalid')
  }

  if (touched && !errors) {
    classes.push('is-valid')
  }*/

  return classes.join(' ')
}

export function SelectInput({
                        field, // { name, value, onChange, onBlur }
                        form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        label,
                        extraText,
                        children,
                        ...props
                      }: any) {
  return (
    <>
      {label && <label className={extraText && 'mb-0'}>Enter {label}</label>}
      {extraText && <p className="text-muted font-weight-light">{extraText}</p>}
      <select style={{appearance: 'auto'}}
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        {...field}
        {...props}
      >
        {children}
      </select>
    </>
  )
}