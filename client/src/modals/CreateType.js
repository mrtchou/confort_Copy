import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createType } from '../http/typeAPI';

const CreateType = ({ show, onHide }) => {
    const [value, setValue] = useState('');

    // Fonction pour creer un nouveau type (categorie)
    const addType = () => {
        createType({ name: value }).then(data => {
            setValue('');                   // On stock la valeur du nouveau type
            onHide();                       // On ferme la pop up (Modal)
            window.location.reload();       // On recharge la page pour l'afficher a jour
        });
    };

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
                    Ajouter une nouvelle categorie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Nom de la catagorie'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={addType}>Ajouter</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateType;