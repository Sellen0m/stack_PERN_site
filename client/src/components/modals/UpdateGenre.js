import React, { useContext, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { fetchGenres, updateGenre } from "../../http/genreAPI";
import { observer } from "mobx-react-lite";

const UpdateGenre = observer(({ show, onHide }) => {
    const {groups} = useContext(Context)
    const [value, setValue] = useState('')

    const updGenre = () => {
        updateGenre(groups.selectedGenre.id, {name_gn: value }).then(data => { onHide()})
        fetchGenres().then(data => groups.setGenres(data))
    }

    return (
        <Modal  show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить название жанра
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form className="d-flex justify-content-center">
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle
                        className="dropbar font-family bg-dark"
                        >{groups.selectedGenre.name_gn || "Выберите жанр"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {groups.genres.map(genre =>
                                <Dropdown.Item
                                    onClick={() => groups.setSelectedGenre(genre)}
                                    key={genre.id}
                                >
                                    {genre.name_gn}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название жанра"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={updGenre}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default UpdateGenre;
