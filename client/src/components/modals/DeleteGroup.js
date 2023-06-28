import React, { useContext} from "react";
import { Button, Container, Dropdown, Modal} from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE } from "../../utils/consts";
import { deleteGroup, fetchGroups } from "../../http/genreAPI";

const DeleteGroup = observer(({show, onHide}) => {
    const {groups} = useContext(Context)
    const navigate = useNavigate()
   
    const delGroup = () => {
        deleteGroup(groups.selectedGroup.id).then(data => onHide())
        groups.setSelectedGroup('')
        navigate(ADMIN_ROUTE) 
        fetchGroups().then(data => groups.setGroups(data))
    }
    console.log(groups.groups.name_gr)
    return (
            <Modal
                show={show} onHide={onHide}
                size="lg" centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить {groups.selectedGroup.name_gr || " группу"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="show-grid">
                <Container>
                Выберите группу:
                    <Dropdown className="mt-2 mb-2" >
                        <Dropdown.Toggle
                        	className="dropbar font-family bg-dark"    
                        >
                            {groups.selectedGroup.name_gr || "Выберите группу"}
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
                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={delGroup}>Удалить</Button>
            </Modal.Footer>
            </Modal>
    );
})

export default DeleteGroup;
