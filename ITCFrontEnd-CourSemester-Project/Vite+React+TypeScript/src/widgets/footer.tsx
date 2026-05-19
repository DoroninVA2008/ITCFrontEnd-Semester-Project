import React from 'react'
import CITPanda from '../assets/CITPandaFonot.png'

export const Footer: React.FC = () => {
  const PMTG = () => {
    window.open('https://t.me/dsxwwx_z', '_blank');
  };

  const CDTG = () => {
    window.open('https://t.me/b1l1r1', '_blank');
  };

  const FETG = () => {
    window.open('https://t.me/DVAdidas2008', '_blank');
  };

  const BETG = () => {
    window.open('https://t.me/airsss993', '_blank');
  };

  const handleLogoClick = () => {
    window.open('https://it-college.ru/', '_blank');
  };

  return (
    <footer>
        <div className="text">
          <p className="project-title">
            Проект студентов Колледжа Цифровых Технологий
          </p>
          <div className="team-list">
            <p onClick={PMTG}>
              Project-Manager: Склярова Дарья
            </p>
            <p onClick={CDTG}>
              Ux/Ui-Designer: Кузнецов Арсений
            </p>
            <p onClick={FETG}>FrontEnd-Developer: Доронин Владимир</p>
            <p onClick={BETG}>BackEnd-Developer: Джапаридзе Артём</p>
          </div>
        </div>
        
        <div className="logo" onClick={handleLogoClick}>
          <img 
            src={CITPanda} 
            alt="CIT_Panda_Logo" 
            className="logo-image"
          />
        </div>
    </footer>
  );
};