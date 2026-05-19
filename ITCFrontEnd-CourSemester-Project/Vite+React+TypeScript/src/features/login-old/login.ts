import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions } from '../login/slice'
import { selectors } from '../login/selectors'

export const useAdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector(selectors.selectLogin);
  const password = useSelector(selectors.selectPassword);
  const loading = useSelector(selectors.selectLoading);
  const error = useSelector(selectors.selectError);
  const isAuthenticated = useSelector(selectors.selectIsAuthenticated);
  const role = useSelector(selectors.selectRole);

  useEffect(() => {
    if (!isAuthenticated || !role) return;
    navigate(role === 'moderator' ? '/mad' : role === 'super_admin' ? '/adm' : '/log');
  }, [isAuthenticated, role, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(actions.loginRequest());
  };

  return {
    login,
    setLogin: (v: string) => dispatch(actions.setLogin(v)),
    password,
    setPassword: (v: string) => dispatch(actions.setPassword(v)),
    error,
    loading,
    handleLogin,
  };
};
