import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { deleteProduct } from '../http/productAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';

const DeleteProduct = observer(({ show, onHide }) => {
    const { id } = useParams();
    const navigate = useNavigate();


    const removeProduct = () => {
        deleteProduct(id);              // On supprime le produit via son id
        navigate(SHOP_ROUTE);           // On redirige vers l'accueil
        window.location.reload();       // On recharge la page pour afficher tout a jour
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>Supprimer un produit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Êtes vous sûrs de vouloir supprimer ce produuit ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={removeProduct}>Supprimer</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteProduct;