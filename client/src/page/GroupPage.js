import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Image, Row, Spinner, Stack } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import { fetchOneGroups, fetchSongs } from '../http/genreAPI'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

const GroupPage = observer(() => {
  const {groups} = useContext(Context)
  const {id} = useParams()

  const [loadingGroup, setLoadingGroup] = useState(true)

  useEffect(() => {
    fetchOneGroups(id).then(data => groups.setSelectedGroup(data)).finally(() => setLoadingGroup(false))
  }, [])

  useEffect(() => {
      fetchSongs(groups.selectedGroup.id).then(data => groups.setSongs(data))
  }, [loadingGroup])
  
  if (loadingGroup) { return <Spinner animation={"grow"} />}

  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + groups.selectedGroup.img} />
          <h2 className='mt-3'>{groups.selectedGroup.name_gr}</h2>
        </Col>
        <Col>
          <div
            style ={{fontSize:16}}
          >
            {groups.selectedGroup.description_gr}
          </div>
        </Col>
      </Row>
      <Stack gap={1}>
        <h4>Песни: </h4>
        {groups.songs.map(songs =>
          <NavLink
            target="_blank"
            rel="noopener noreferrer"
            key={songs.id}
            style={{color:'black', cursor:'pointer'}}
            to={songs.song}
          >
            {songs.name_sg}
          </NavLink>)}
        </Stack>
        
    </Container>
  );
})

export default GroupPage;