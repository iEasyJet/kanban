import { Box, CircularProgress } from '@mui/material';

function Loading(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // eslint-disable-next-line react/prop-types
        height: props.fullHeight ? '100vh' : '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
