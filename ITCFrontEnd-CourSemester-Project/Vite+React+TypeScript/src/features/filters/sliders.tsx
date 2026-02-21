import React, { useState, useRef, useEffect } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  onChange?: (min: number, max: number) => void;
}

export const DualRangeSlider: React.FC<DualRangeSliderProps> = ({ 
  min, 
  max, 
  onChange 
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minRangeRef = useRef<HTMLInputElement>(null);
  const maxRangeRef = useRef<HTMLInputElement>(null);
  const rangeTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (minRangeRef.current && maxRangeRef.current && rangeTrackRef.current) {
      // Правильный расчет процентов на основе значений
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;
      
      // Учитываем ширину ползунков для точного позиционирования
      const thumbWidth = 17; // ширина ползунка в пикселях
      const sliderWidth = rangeTrackRef.current.parentElement?.offsetWidth || 100;
      
      // Корректировка процентов с учетом ширины ползунков
      const thumbOffset = (thumbWidth / sliderWidth) * 0;
      
      const correctedMinPercent = Math.max(0, minPercent - thumbOffset);
      const correctedMaxPercent = Math.min(100, maxPercent + thumbOffset);
      
      rangeTrackRef.current.style.left = `${correctedMinPercent}%`;
      rangeTrackRef.current.style.width = `${correctedMaxPercent - correctedMinPercent}%`;
    }
  }, [minVal, maxVal, min, max]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
    onChange?.(value, maxVal);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
    onChange?.(minVal, value);
  };

  // Форматирование годов для отображения
  const formatYear = (year: number) => {
    if (year === 2026) return 'н.в.';
    return `${year}г.`;
  };

  return (
    <div className="dual-range-slider" data-index="3">
      {/* <div className="slider-values">
        <span>{formatYear(minVal)}</span>
        <span>{formatYear(maxVal)}</span>
      </div> */}
      
      <div className="slider-track"></div>
      <div ref={rangeTrackRef} className="slider-range"></div>
      
      <div className="slider-input-container">
        <input
          ref={minRangeRef}
          type="range"
          className="dual-range min-range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
        />
        <input
          ref={maxRangeRef}
          type="range"
          className="dual-range max-range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};