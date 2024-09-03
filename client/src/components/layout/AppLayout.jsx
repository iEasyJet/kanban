import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authUtils } from '../../utils/utils';
import Loading from '../common/Loading';
import { Box } from '@mui/material';
import Sidebar from '../common/Sidebar';

// eslint-disable-next-line react/prop-types
function AppLayout({ component }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuth();
      if (!user) {
        navigate('/login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);
  return loading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: 'max-content',
        }}
      >
        {component}
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;
