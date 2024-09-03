import { Box, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    /*  */
    setLoading(true);
  }

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Имя пользователя"
          name="username"
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Пароль"
          name="password"
          type="password"
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Войти
        </LoadingButton>
      </Box>
      <Button LinkComponent={Link} to="/signup" sx={{ textTransform: 'none' }}>
        Нет аккаунта? Зарегистрироваться.
      </Button>
    </>
  );
}

export default Login;
