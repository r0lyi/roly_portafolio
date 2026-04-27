function HomeSectionHeading({
  label,
  labelClassName,
  lineClassName = 'bg-[#101010]',
}) {
  return (
    <div className="grid items-center gap-3 md:grid-cols-[auto_minmax(0,1fr)] md:gap-[18px]">
      <p className={labelClassName}>{label}</p>
      <span className={`block h-1 ${lineClassName}`} aria-hidden="true" />
    </div>
  )
}

export default HomeSectionHeading
