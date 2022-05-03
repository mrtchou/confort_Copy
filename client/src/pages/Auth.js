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
            //ici un timer enleve le message derreur apres cinq secondes, si non le message reste tout le temps
            setTimeout(setEmailErr, 5000);
            setEmailErr(true);
            console.log('console.log dans fichier auth.js ligne 38 check si email conforme regex')

        } else if (!validPassword.test(password)) {
            //ici un timer enleve le message derreur apres cinq secondes, si non le message reste tout le temps
            setTimeout(setPwdError, 9000);
            setPwdError(true);
            console.log('console.log dans fichier auth.js ligne 42 check si password conforme regex')
        }
        else {
            try {
                console.log(email + 'ligne 46')
                if (isLogin) {
                    // Si on est sur la page LOGIN_ROUTE, on se connecte via email et password
                    await login(email, password);
                    console.log('helllo email bouton valider lentree est cliqué')

                } else {                                    // Si non, on creer un compte
                    await registration(email, password, firstName, lastName);
                }
                user.setUser(user);
                user.setIsAuth(true);           // l'utilisateur est connecter (true)
                navigate(SHOP_ROUTE);           // on redirige vers la page d'accueil
                window.location.reload();       // on recharge la page pour afficher correctement les infos de l'utilisateur
            } catch (e) {

            };

        }
        console.log('probleme if else dans fichier auth.js concernant les regex email et password pour formulaire authentification ou enregistrementligne 44')
    }





    // On affichent LOGIN_ROUTE pous les utilisateur ayant deja un compte, et la page REGISTRATION_ROUTE pour les nouveaux utilisateurs
    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'J\'ai déjà un espace client ' : 'Créer mon espace client'}</h2>
                {isLogin ?
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3'
                            placeholder='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        {emailErr && <p className='danger'>Votre adresse email n'est pas valide. </p>}
                        <Form.Control
                            className='mt-3'
                            placeholder='Mot de passe'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required

                        />
                        {pwdError && <p variant='danger'>Votre mot de passe est invalide.</p>}
                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            <NavLink href={RESET_PASSWORD}>Mot de passe oublié ?</NavLink>


                        </div>
                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">

                            <Button
                                className='mt-3 align-self-end'
                                variant='outline-success'

                                onClick={click}
                            >
                                Valider
                            </Button>

                            <Button
                                variant='outline-secondary' className='mt-3 align-self-end' href={REGISTRATION_ROUTE}
                            >
                                Créer un nouveau compte !
                            </Button>

                        </div>



                    </Form>

                    :

                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3'
                            placeholder='Email *'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {emailErr && <p className='danger'>Votre adresse email n'est pas valide. </p>}

                        <Form.Control
                            className='mt-3'
                            placeholder='Mot de passe *'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {pwdError && <p variant='danger'>Votre mot de passe doit inclure soit des lettres soit des chiffres et minimum six symboles.</p>}

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

                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">

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

                        </div>
                    </Form>
                }
            </Card>
        </Container>
    );
});

export default Auth;