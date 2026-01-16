import { ChangeEvent, useState } from 'react';

interface AppInputProps {
  onChange: (newStep: number) => void;
}

export function AppInput({ onChange }: AppInputProps): JSX.Element {
  const [value, setValue] = useState<number>(1);
  const [min] = useState<number>(-100);
  const [max] = useState<number>(100);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newChange = Number(e.target.value);
    
    if (newChange < min) newChange = min;
    if (newChange > max) newChange = max;
    
    setValue(newChange);
    onChange(newChange);
  };
  
  return (
    <div style={{ marginBottom: '15px' }}>
      <label>
        Шаг изменения:
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          style={{ marginLeft: '10px', padding: '5px', color: 'var(--ckara-color)', backgroundColor: 'transparent', borderColor: 'var(--ckara-color)' }}
        />
      </label>
    </div>
  );
}