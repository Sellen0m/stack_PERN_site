import React, { useContext} from "react";
import { Button, Container, Dropdown, Modal} from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE } from "../../utils/consts";
import { deleteSong, fetchSongs } from "../../http/genreAPI";

const DeleteSong = observer(({show, onHide}) => {
    const {groups} = useContext(Context)
    const navigate = useNavigate()
   
    const delSong = () => {
        deleteSong(groups.selectedSong.id).then(data => onHide())
        groups.setSelectedSong('')
        navigate(ADMIN_ROUTE) 
        fetchSongs().then(data => groups.setSongs(data))
    }

    return (
            <Modal
                show={show} onHide={onHide}
                size="lg" centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить {groups.selectedSong.name_sg || " песню"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="show-grid">
                <Container>
                Выберите песню:
                    <Dropdown className="mt-2 mb-2" >
                        <Dropdown.Toggle
                        	className="dropbar font-family bg-dark"    
                        >
                            {groups.selectedSong.name_sg || "Выберите песню"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
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
                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={delSong}>Удалить</Button>
            </Modal.Footer>
            </Modal>
    );
})

export default DeleteSong;
