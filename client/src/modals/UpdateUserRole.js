import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, ListGroup } from 'react-bootstrap';
import { fetchUsers } from '../http/userAPI';


const UpdateUserRole = ({ show, onHide }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});


    useEffect(() => {
        fetchUsers()
            .then(data => setUsers(data));
    }, []);

    const changeUserRole = () => {

    };
    console.log(selectedUser)

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
                    Modifier le role d'un utilisateur
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {users.map(user =>
                        <ListGroup.Item
                            key={user.id}
                            style={{ cursor: 'pointer' }}
                            active={user.id === selectedUser.id}
                            onClick={() => setSelectedUser(user)}
                        >
                            {'ID: ' + user.id + ' - ' + user.firstName + ' ' + user.lastName + ' ' + user.role}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Form className=''>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={selectedUser.role === 'USER' ? "Activer Mode ADMIN pour cet utilisateur?" : "Desactiver Mode ADMIN pour cet utilisateur?"}
                    />
                </Form>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={changeUserRole}>Soumettre</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateUserRole;

/* <Modal
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
                    {user.map(user => 
                        <ListGroup.Item 
                            key={user.id}
                            style={{cursor: 'pointer'}}
                            active={user.id === selectedUser.id}
                            onClick={() => setSelectedUser(user)}
                        >
                            {'ID: ' + user.id + ' - ' + user.firstName + ' ' + user.lastName + `: "Role" - ` + user.role}
                        </ListGroup.Item>  
                    )}
                    </ListGroup>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>{selectedUser.role || "Choisissez le role pour l'utilisateur"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                                <Dropdown.Item onClick={setRole}>{'ADMIN'}</Dropdown.Item>
                                <Dropdown.Item onClick={setRole}>{'USER'}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>    
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-warning' onClick={changeUserRole}>Changer role</Button>
            </Modal.Footer>
        </Modal> */