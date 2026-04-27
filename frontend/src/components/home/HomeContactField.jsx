import {
  homeFieldLabelClass,
  homeFieldWrapperClass,
  homeInputClass,
  homeTextareaClass,
} from '../../styles/homeBrutalistClasses.js'

function HomeContactField({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  multiline = false,
  rows = 7,
}) {
  return (
    <label className={homeFieldWrapperClass} htmlFor={id}>
      <span className={homeFieldLabelClass}>{label}</span>
      {multiline ? (
        <textarea
          id={id}
          className={homeTextareaClass}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          id={id}
          className={homeInputClass}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />
      )}
    </label>
  )
}

export default HomeContactField
