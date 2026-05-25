import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions } from '../features/login/slice' // или '../features/auth'
import { selectors } from '../features/login/selectors'

export const ButoAcc: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(false);
  
  const logoutCompleted = useSelector(selectors.selectLogoutCompleted);
  const navigateTo = useSelector(selectors.selectNavigateTo);

  useEffect(() => {
    if (logoutCompleted && navigateTo) {
      dispatch(actions.logout());
      dispatch(actions.logoutReset());
      navigate(navigateTo);
      dispatch(actions.clearNavigateTo());
    }
  }, [logoutCompleted, navigateTo, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(actions.logoutRequest());
  };

  const closeDropdown = () => {
    if (!isOpenRef.current) return;
    isOpenRef.current = false;
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (isOpenRef.current) {
      closeDropdown();
    } else {
      isOpenRef.current = true;
      setOpen(true);
    }
  };

  const username = localStorage.getItem('username') || 'admin';
  const parts = username.split('_');
  const secondInitial = parts[1]?.[0]?.toUpperCase() ?? 'T';

  return (
    <div className="butacc-wrap" ref={ref}>
      <button className="butacc" onClick={handleToggle}>
        A{secondInitial}
      </button>
      {(open || closing) && (
        <div className={`butacc-dropdown${closing ? ' butacc-dropdown--closing' : ''}`}>
          <span className="butacc-dropdown__name">{username}</span>
          <button className="butacc-dropdown__logout" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}