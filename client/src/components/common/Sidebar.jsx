import {
  Box,
  Drawer,
  IconButton,
  ListItem,
  List,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  function logout() {
    navigate('/login');
    localStorage.removeItem('token');
  }

  const sidebarWidth = 250;
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: '100vh',
        '& > div': { borderRight: 'none' },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: '100vh',
          backgroundColor: '#292929',
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box
          sx={{
            paddingTop: '10px',
          }}
        >
          <ListItem>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" fontWeight="700">
                Избранное
              </Typography>
            </Box>
          </ListItem>
        </Box>
        <Box
          sx={{
            paddingTop: '10px',
          }}
        >
          <ListItem>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" fontWeight="700">
                Приватные
              </Typography>
              <IconButton>
                <AddBoxOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          </ListItem>
        </Box>
      </List>
    </Drawer>
  );
}

export default Sidebar;
