import AppLayout from 'components/AppLayout/AppLayout';
import AppRouter from 'components/Router/AppRouter';

const App = () => {
  return <AppLayout children={<AppRouter />} />;
};

export default App;
