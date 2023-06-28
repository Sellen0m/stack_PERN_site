import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import GenreBar from '../components/GenreBar';
import GroupList from '../components/GroupList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchGenres, fetchGroups } from '../http/genreAPI';
import SortGroups from '../components/SortGroups';

const Groups = observer(() => {
  const {groups} = useContext(Context)

  useEffect(() => {
    fetchGenres().then(data => groups.setGenres(data))
    fetchGroups().then(data => groups.setGroups(data))
  }, [])

  useEffect(() => {
    fetchGroups(groups.selectedGenre.id).then(data => groups.setGroups(data))
  }, [groups.selectedGenre]
  ) 

  return (
    <Container>
      <Row className='mt-3'>
        <Col md={3}>
          <GenreBar/>
          <SortGroups/>
        </Col>
        <Col md={9}>
          <GroupList/>
          
        </Col>
      </Row>
    </Container>
  );
})

export default Groups;