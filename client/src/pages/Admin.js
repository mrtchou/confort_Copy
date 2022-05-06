import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import CreateType from '../modals/CreateType';
import UpdateType from '../modals/UpdateType';
import DeleteType from '../modals/DeleteType';
import CreateProduct from '../modals/CreateProduct';
import DeleteUser from '../modals/DeleteUser';

// On cree les hook pour afficher ou fermer les fonctions
const Admin = () => {
    const [createTypeVisible, setCreateTypeVisible] = useState(false);
    const [updateTypeVisible, setUpdateTypeVisible] = useState(false);
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
    const [createProductVisible, setCreateProductVisible] = useState(false);
    const [deleteUserVisible, setDeleteUserVisible] = useState(false);

    return (
        <Container className='adminContainer'>
            <Form.Text className='adminText'>Categories</Form.Text>
            <Button
                variant='outline-dark'
                className='mt-2'
                onClick={() => setCreateTypeVisible(true)}
            >
                Ajouter une categorie
            </Button>
            <Button
                variant='outline-dark'
                className='mt-2'
                onClick={() => setUpdateTypeVisible(true)}
            >
                Modifier une categorie
            </Button>
            <Button
                variant='outline-dark'
                className='mt-2'
                onClick={() => setDeleteTypeVisible(true)}
            >
                Supprimer une categorie
            </Button>
            <CreateType show={createTypeVisible} onHide={() => setCreateTypeVisible(false)} />
            <UpdateType show={updateTypeVisible} onHide={() => setUpdateTypeVisible(false)} />
            <DeleteType show={deleteTypeVisible} onHide={() => setDeleteTypeVisible(false)} />



            <Form.Text className='adminText'>Produits</Form.Text>
            <Button
                variant='outline-dark'
                className='mt-2'
                onClick={() => setCreateProductVisible(true)}
            >
                Ajouter un produit
            </Button>
            <CreateProduct show={createProductVisible} onHide={() => setCreateProductVisible(false)} />

            <Form.Text className='adminText'>Utilisateurs</Form.Text>
            <Button
                variant='outline-dark'
                className='mt-2'
                onClick={() => setDeleteUserVisible(true)}
            >
                Supprimer un utilisateur
            </Button>
            <DeleteUser show={deleteUserVisible} onHide={() => setDeleteUserVisible(false)} />
        </Container>
    );
};

export default Admin;