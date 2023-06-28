import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { fetchGenres, updateGroup } from "../../http/genreAPI";

const UpdateGroup = observer(({ show, onHide }) => {

    const {groups} = useContext(Context)

    //Поля данных
    const [name_group, setName_group] = useState(null)
    const [img_group, setImg_group] = useState(null)
    const [description_group, setDescription_group] = useState(null)

    //Флаги выбора параметров (выбран для изменения или нет)
    const [choiceName_group, setChoiseName_group] = useState(false)
    const [choiceImg_group, setChoicePicture_group] = useState(false)
    const [choiceDescription_group, setChoiceDescription_group] = useState(false)
    const [choiceGenre_group, setChoiceGenre_group] = useState(false)

    const selectFile = e => {setImg_group(e.target.files[0])}
    const onSwitchActionName = () => {setChoiseName_group(!choiceName_group);};
    const onSwitchActionImg = () => {setChoicePicture_group(!choiceImg_group);};
    const onSwitchActionDes = () => {setChoiceDescription_group(!choiceDescription_group);};
    const onSwitchActionGenre = () => {setChoiceGenre_group(!choiceGenre_group);};
    
    const updCharacter = () => {
        const formData = new FormData()

        if(choiceName_group){
            formData.append('name_gr', name_group)
            updateGroup(groups.selectedGroup.id, "Name" , formData).then(data => onHide())
        }
        if(choiceImg_group){
            formData.append('img', img_group)
            updateGroup(groups.selectedGroup.id, "Pic" , formData).then(data => onHide())
        }
        if(choiceDescription_group){
            formData.append('description_gr', description_group)
            updateGroup(groups.selectedGroup.id, "Des" , formData).then(data => onHide())
        }
        if(choiceGenre_group){
            formData.append('Genres_id', groups.selectedGenre.id)
            updateGroup(groups.selectedGroup.id, "Genre" , formData).then(data => onHide()
            )
        }
        if(!(choiceName_group || choiceImg_group || choiceDescription_group || choiceGenre_group))
        {console.log("Не будет изменено")}

    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {"Изменить информацию о " + groups.selectedGroup.name_gr || "Изменить информацию"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle
                        className="dropbar bg-dark"
                    >{groups.selectedGroup.name_gr || "Выберите группу"}</Dropdown.Toggle>
                    <Dropdown.Menu >
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
                <hr></hr>
                    Измените параметры:
                    <Row>
                        <Col sm={1} className="d-flex justify-content-center mt-2 ">
                            <Form.Switch
                                onChange={onSwitchActionGenre}
                                className="mt-2"
                                style={{width:50}}
                            />
                        </Col>
                        <Col>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle  disabled={!choiceGenre_group} className="dropbar bg-dark">
                                    {groups.selectedGenre.name_gn || "Выберите жанр группы"}
                                    </Dropdown.Toggle>
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

                        </Col>
                    </Row>

                <Form>
                    <Form.Switch label={`Название группы`} onChange={onSwitchActionName}/>
                    <Form.Control
                        disabled={!choiceName_group}
                        value={name_group}
                        onChange={e => setName_group(e.target.value)}
                        className="mt-2 mb-4"
                        placeholder={groups.selectedGroup.name_gr || "Название группы"}
                    />
                </Form>
                <Form.Switch label={`Изображение группы`} onChange={onSwitchActionImg}/>
                <Form.Control
                    disabled={!choiceImg_group}
                    type="file"
                    onChange={selectFile}
                    className="mb-4"
                />
                <Form.Switch label={`Описание группы`} onChange={onSwitchActionDes}/>

                <Form.Group className="mb-3">
                    <Form.Control
                        disabled={!choiceDescription_group}
                        value={description_group}
                        onChange={e => setDescription_group(e.target.value)}
                        as="textarea" rows={3}
                        placeholder={groups.selectedGroup.description_gr || "Описание группы"}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={updCharacter}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default UpdateGroup;
