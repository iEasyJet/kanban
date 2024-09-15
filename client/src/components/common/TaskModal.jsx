import {
  Backdrop,
  Modal,
  Fade,
  Box,
  IconButton,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';
import api from '../../api/Api';

const modalStyle = {
  outline: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 1,
  height: '80%',
};

let timer;
const timeout = 500;

function TaskModal(props) {
  const boardId = props.boardId;
  const [task, setTask] = useState(props.task);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function onClose() {
    props.onClose();
    props.onUpdate();
  }

  async function deleteTask() {
    try {
      await api.deleteTask(boardId, task._id);
      props.onDelete(task);
      setTask(undefined);
    } catch {
      alert('Произошла ошибка при запросе к серверу при удалении задачи!');
    }
  }

  async function updateTitle(e) {
    clearTimeout(timer);
    const newTitle = e.target.value;

    timer = setTimeout(async () => {
      try {
        await api.updateTask(boardId, task._id, { title: newTitle });
      } catch {
        alert(
          'Произошла ошибка при запросе к серверу при обновлении заголовка секции доски!'
        );
      }
    }, timeout);
  }

  useEffect(() => {
    setTask(props.task);
    setTitle(props.task ? props.task.title : '');
    setContent(props.task ? props.task.content : '');
  }, [props.task]);

  return (
    <Modal
      open={task !== undefined}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={task}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <IconButton variant="outlined" color="error" onClick={deleteTask}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
              padding: '2rem 5rem 5rem',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Заголовок задачи"
              value={title}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
                '& .MuiOutlinedInput-root': {
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                },
              }}
              onChange={(e) => updateTitle(e)}
            />
            <Typography variant="body2" fontWeight="700">
              {task ? Moment(task.createdAt).format('DD-MM-YYYY') : ''}
            </Typography>
            <Divider sx={{ margin: '1.5rem 0' }} />
            <Box
              sx={{
                height: '80%',
                overflowX: 'hidden',
                overflowY: 'auto',
              }}
            >
              <CKEditor editor={ClassicEditor} data={content} />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default TaskModal;
