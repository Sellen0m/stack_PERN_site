import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { Context } from '../..';
import { createGroups, fetchGenres } from '../../http/genreAPI';
import { observer } from 'mobx-react-lite';

const CreateGroup = observer(({show, onHide}) => {
    const {groups} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)

    const selectFile = e => {
      setFile(e.target.files[0])
    }

    const addGroup = () =>{
      const formData = new FormData()
      formData.append('name_gr', name)
      formData.append('description_gr', description)
      formData.append('Genres_id', groups.selectedGenre.id)
      formData.append('img', file)

      console.log(name, description, groups.selectedGenre.id, file)
      createGroups(formData).then(data => onHide())
    }

  return (
    <Modal
      show = {show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить Группу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>{groups.selectedGenre.name_gn || "Выберите жанр"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {groups.genres.map(tab =>
                  <Dropdown.Item
                    onClick={() => groups.setSelectedGenre(tab)}
                    key={tab.id}
                  >
                    {tab.name_gn}
                  </Dropdown.Item>    
                )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            className='mt-2'
            placeholder={'Введите название группы'}
          />
          <Form.Control
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='mt-2'
            placeholder={'Введите какое-нибудь описание'}
          />
          <Form.Control
            className='mt-2'
            type='file'
            onChange={selectFile}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addGroup}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
})

export default CreateGroup;