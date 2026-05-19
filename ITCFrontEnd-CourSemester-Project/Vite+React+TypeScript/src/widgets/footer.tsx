import React, { useState } from 'react'
import CITPanda from '../assets/CITPandaFonot.png'

interface FooterProps {
  collapsible?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ collapsible = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (collapsible) {
    return (
      <footer className={`footer--collapsible${isOpen ? ' footer--open' : ''}`}>
        <button className="footer__toggle" onClick={() => setIsOpen(v => !v)}>
          <span className="footer__toggle-label">Информация о проекте</span>
        </button>

        <div className="footer__content">
          <div className="footer__inner">
            <div className="footer-left">
              <img src={CITPanda} alt="CIT_Panda_Logo" className="footer-logo" />
            </div>
            <div className="footer-right">
              <p className="footer-title">
                Проект студентов{' '}
                <a href="https://it-college.ru/" target="_blank" rel="noreferrer" className="footer-college-link">
                  Колледжа Цифровых Технологий
                </a>
              </p>
              <span className="footer-copy">© 2026</span>
              <p className="footer-names">
                <a href="https://t.me/dsxwwx_z/" target="_blank" rel="noreferrer">
                  Склярова Д.
                </a>,&nbsp; 
                <a href="https://t.me/b1l1r1/" target="_blank" rel="noreferrer">
                  Кузнецов А.
                </a>,&nbsp;
                <a href="https://t.me/DVAdidas2008/" target="_blank" rel="noreferrer"> 
                  Доронин В.
                </a>,&nbsp;
                <a href="https://t.me/airsss993/" target="_blank" rel="noreferrer">
                  Джапаридзе А.
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer>
      <div className="footer-left">
        <img
          src={CITPanda}
          alt="CIT_Panda_Logo"
          className="footer-logo"
        />
      </div>

      <div className="footer-right">
        <p className="footer-title">
          Проект студентов{' '}
          <a href="https://it-college.ru/" target="_blank" rel="noreferrer" className="footer-college-link">
            Колледжа Цифровых Технологий
          </a>
        </p>
        <span className="footer-copy">© 2026</span>
        <p className="footer-names">
          Склярова Д.,&nbsp; Кузнецов А.,&nbsp; Доронин В.,&nbsp; Джапаридзе А.
        </p>
      </div>
    </footer>
  );
};