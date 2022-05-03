import React, { useContext } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { TYPE_ROUTE } from '../utils/consts';

const TypeList = observer(() => {
    const { products } = useContext(Context);     // On recupere les types (categories)

    // On structure la liste des types (categories)
    return (
        <ListGroup>
            {products.types.map(type =>
                <ListGroupItem
                    href={TYPE_ROUTE + '/' + type.id}
                    style={{ cursor: 'pointer' }}
                    active={type.id === products.selectedType.id}
                    onClick={() => products.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroupItem>
            )}
        </ListGroup>
    );
});

export default TypeList;