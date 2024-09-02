import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
/* import AppLayout from '../src/components/layout/AppLayout';
import AuthLayout from '../src/components/layout/AuthLayout'; */
import Home from '../src/pages/Home';
import Board from '../src/pages/Board';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/boards',
    element: <Board />,
  },
  {
    path: '/boards/:boardId',
    element: <Board />,
  },
]);

function App() {
  const theme = createTheme({
    palette: { mode: 'dark' },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

