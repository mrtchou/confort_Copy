import React, { useState, useEffect, useContext } from 'react';
import { Card, Container, Button, Form } from 'react-bootstrap';
import UpdateUser from '../modals/UpdateUser';
import UpdateUserPassword from '../modals/UpdateUserPassword';
import { fetchOneUser } from '../http/userAPI';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import { fetchTypes } from '../http/typeAPI';
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
        fetchTypes().then(data => products.setTypes(data))
    }, [products]);


    // On recupere un utilisateur via un id recuperer dans le token
    useEffect(() => {
        fetchOneUser(id)
            .then(data => setUser(data));
    }, [id]);

    console.log(user.passsword + user.id + user.firstName + user)
    // Fonction pour supprimer le compte de l'utilisateur
    /* const removeUser = async () => {
        await deleteUser(id);           // on supprime le compte
        localStorage.clear();               // on vide le localstorage
        navigate(SHOP_ROUTE);               // on redirige vers la page d'accueil
        window.location.reload();           // on recharge la page pour afficher tout a jours
    }; */

    return (
        <Container className='mt-5 d-flex justify-content-center'>
            <Card className='mt-5 p-2' border="info" style={{ width: '18rem' }}>
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