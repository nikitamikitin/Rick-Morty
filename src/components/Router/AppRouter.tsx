import CharacterLayout from 'components/CharacterLayout';
import WatchList from 'components/WatchList';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const AppRouter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/characters' && pathname !== '/watchList') {
      navigate('/characters');
    }
  }, []);

  return (
    <Routes>
      <Route path="/characters" element={<CharacterLayout />}></Route>
      <Route path="/watchlist" element={<WatchList />}></Route>
    </Routes>
  );
};
export default AppRouter;
