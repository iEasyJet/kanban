import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../../css/scroll-bar.css';
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import api from '../../api/Api';

let timer;
const timeout = 500;

function Kanban(props) {
  const boardId = props.boardId;
  const [data, setData] = useState([]);

  function onDragEnd() {}

  async function createSection() {
    try {
      const section = await api.createSection(boardId);
      setData([...data, section]);
    } catch {
      alert(
        'Произошла ошибка при запросе к серверу при создании секции доски!'
      );
    }
  }

  async function createTask(sectionId) {
    console.log(sectionId);
  }

  async function changeTitle(e, sectionId) {
    clearTimeout(timer);
    const newTitle = e.target.value;

    const newSectionList = [...data];
    const index = newSectionList.findIndex((b) => b._id === sectionId);
    newSectionList[index].title = newTitle;

    setData(newSectionList);

    timer = setTimeout(async () => {
      try {
        await api.updateSection(boardId, sectionId, { title: newTitle });
      } catch {
        alert(
          'Произошла ошибка при запросе к серверу при обновлении заголовка секции доски!'
        );
      }
    }, timeout);
  }

  async function deleteSection(sectionId) {
    try {
      await api.deleteSection(boardId, sectionId);
      const newSectionList = data.filter(
        (section) => section._id !== sectionId
      );
      setData(newSectionList);
    } catch {
      alert(
        'Произошла ошибка при запросе к серверу при удалении секции доски!'
      );
    }
  }

  useEffect(() => {
    setData(props.sections);
  }, [props.sections]);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button onClick={createSection}>Добавить секцию</Button>
        <Typography variant="body2" fontWeight="700">
          {`Секций: ${data.length}шт.`}
        </Typography>
      </Box>
      <Divider sx={{ margin: '10px 0' }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            width: 'calc(100vw - 400px)',
            overflowX: 'auto',
          }}
        >
          {data.map((section) => (
            <div key={section._id} style={{ width: '300px' }}>
              <Droppable key={section._id} droppableId={section._id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: '300px',
                      padding: '10px',
                      marginRight: '10px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <TextField
                        onChange={(e) => changeTitle(e, section._id)}
                        value={section.title}
                        placeholder="Без названия"
                        variant="outlined"
                        sx={{
                          flexGrow: 1,
                          '& .MuiOutlinedInput-input': { padding: 0 },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'unset',
                          },
                          '& .MuiOutlinedInput-root': { fontSize: '1rem' },
                        }}
                      />
                      <IconButton
                        variant="outlined"
                        size="small"
                        sx={{
                          color: 'grey',
                          '&:hover': { color: 'green' },
                        }}
                        onClick={() => createTask(section._id)}
                      >
                        <AddOutlinedIcon />
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        size="small"
                        sx={{
                          color: 'grey',
                          '&:hover': { color: 'red' },
                        }}
                        onClick={() => deleteSection(section._id)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Box>
                    {section.tasks.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: '10px',
                              marginBottom: '10px',
                              cursor: snapshot.isDraggable
                                ? 'grab'
                                : 'pointer!important',
                            }}
                          ></Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
    </>
  );
}

export default Kanban;
