import Urls from 'constants/Urls';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navigateHook = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== Urls.characters && pathname !== Urls.watchList) {
      navigate(Urls.characters);
    }
  }, []);
};

export default navigateHook;
