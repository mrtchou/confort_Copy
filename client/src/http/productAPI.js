import { $authHost, $host } from ".";


export const createProduct = async (product) => {
    const { data } = await $authHost.post('api/product', product);
    return data;
};

export const updateProduct = async (
    id,
    typeId,
    name,
    price,
    img,
    description
) => {
    const { data } = await $authHost.put('api/product/' +
        id,
        typeId,
        name,
        price,
        img,
        description
    );
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await $authHost.delete('api/product/' + id);
    return data;
}

export const fetchProducts = async () => {
    const { data } = await $host.get('api/product')
    return data;
};

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get('api/product/' + id);
    return data;
};

export const fetchProductsByType = async (typeId) => {
    const { data } = await $host.get('api/product/', { params: typeId })
    return data;
};
