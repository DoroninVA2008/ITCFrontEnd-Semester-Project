import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions } from '../logout/slice'
import { selectLogoutCompleted } from '../logout/selectors'

export const useAdminLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const completed = useSelector(selectLogoutCompleted);

  useEffect(() => {
    if (completed) {
      dispatch(actions.logout());
      dispatch(actions.logoutReset());
      navigate('/log');
    }
  }, [completed, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(actions.logoutRequest());
  };

  return { handleLogout };
};
