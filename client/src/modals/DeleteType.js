import React, { useContext } from 'react';
import { Modal, Form, ListGroup, Button } from 'react-bootstrap';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { deleteType } from '../http/typeAPI';
import TypeList from '../components/TypeList';

const DeleteType = observer(({ show, onHide }) => {
    const { products } = useContext(Context);
    let id = products.selectedType.id;      // Recuperation de l'id du type (categorie) selectinne depuis {products}


    const removeType = () => {
        deleteType(id);             // On supprime le type (la categorie)
        onHide();                   // On ferme la pop up (Modal)
        window.location.reload();   // On recharge la page pour afficher la page a jour
    };

    // On importe la liste des types et on les affiches dans la Modal
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
                    Supprimer une catagorie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <ListGroup>
                        <TypeList />
                    </ListGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <p className='m-2' style={{ color: 'red' }}>Attention ! Si vous supprimer une categorie, tous les produits de cette categories seront aussi supprimés !</p>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={removeType}>Supprimer</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteType;