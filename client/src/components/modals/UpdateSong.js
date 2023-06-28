import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { fetchGroups, updateSong } from "../../http/genreAPI";

const UpdateSong = observer(({ show, onHide }) => {

    const {groups} = useContext(Context)

    //Поля данных
    const [name_song, setName_song] = useState(null)
    const [song_song, setSong_song] = useState(null)

    //Флаги выбора параметров (выбран для изменения или нет)
    const [choiceName_song, setChoiseName_song] = useState(false)
    const [choiceSong_song, setChoiceSong_song] = useState(false)
    const [choiceGroup_song, setChoiceGroup_song] = useState(false)

    const onSwitchActionName = () => {setChoiseName_song(!choiceName_song);};
    const onSwitchActionSong = () => {setChoiceSong_song(!choiceSong_song);};
    const onSwitchActionGroup = () => {setChoiceGroup_song(!choiceGroup_song);};
    
    const updSong = () => {
        const formData = new FormData()

        if(choiceName_song){
            formData.append('name_sg', name_song)
            updateSong(groups.selectedGroup.id, "Name" , formData).then(data => onHide())
        }
        if(choiceSong_song){
            formData.append('song', song_song)
            updateSong(groups.selectedGroup.id, "Song" , formData).then(data => onHide())
        }
        if(choiceGroup_song){
            formData.append('Groups_id', groups.selectedGroup.id)
            updateSong(groups.selectedGroup.id, "Group" , formData).then(data => onHide()
            )
        }
        if(!(choiceName_song || choiceSong_song || choiceGroup_song))
        {console.log("Не будет изменено")}

    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {"Изменить информацию о " + groups.selectedSong.name_sg || "Изменить информацию"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle
                        className="dropbar bg-dark"
                    >{groups.selectedSong.name_gr || "Выберите песню"}</Dropdown.Toggle>
                    <Dropdown.Menu >
                        {groups.songs.map(tab =>
                            <Dropdown.Item
                                onClick={() => groups.setSelectedSong(tab)}
                                key={tab.id}
                            >                            
                                {tab.name_sg}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <hr></hr>
                    Измените параметры:
                    <Row>
                        <Col sm={1} className="d-flex justify-content-center mt-2 ">
                            <Form.Switch
                                onChange={onSwitchActionGroup}
                                className="mt-2"
                                style={{width:50}}
                            />
                        </Col>
                        <Col>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle  disabled={!choiceGroup_song} className="dropbar bg-dark">
                                    {groups.selectedGroup.name_gr || "Выберите Группу"}
                                    </Dropdown.Toggle>
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

                        </Col>
                    </Row>

                <Form>
                    <Form.Switch label={`Название песни`} onChange={onSwitchActionName}/>
                    <Form.Control
                        disabled={!choiceName_song}
                        value={name_song}
                        onChange={e => setName_song(e.target.value)}
                        className="mt-2 mb-4"
                        placeholder={groups.selectedSong.name_sg || "Название песни"}
                    />
                </Form>
                <Form.Switch label={`Ссылка на песню в YouTube`} onChange={onSwitchActionSong}/>
                <Form.Group className="mb-3">
                    <Form.Control
                        disabled={!choiceSong_song}
                        value={song_song}
                        onChange={e => setSong_song(e.target.value)}
                        as="textarea" rows={3}
                        placeholder={groups.selectedSong.song || "Ссылка на песню в YouTube"}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={updSong}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default UpdateSong;
