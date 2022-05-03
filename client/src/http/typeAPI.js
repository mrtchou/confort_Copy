import { $authHost, $host } from ".";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
};

export const updateType = async (id, name) => {
    const { data } = await $authHost.put('api/type/' + id, name)
    return data
};

export const deleteType = async (id) => {
    const { data } = await $authHost.delete('api/type/' + id)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
};

export const fetchOneType = async (id) => {
    const { data } = await $host.get('api/type/' + id);
    return data;
};