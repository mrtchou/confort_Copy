import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LOGIN_ROUTE, SHOP_ROUTE, ADMIN_ROUTE, USER_ROUTE, TYPE_ROUTE } from '../utils/consts';
import { fetchOneUser } from '../http/userAPI';
import jwt_decode from 'jwt-decode';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const { products } = useContext(Context);
    const [userInfo, setUserInfo] = useState([]);

    // Fonction pour deconnecter l'utilisateur
    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        window.location.reload();
    };


    // S'il y a un token, on le stock dans jwt pour recuper l'id de l'utilisateur et son role pour la NavBar
    if (localStorage.getItem('token')) {
        const jwt = jwt_decode(localStorage.getItem('token'));
        const sessionExpired = () => {
            const date = Date.now();
            const dateString = date.toString();
            const now = dateString.slice(0, 10);
            if (jwt.exp < now) {
                logOut();
            };
        };

        useEffect(() => {
            fetchOneUser(jwt.id)                // on recupere un utilisateur par son id
                .then(data => setUserInfo(data))    // on stock les infos recuperer pour les utiliser dans la NavBar
            sessionExpired();
        }, []);
    };


    return (
        <Navbar id='NavBar'>
            <Container>
                <Navbar.Brand id='siteTitle' href={SHOP_ROUTE}>Confort & Design</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={SHOP_ROUTE}>Accueil</Nav.Link>
                        <NavDropdown title="Categories" id="collasible-nav-dropdown">
                            {products.types.map(type =>
                                <NavDropdown.Item
                                    id='NavBarItems'
                                    href={TYPE_ROUTE + '/' + type.id}
                                    onClick={() => products.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Nav>
                    {localStorage.getItem('token') ?        // S'il y a un token dans le localstorage, on affiche les routes vers la page admin, l'utilisateur et la deconnexion
                        <Nav>
                            <NavDropdown title={userInfo.firstName} id="navbarScrollingDropdown">
                                {userInfo.role === 'ADMIN' ? <NavDropdown.Item id='NavBarItems' href={ADMIN_ROUTE}>Admin</NavDropdown.Item> : ''}       {/* Si l'utilisateur est admin, on rajoute ADMIN_ROUTE, si non rien */}
                                <NavDropdown.Item id='NavBarItems' href={USER_ROUTE + '/' + userInfo.id}>Mon profil</NavDropdown.Item>
                                <NavDropdown.Item
                                    id='NavBarItems'
                                    href={LOGIN_ROUTE}
                                    onClick={() => logOut()}
                                >
                                    Se decoonecter
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        :

                        <Nav>
                            <Nav.Link href={LOGIN_ROUTE}>Se connecter</Nav.Link>        {/* Et s'il n'y a pas de token, on affiche la route vers la page de la connexion */}
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;