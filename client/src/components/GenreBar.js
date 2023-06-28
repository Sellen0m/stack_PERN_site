import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';
import { fetchGroups } from '../http/genreAPI';

const GenreBar = observer(() => {
    const {groups} = useContext(Context)

  function setAllGroup(){
    groups.setSelectedGroup('')
    groups.setSelectedGenre('')
    fetchGroups().then(data => groups.setGroups(data))
  }
  
  return (
    <ListGroup>
      <ListGroup.Item
                onClick={() => setAllGroup()}
                style={{cursor: 'pointer'}}
            >
                Все Группы
            </ListGroup.Item>
      {groups.genres.map(tab =>
        <ListGroup.Item
          active={tab.id === groups.selectedGenre.id}
          style={{cursor: 'pointer'}}
          onClick={() => groups.setSelectedGenre(tab)}
          key={tab.id}
        >
          {tab.name_gn}
        </ListGroup.Item>
        )}
    </ListGroup>
  );
})

export default GenreBar;