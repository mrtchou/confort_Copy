import React, { useState, useContext } from 'react';
import { Button, Card, Container, Form, NavLink } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, RESET_PASSWORD } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';


const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);


    //Regex Email et password pour formulaire authentification et enregistrement.
    const validEmail = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
    );
    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

    // Fonction pour se logger ou s'enregistrer
    const click = async () => {
        if (!validEmail.test(email)) {
            // Ici un timer enleve le message d'erreur apres cinq secondes, si non le message reste tout le temps
            setTimeout(setEmailErr, 5000);
            setEmailErr(true);
        } else if (!validPassword.test(password)) {
            setTimeout(setPwdError, 9000);
            setPwdError(true);
        } else {
            try {
                if (isLogin) {
                    // Si on est sur la page LOGIN_ROUTE, on se connecte via email et password
                    await login(email, password);
                } else {                                    // Si non, on creer un compte
                    await registration(email, password, firstName, lastName);
                }
                user.setUser(user);
                user.setIsAuth(true);
                navigate(SHOP_ROUTE);
                window.location.reload();
            } catch (e) {
                alert(e.response.data.message)
            };
        };
    };



    // On affichent LOGIN_ROUTE pous les utilisateur ayant deja un compte, et la page REGISTRATION_ROUTE pour les nouveaux utilisateurs
    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className='p-5'>
                <h2 className='m-auto'>{isLogin ? `J'ai déjà un espace client` : `Créer mon espace client`}</h2>
                {isLogin ?
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3'
                            placeholder='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        {emailErr && <Form.Text className='inputInvalid' >Votre adresse email n'est pas valide. </Form.Text>}
                        <Form.Control
                            className='mt-3'
                            placeholder='Mot de passe'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required

                        />
                        {pwdError && <Form.Text className='inputInvalid' >Votre mot de passe est invalide.</Form.Text>}

                        <NavLink href={RESET_PASSWORD}>Mot de passe oublié ?</NavLink>

                        <Button
                            className='mt-3 align-self-end'
                            variant='outline-success'
                            onClick={click}
                        >
                            Se connecter
                        </Button>

                        <Button
                            variant='outline-secondary'
                            className='mt-3 align-self-end'
                            href={REGISTRATION_ROUTE}
                        >
                            Créer un nouveau compte !
                        </Button>


                    </Form>

                    :

                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3'
                            placeholder='Email *'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {emailErr && <Form.Text className='inputInvalid' >Votre adresse email n'est pas valide. </Form.Text>}

                        <Form.Control
                            className='mt-3'
                            placeholder='Mot de passe *'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {pwdError && <Form.Text className='inputInvalid' >Votre mot de passe doit inclure soit des lettres soit des chiffres et minimum six symboles.</Form.Text>}

                        <Form.Control
                            className='mt-3'
                            placeholder='Prenom *'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Nom *'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />

                        <NavLink href={RESET_PASSWORD}>Mot de passe oublié ?</NavLink>

                        <Button
                            className='mt-3 align-self-end'
                            variant='outline-success'
                            onClick={click}
                        >
                            Créer mon compte
                        </Button>

                        <Button
                            variant='outline-secondary'
                            className='mt-3 align-self-end'
                            href={LOGIN_ROUTE}>Se connecter!</Button>
                    </Form>
                }
            </Card>
        </Container>
    );
});

export default Auth;