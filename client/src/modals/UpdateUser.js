import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Button } from 'react-bootstrap';
import { updateUser } from '../http/userAPI';
import { useParams } from 'react-router-dom';
import { fetchOneUser } from '../http/userAPI';


const UpdateUser = observer(({ show, onHide }) => {
    const [user, setUser] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [adress, setAdress] = React.useState("");
    const [zip, setZip] = React.useState("");
    const [city, setCity] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const { id } = useParams();

    useEffect(() => {
        fetchOneUser(id).then(data => setUser(data));
    }, [id]);



    // Fonction de mise a jour des info de l'utilisateur
    const changeUserInfo = () => {
        let datas = {
            firstName,
            lastName,
            adress,
            zip,
            city,
            country,
            phone
        };

        updateUser(id, datas);
        onHide();
        window.location.reload();
    };


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
                    Modifier mes informations
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className='mt-3'
                        placeholder='Prenom'
                        value={firstName ?? ""}
                        onChange={firstName !== '' ? e => setFirstName(e.target.value) : setFirstName(user.firstName)}
                    />

                    <Form.Control
                        className='mt-3'
                        placeholder='Nom'
                        value={lastName ?? ""}
                        onChange={lastName !== '' ? e => setLastName(e.target.value) : setLastName(user.lastName)}
                    />

                    <Form.Control
                        className='mt-3'
                        placeholder='Adresse'
                        value={adress ?? ""}
                        onChange={adress !== '' ? e => setAdress(e.target.value) : setAdress(user.adress)}
                    />

                    <Form.Control
                        className='mt-3'
                        placeholder='Code postal'
                        value={zip ?? ""}
                        type='Number'
                        onChange={zip !== '' ? e => setZip(e.target.value) : setZip(user.zip)}
                    />

                    <Form.Control
                        className='mt-3'
                        placeholder='Ville'
                        value={city ?? ""}
                        onChange={city !== '' ? e => setCity(e.target.value) : setCity(user.city)}
                    />

                    <Form.Control
                        className='mt-3'
                        placeholder='Pays'
                        value={country ?? ""}
                        onChange={country !== '' ? e => setCountry(e.target.value) : setCountry(user.country)}
                    />

                    <Form.Control
                        className='mt-3'
                        placeholder='Telephone'
                        value={phone ?? ""}
                        type='Number'
                        onChange={phone !== '' ? e => setPhone(e.target.value) : setPhone(user.phone)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={changeUserInfo}>Modifier</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateUser;