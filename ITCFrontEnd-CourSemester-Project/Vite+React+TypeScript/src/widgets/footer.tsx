import React, { useState } from 'react'
import CITPanda from '../assets/CITPandaFonot.png'
import { FooterButton } from '../entities/butter'
import { CITButton } from '../entities/butci'
import { PMTGButton } from '../entities/butopm'
import { CDTGButton } from '../entities/butocd'
import { FETGButton } from '../entities/butofe'
import { BETGButton } from '../entities/butobe'

export interface FooterProps {
  collapsible?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ collapsible = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (collapsible) {
    return (
      <footer className={`footer--collapsible${isOpen ? ' footer--open' : ''}`}>
        <FooterButton onClick={() => setIsOpen(v => !v)} />
        <div className="footer__content">
          <div className="footer__inner">
            <div className="footer-left">
              <img src={CITPanda} alt="CIT_Panda_Logo" className="footer-logo" />
            </div>
            <div className="footer-right">
              <p className="footer-title">
                Проект студентов{' '}
                <CITButton />
              </p>
              <span className="footer-copy">© 2026</span>
              <p className="footer-names">
                <PMTGButton />,&nbsp; 
                <CDTGButton />,&nbsp;
                <FETGButton />,&nbsp;
                <BETGButton />
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};