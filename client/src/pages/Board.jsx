import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/Api';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

function Board() {
  const { boardId } = useParams();
  const [boardInfo, setBoardInfo] = useState({
    title: '',
    description: '',
    sections: [],
    isFavorite: false,
    icon: '',
  });

  useEffect(() => {
    const getBoard = async () => {
      try {
        const board = await api.getOneBoard(boardId);
        setBoardInfo({
          title: board.title,
          description: board.description,
          sections: board.sections,
          isFavorite: board.favorite,
          icon: board.icon,
        });
      } catch (error) {
        alert(error);
      }
    };

    getBoard();
  }, [boardId]);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton variant="outlined">
          {boardInfo.isFavorite ? (
            <StarOutlinedIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant="outlined" color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <Box>
          {' '}
          <TextField
            variant="outlined"
            placeholder="Заголовок доски"
            value={boardInfo.title}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '& .MuiOutlinedInput-root': {
                fontSize: '2rem',
                fontWeight: '700',
              },
            }}
          />
          <TextField
            variant="outlined"
            placeholder="Описание доски"
            value={boardInfo.description}
            fullWidth
            multiline
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '& .MuiOutlinedInput-root': { fontSize: '0.8rem' },
            }}
          />
        </Box>

        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button>Добавить секцию</Button>
            <Typography variant="body2" fontWeight="700">
              {`Секций: ${boardInfo.sections.length}шт.`}
            </Typography>
          </Box>
          <Divider sx={{ margin: '10px 0' }} />
        </Box>
      </Box>
    </>
  );
}

export default Board;
