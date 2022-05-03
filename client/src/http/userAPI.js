import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (
    email,
    password,
    firstName,
    lastName,
    adress,
    zip,
    city,
    country,
    phone
) => {
    const { data } = await $host.post('api/user/registration', {
        email,
        password,
        role: "USER",
        firstName,
        lastName,
        adress,
        zip,
        city,
        country,
        phone
    });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const check = async () => {
    if (localStorage.getItem('token')) {
        const { data } = await $authHost.get('api/user/auth');
        localStorage.getItem('token', data.token);
        return jwt_decode(data.token);
    }

};




export const fetchUsers = async () => {
    const { data } = await $authHost.get('api/user');
    return data;
};

export const fetchOneUser = async (id) => {
    const { data } = await $authHost.get('api/user/' + id)
    return data;
};

export const updateUser = async (
    id,
    firstName,
    lastName,
    adress,
    zip,
    city,
    country,
    phone
) => {
    const { data } = await $authHost.put('api/user/' +
        id,
        firstName,
        lastName,
        adress,
        zip,
        city,
        country,
        phone
    );
    return data;
};

export const updateUserPassword = async (id, password) => {
    const { data } = await $authHost.put('api/user/' + id, password);
    return data;
};

export const updateUserRole = async (id, role) => {
    const { data } = await $authHost.put('api/user/' + id, role);
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await $authHost.delete('api/user/' + id);
    return data;
}