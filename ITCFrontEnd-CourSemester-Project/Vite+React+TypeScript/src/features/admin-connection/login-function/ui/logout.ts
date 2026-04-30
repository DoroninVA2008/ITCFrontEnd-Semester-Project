import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutRequest, logoutReset } from '../logout/slice'
import { selectLogoutCompleted } from '../logout/selectors'

export const useAdminLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const completed = useSelector(selectLogoutCompleted);

  useEffect(() => {
    if (completed) {
      dispatch(logoutReset());
      navigate('/log');
    }
  }, [completed, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return { handleLogout };
};
