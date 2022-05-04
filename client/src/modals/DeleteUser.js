import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, ListGroup, Button } from 'react-bootstrap';
import { fetchUsers, deleteUser } from '../http/userAPI';

const DeleteUser = observer(({ show, onHide }) => {
    const [users, setUsers] = useState([]);                 // Stockage des users (utilisateurs)
    const [selectedUser, setSelectedUser] = useState({});   // User selectionne

    // recuperation des users (utilisateurs)
    useEffect(() => {
        fetchUsers()
            .then(data => setUsers(data))
    }, []);








    // Fonction de suppression de user selectionne
    const removeUser = () => {
        deleteUser(selectedUser.id);        // suppression
        onHide();                           // ferme la pop up (Modal)
        window.location.reload();           // Recherge de la page
    };

    // On creer une liste avec les utilisateurs recuperer, et on supprime l'utilisateur selectionne
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
                    Supprimer un utilisateur
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <ListGroup>
                        {users.map(user =>
                            <ListGroup.Item
                                key={user.id}
                                style={{ cursor: 'pointer' }}
                                active={user.id === selectedUser.id}
                                onClick={() => setSelectedUser(user)}
                            >
                                {'ID: ' + user.id + ' - ' + user.firstName + ' ' + user.lastName}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-warning' onClick={removeUser}>Supprimer</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteUser;