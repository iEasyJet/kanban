import {
  Box,
  Drawer,
  IconButton,
  ListItem,
  List,
  Typography,
  ListItemButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/Api';
import { setBoard } from '../../redux/Slices/boardSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.board.value);
  const [activeIndex, setActiveIndex] = useState(0);

  const sidebarWidth = 250;

  function logout() {
    navigate('/login');
    localStorage.removeItem('token');
  }

  async function onDragEnd({ source, destination }) {
    const newList = [...boards];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((item) => {
      return item._id === boardId;
    });

    setActiveIndex(activeItem);
    dispatch(setBoard(newList));

    try {
      await api.updatePositionsBoards({ boards: newList });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    async function getBoards() {
      try {
        const res = await api.getAllBoards();
        dispatch(
          setBoard(
            res.sort((a, b) => {
              return a.position - b.position;
            })
          )
        );
      } catch (error) {
        alert(error);
      }
    }

    getBoards();
  }, [dispatch]);

  useEffect(() => {
    const index = boards.findIndex((el) => {
      return el._id === boardId;
    });

    if (boards.length > 0 && boardId === undefined) {
      navigate(`/boards/${boards[0]._id}`);
    }

    setActiveIndex(index);
  }, [boards, boardId, navigate]);

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
        />
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

        <Box
          sx={{
            paddingTop: '10px',
          }}
        />
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key={'list-board-droppable-key'}
            droppableId={'list-board-droppable'}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${item._id}`}
                        sx={{
                          pl: '20px',
                          cursor: snapshot.isDragging
                            ? 'grab'
                            : 'pointer!important',
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
}

export default Sidebar;
