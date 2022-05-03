import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteUser } from '../http/userAPI';
import { SHOP_ROUTE } from '../utils/consts';

const DeleteAccount = ({ show, onHide }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fonction pour supprimer le compte de l'utilisateur
    const deleteAccount = async () => {
        await deleteUser(id);           // on supprime le compte
        localStorage.clear();               // on vide le localstorage
        navigate(SHOP_ROUTE);               // on redirige vers la page d'accueil
        window.location.reload();           // on recharge la page pour afficher tout a jours
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>Supprimer mon comte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Êtes vous sûrs de vouloir supprimer votre compte?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={deleteAccount}>Supprimer</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteAccount;