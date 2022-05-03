import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { SHOP_ROUTE } from '../utils/consts';
import UpdateUser from '../modals/UpdateUser';
import UpdateUserPassword from '../modals/UpdateUserPassword';
import { fetchOneUser } from '../http/userAPI';
import { deleteUser } from '../http/userAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { fetchTypes } from '../http/typeAPI';
import DeleteAccount from '../modals/DeleteAccount';






const ResetPassword = observer(() => {
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const { products } = useContext(Context);
    const [updateUserVisible, setUpdateUserVisible] = useState(false);
    const [updateUserPassVisible, setUpdateUserPassVisible] = useState(false);
    const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);



    // regex pour verifier format email adresse
    const validEmail = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
    );













    let messages;

    // Fonction pour se logger ou s'enregistrer
    const click = async () => {

        if (email.length > 5) {
            if (validEmail.test(email)) {
                messages = "Votre demande est bien prise en compte. Un conseiller va vous recontacter rapidement pour vous aider. Merci.";
                console.log(messages)
                setTimeout(function () {
                    alert('\n Votre demande est bien prise en compte.\nUn conseiller va vous recontacter rapidement pour vous aider. Merci.  \n  \n  \n  Vous serez rediriger vers la page d\'accueil. Bonne journée')
                    window.location.replace(SHOP_ROUTE);
                }, 2000);
            } else {
                console.log('Veuillez saisir unddddddde adresse email valide')
            }
        } else {
            console.log('Veuillez saisir une adresse email valide')
        }

    }
    console.log(email + user)





    return (

        <Container
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 695 }} className='p-5'>
                <h2 className='m-auto'> Demande de reinitialisation du mot de passe </h2>

                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Email *'
                        onChange={e => setEmail(e.target.value)}



                    />
                    <Button onClick={click}
                        className='mt-3 align-self'>Envoyer !</Button>

                    <UpdateUserPassword show={updateUserPassVisible} onHide={() => setUpdateUserPassVisible(false)} />


                </Form>

            </Card>
        </Container>


















    );
});

export default ResetPassword;