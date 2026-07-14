import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import DashboardPlaceholder from './pages/DashboardPlaceholder';
import { ROUTES } from './utils/constants';
import Analyze from "./pages/Analyze";
import History from "./pages/History";
import AnalysisDetails from "./pages/AnalysisDetails";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#121821',
            color: '#E6EDF3',
            border: '1px solid #232B38',
            fontSize: '13px',
          },
          success: { iconTheme: { primary: '#3DDC97', secondary: '#121821' } },
          error: { iconTheme: { primary: '#FF5D5D', secondary: '#121821' } },
        }}
      />

      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.ANALYZE} element={<Analyze />} />
          <Route path="/history" element={<History />} />

          <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPlaceholder />} />
          <Route path={ROUTES.ANALYZE} element={<Analyze />} />
          <Route path="/history/:id" element={<AnalysisDetails />} />
          <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
