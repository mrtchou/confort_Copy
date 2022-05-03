import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { updateUserPassword } from '../http/userAPI';
import { useParams, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';

const UpdateUserPassword = ({ show, onHide }) => {
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const changeUserPassword = () => {
        updateUserPassword(id, password);
        onHide();
        /* localStorage.removeItem('token');
        navigate(LOGIN_ROUTE);
        window.location.reload(); */
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modifier mon mot de passe
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className='mt-3'
                        placeholder='Nouveau mot de passe'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={changeUserPassword}>Modifier</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateUserPassword;