import React, { useState, useEffect } from 'react';
import { Container, Image, Button, Card, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneProduct } from '../http/productAPI';
import UpdateProduct from '../modals/UpdateProduct';
import { check } from '../http/userAPI';
import DeleteProduct from '../modals/DeleteProduct';


const ProductPage = () => {
    const { id } = useParams();
    const [role, setRole] = useState('');
    const [product, setProduct] = useState({ info: [] })
    const [updateProductVisible, setUpdateProductVisible] = useState(false);        // Hook pour afficher ou fermer la function de mise a jour du produit
    const [deleteProductVisible, setDeleteProductVisible] = useState(false);

    // Recupere le role depuis token et stock dans le hook role
    useEffect(() => {
        check()
            .then(data => setRole(data));
    }, []);


    // On recupere un produit via son id
    useEffect(() => {
        fetchOneProduct(id)
            .then(data => setProduct(data));
    }, []);

    // On structure la page d'un produit
    return (
        <Container className='productPageContainer'>
            <div className='d-flex'>

                <div className="p-2"><Image src={process.env.REACT_APP_API_URL + product.img} style={{ cursor: 'pointer' }} width={500} /></div>
                <Col /* className='d-flex justify-content-center' */>
                    {role.role === 'ADMIN' ?
                        <div className="ml-auto p-2">
                            <h2>{product.name}</h2>
                            <p className='price'>{product.price}€</p>
                            <Button
                                className='m-2'
                                variant='btn btn-warning'
                                onClick={() => setUpdateProductVisible(true)}
                            >
                                Modifier produit
                            </Button>
                            <UpdateProduct show={updateProductVisible} onHide={() => setUpdateProductVisible(false)} />

                            <Button
                                className='m-2'
                                variant='btn btn-danger'
                                onClick={() => setDeleteProductVisible(true)}
                            >
                                Supprimer produit
                            </Button>
                            <DeleteProduct show={deleteProductVisible} onHide={() => setDeleteProductVisible(false)} />
                        </div>

                        :

                        <div className="ml-auto p-2">
                            <h2>{product.name}</h2>
                            <p className='price'>{product.price}€</p>
                        </div>
                    }
                    <div>
                        <p>Ce produit vous interesse?</p>
                        <p>Appellez au +337 01 01 01 09</p>
                    </div>
                </Col>
            </div>

            <Card className='mt-5 mb-5'>
                <div className='d-flex flex-column p-2'>
                    <h2>Description:</h2>
                    {product.info.map(info =>
                        <div key={info.id}>
                            {info.title}: {info.description}
                        </div>
                    )}
                </div>
            </Card>
        </Container>
    );
};

export default ProductPage;