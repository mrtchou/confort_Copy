import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { Context } from '..';

const AppRouter = () => {
    const { user } = useContext(Context);  // on recupere isAuth depuis user

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />          // Les routes pour les logger
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />          // Les routes pour les non logger
            )}
            <Route path="*" element={<Navigate to="/" />} />                      {/* Si aucune des routes ne marchent, redirection sur la page d'accueil */}
        </Routes>
    );
};

export default AppRouter;