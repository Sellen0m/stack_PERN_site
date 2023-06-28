import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { Context } from '../..';
import { createSongs, fetchGroups } from '../../http/genreAPI';
import { observer } from 'mobx-react-lite';

const CreateSong = observer(({show, onHide}) => {
  const {groups} = useContext(Context)
  const [name, setName] = useState('')
  const [song, setSong] = useState('')
  

  const addSong = () =>{
    const formData = new FormData()
    formData.append('name_sg', name)
    formData.append('Groups_id', groups.selectedGroup.id)
    formData.append('song', song)

    createSongs(formData).then(data => onHide())
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
          Добавить Песню
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{groups.selectedGroup.name_gr || "Выберите группу"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {groups.groups.map(tab =>
                    <Dropdown.Item
                      onClick={() => groups.setSelectedGroup(tab)}
                      key={tab.id}
                    >
                      {tab.name_gr}
                    </Dropdown.Item>    
                )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            className='mt-2'
            placeholder={'Введите название песни'}
          />
          <Form.Control
            value={song}
            onChange={e => setSong(e.target.value)}
            className='mt-2'
            placeholder={'Вставьте ссылку на песню в YouTube'}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addSong}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
})

export default CreateSong;