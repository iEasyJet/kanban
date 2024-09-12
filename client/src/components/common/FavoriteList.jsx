import { Box, ListItem, Typography, ListItemButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../api/Api';
import { setFavorite } from '../../redux/Slices/favoriteSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function FavoriteList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteBoards = useSelector((state) => state.favorite.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  function onDragEnd() {}

  useEffect(() => {
    async function getFavoriteBoards() {
      console.log(1);

      try {
        const res = await api.getFavoriteBoards();
        dispatch(
          setFavorite(
            res.sort((a, b) => {
              return a.favoritePosition - b.favoritePosition;
            })
          )
        );
      } catch {
        alert('Произошла ошибка при запросе к серверу за избранными досками!');
      }
    }

    getFavoriteBoards();
  }, [dispatch]);

  useEffect(() => {
    const index = favoriteBoards.findIndex((el) => {
      return el._id === boardId;
    });
    setActiveIndex(index);
  }, [favoriteBoards, boardId, navigate]);

  return (
    <>
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={'list-board-droppable-key'}
          droppableId={'list-board-droppable'}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {favoriteBoards.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
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
    </>
  );
}

export default FavoriteList;
