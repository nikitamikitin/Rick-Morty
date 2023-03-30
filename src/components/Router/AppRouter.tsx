import Urls from 'constants/Urls';
import CharacterLayout from 'components/CharacterLayout';
import WatchList from 'components/WatchList';
import { Route, Routes } from 'react-router-dom';
import useNavigateRouter from 'services/hooks/useNavigateRouter';

const AppRouter = () => {
  useNavigateRouter();
  return (
    <Routes>
      <Route path={Urls.characters} element={<CharacterLayout />}></Route>
      <Route path={Urls.watchList} element={<WatchList />}></Route>
    </Routes>
  );
};
export default AppRouter;
