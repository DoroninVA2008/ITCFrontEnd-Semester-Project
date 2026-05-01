import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions } from '../auth/slice'
import { selectLogoutCompleted } from '../auth/selectors'

export const useAdminLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const completed = useSelector(selectLogoutCompleted);

  useEffect(() => {
    if (completed) {
      dispatch(actions.logoutReset());
      navigate('/log');
    }
  }, [completed, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(actions.logoutRequest());
  };

  return { handleLogout };
};
