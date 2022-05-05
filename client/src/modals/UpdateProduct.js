import React, { useState, useEffect, useContext } from 'react';
import { Modal, Form, Dropdown, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchTypes } from '../http/typeAPI';
import { updateProduct } from '../http/productAPI';
import { useParams } from 'react-router-dom';
import { fetchOneProduct } from '../http/productAPI';


const UpdateProduct = observer(({ show, onHide }) => {
    const { products } = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const { id } = useParams();
    const [product, setProduct] = useState({ info: [] })


    let typeId = products.selectedType.id;      // On recupere l'id de la categorie selectionnee

    // On recupere les types (categories)
    useEffect(() => {
        fetchTypes().then(data => products.setTypes(data));
    }, []);



    // On recupere un produit via son id
    useEffect(() => {
        fetchOneProduct(id)
            .then(data => setProduct(data));
    }, [id]);














    // Fonction pour mettre a jour le produit
    const changeProduct = async () => {




        let datas = {
            name,
            price,
            typeId
        };
        updateProduct(id, datas)
            .then(data => products.setProducts(data));
        //window.location.reload();
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
                    Modifier le produit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{products.selectedType.name || "Choisissez la categorie"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {products.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => products.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={product.name + ' ' + ' ' + ' ' + 'ici on change le nom du produit'}
                    />
                    <Form.Control
                        className='mt-3'
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder={product.price}
                        type='number'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={changeProduct}>Modifier</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateProduct;