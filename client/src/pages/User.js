import React, { useState, useEffect, useContext } from 'react';
import { Card, Container, Button, Form } from 'react-bootstrap';
import { fetchOneUser } from '../http/userAPI';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import { fetchTypes } from '../http/typeAPI';
import UpdateUser from '../modals/UpdateUser';
import UpdateUserPassword from '../modals/UpdateUserPassword';
import DeleteAccount from '../modals/DeleteAccount';

const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const { products } = useContext(Context);
    const [updateUserVisible, setUpdateUserVisible] = useState(false);
    const [updateUserPassVisible, setUpdateUserPassVisible] = useState(false);
    const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);


    // On affiche les categories
    useEffect(() => {
        fetchTypes().then(data => products.setTypes(data));
    }, []);


    // On recupere un utilisateur via un id recuperer dans le token
    useEffect(() => {
        fetchOneUser(id).then(data => setUser(data));
    }, []);


    return (
        <Container className='userContainer'>
            <Card className='userCard'>
                <Card.Header>Mes coordonnes:</Card.Header>
                <Form>
                    <Form.Label className='mt-3'>Prenom:</Form.Label>
                    <Form.Control placeholder={user.firstName} disabled />

                    <Form.Label className='mt-2'>Nom:</Form.Label>
                    <Form.Control placeholder={user.lastName} disabled />

                    <Form.Label className='mt-2'>Email:</Form.Label>
                    <Form.Control placeholder={user.email} disabled />

                    <Form.Label className='mt-2'>Adresse:</Form.Label>
                    <Form.Control placeholder={user.adress} disabled />

                    <Form.Label className='mt-2'>Code postale:</Form.Label>
                    <Form.Control placeholder={user.zip} disabled />

                    <Form.Label className='mt-2'>Ville:</Form.Label>
                    <Form.Control placeholder={user.city} disabled />

                    <Form.Label className='mt-2'>Pays:</Form.Label>
                    <Form.Control placeholder={user.country} disabled />

                    <Form.Label className='mt-2'>Telephone:</Form.Label>
                    <Form.Control placeholder={user.phone} disabled />
                </Form>

                <Button
                    className='mt-5'
                    variant='outline-warning'
                    onClick={() => setUpdateUserVisible(true)}
                >
                    Modifier mes informations
                </Button>
                <UpdateUser show={updateUserVisible} onHide={() => setUpdateUserVisible(false)} />

                <Button
                    className='mt-2'
                    variant='outline-warning'
                    onClick={() => setUpdateUserPassVisible(true)}
                >
                    Modifier mon mot de passe
                </Button>
                <UpdateUserPassword show={updateUserPassVisible} onHide={() => setUpdateUserPassVisible(false)} />

                <Button
                    className='mt-2'
                    variant='outline-danger'
                    onClick={() => setDeleteAccountVisible(true)}
                >
                    Supprimer mon compte
                </Button>
                <DeleteAccount show={deleteAccountVisible} onHide={() => setDeleteAccountVisible(false)} />
            </Card>
        </Container>
    );
};

export default User;