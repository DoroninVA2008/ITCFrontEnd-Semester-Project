import React from 'react'
import { Butoapp } from '../entities/butoapp'
import { Buterm } from '../entities/buterm'

export const Headmer: React.FC = () => { // BuToApp, BuTerm
  return (
    <div className="headmer">
      <Butoapp />
      <Buterm />
    </div>
  );
};