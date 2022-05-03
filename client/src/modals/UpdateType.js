import React, { useState, useEffect } from 'react';
import { Modal, Form, Dropdown, Button } from 'react-bootstrap';
import { updateType } from '../http/typeAPI';
import { observer } from 'mobx-react-lite';
import { fetchTypes } from '../http/typeAPI';

const UpdateType = observer(({ show, onHide }) => {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState({});
    const [value, setValue] = useState('');

    useEffect(() => {
        fetchTypes()                    // On recupere le types (categories)
            .then(data => setTypes(data));  // On les stock dans le hook types
    }, []);

    const changeType = () => {
        updateType(selectedType.id, { name: value });     // On met a jour le nom de du type (categorie)
        onHide();                                       // On ferme la pop up (Modal)
        window.location.reload();                       // On recharge la page pour tout afficher a jour
    };

    // On affiche les types dans un Dropdown, puis on stock l'id du type selectionne dans selectedType pour modifier le nom de celui ci
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modifier une catagorie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{selectedType.name || "Choisissez la categorie"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    style={{ cursor: 'pointer' }}
                                    active={type.id === selectedType.id}
                                    onClick={() => setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Nouveau nom de la categorie'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={changeType}>Modifier</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateType;