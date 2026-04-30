import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin, setPassword, loginRequest } from '../login/slice'
import { selectLogin, selectPassword, selectLoading, selectError, selectIsAuthenticated, selectRole} from '../login/selectors'

export const useAdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector(selectLogin);
  const password = useSelector(selectPassword);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(role === 'super_admin' ? '/adm' : '/mad');
    }
  }, [isAuthenticated, role, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest());
  };

  return {
    login,
    setLogin: (v: string) => dispatch(setLogin(v)),
    password,
    setPassword: (v: string) => dispatch(setPassword(v)),
    error,
    loading,
    handleLogin,
  };
};
