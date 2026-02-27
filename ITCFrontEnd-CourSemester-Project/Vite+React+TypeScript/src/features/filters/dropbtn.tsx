import React from 'react'

interface SubDropdownBtnProps {
  label: string
  isSelected: boolean
  isInRange: boolean
  onClick: () => void
  onCheckboxChange: () => void
  // disabled?: boolean
}

export const SubDropdownBtn: React.FC<SubDropdownBtnProps> = ({
  label,
  isSelected,
  isInRange,
  onClick,
  onCheckboxChange,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick() // Всегда вызываем, без проверок
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    onCheckboxChange() // Всегда вызываем, без проверок
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const buttonClasses = [
    'SubDropdownBtn',
    isSelected ? 'selected' : '',
    !isInRange ? 'out-of-range' : '' // Только для визуала
  ].filter(Boolean).join(' ')

  return (
    <div
      className={buttonClasses}
      onClick={handleClick}
    >
      <span>{label}</span>
      <input 
        type="checkbox" 
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={handleCheckboxClick}
        // disabled={!isInRange} // НЕ блокируем чекбокс
      />
    </div>
  )
}