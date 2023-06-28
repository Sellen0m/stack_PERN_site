import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap';
import CreateGenre from '../components/modals/CreateGenre';
import CreateGroup from '../components/modals/CreateGroup';
import CreateSong from '../components/modals/CreateSong';
import DeleteGroup from '../components/modals/DeleteGroup';
import { observer } from 'mobx-react-lite';
import DeleteSong from '../components/modals/DeleteSong';
import UpdateGenre from '../components/modals/UpdateGenre';
import UpdateGroup from '../components/modals/UpdateGroup';
import { fetchGenres, fetchGroups, fetchSongs } from '../http/genreAPI';
import { Context } from '..';
import UpdateSong from '../components/modals/UpdateSong';

const Admin = observer(() => {
  const {groups} = useContext(Context)

  const [genreVisible, setGenreVisible] = useState(false)
  const [groupVisible, setGroupVisible] = useState(false)
  const [songVisible, setSongVisible] = useState(false)

  const [genreVisibleUpdate, setGenreVisibleUpdate] = useState(false)
  const [groupVisibleUpdate, setGroupVisibleUpdate] = useState(false)
  const [songVisibleUpdate, setSongVisibleUpdate] = useState(false)

  const [groupVisibleDelete, setGroupVisibleDelete] = useState(false)
  const [songVisibleDelete, setSongVisibleDelete] = useState(false)

  const [loadingGenre, setLoadingGenre] = useState(true)
  const [loadingGroup, setLoadingGroup] = useState(true)
  const [loadingSong, setLoadingSong] = useState(true)

  useEffect(() => {
    fetchGenres().then(data => groups.setGenres(data)).finally(() => setLoadingGenre(false))
    fetchGroups().then(data => groups.setGroups(data)).finally(() => setLoadingGroup(false))
    fetchSongs().then(data => groups.setSongs(data)).finally(() => setLoadingSong(false))
  }, [])

  if (loadingGenre || loadingGroup || loadingSong) { return <Spinner animation={"grow"} />}

  return (
    <Container className='d-flex flex-column'>
      <Button
        variant={'outline-dark'}
        className='mt-2'
        onClick={() => setGenreVisible(true)}
      >
        Добавить жанр
      </Button>
      <Button
        variant={'outline-dark'}
        className='mt-2'
        onClick={() => setGroupVisible(true)}
      >
        Добавить группу
      </Button>
      <Button
        variant={'outline-dark'}
        className='mt-2'
        onClick={() => setSongVisible(true)}
      >
        Добавить песню
      </Button>
      <Button
        variant={'outline-dark'}
        className='mt-2'
        onClick={() => setGenreVisibleUpdate(true)}
      >
        Изменить жанр
      </Button>
      <Button
        variant={'outline-dark'}
        className='mt-2'
        onClick={() => setGroupVisibleUpdate(true)}
      >
        Изменить группу
      </Button>
      <Button
        variant={'outline-dark'}
        className='mt-2'
        onClick={() => setSongVisibleUpdate(true)}
      >
        Изменить песню
      </Button>
      <Button
        variant={'outline-dark'}
        className='mt-2'
        onClick={() => setGroupVisibleDelete(true)}
      >
        Удалить группу
      </Button>
      <Button
        variant={'outline-dark'}
        className='mt-2'
        onClick={() => setSongVisibleDelete(true)}
      >
        Удалить песню
      </Button>
      <CreateGenre show={genreVisible} onHide={() => setGenreVisible(false)}/>
      <CreateGroup show={groupVisible} onHide={() => setGroupVisible(false)}/>
      <CreateSong show={songVisible} onHide={() => setSongVisible(false)}/>
      <UpdateGenre show={genreVisibleUpdate} onHide={() =>setGenreVisibleUpdate(false)}/>
      <UpdateGroup show={groupVisibleUpdate} onHide={() =>setGroupVisibleUpdate(false)}/>
      <UpdateSong show={songVisibleUpdate} onHide={() =>setSongVisibleUpdate(false)}/>
      <DeleteGroup show={groupVisibleDelete} onHide={() =>setGroupVisibleDelete(false)}/>
      <DeleteSong show={songVisibleDelete} onHide={() =>setSongVisibleDelete(false)}/>
    </Container>
  );
})

export default Admin;