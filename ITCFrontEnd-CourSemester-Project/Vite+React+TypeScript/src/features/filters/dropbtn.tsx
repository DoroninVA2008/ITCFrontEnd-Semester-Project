import React from 'react'

interface SubDropdownBtnProps {
  label: string
  isSelected: boolean
  isInRange: boolean
  onClick: () => void
  onCheckboxChange: () => void
  disabled?: boolean
}

export const SubDropdownBtn: React.FC<SubDropdownBtnProps> = ({
  label,
  isSelected,
  isInRange,
  onClick,
  onCheckboxChange,
  disabled = false
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInRange) {
      onClick()
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (isInRange) {
      onCheckboxChange()
    }
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const buttonClasses = [
    'SubDropdownBtn',
    isSelected ? 'selected' : '',
    !isInRange ? 'out-of-range' : ''
  ].filter(Boolean).join(' ')

  const buttonStyles = {
    display: isInRange ? 'block' : 'none',
    pointerEvents: isInRange ? 'auto' : 'none' as const
  }

  return (
    <div
      className={buttonClasses}
      onClick={handleClick} //@ts-ignore
      style={buttonStyles}
    >
      <span>{label}</span>
      <input 
        type="checkbox" 
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={handleCheckboxClick}
        disabled={disabled || !isInRange}
      />
    </div>
  )
}