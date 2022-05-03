const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class userController {
    async registration(req, res, next) {
        const {
            email,
            password,
            role,
            firstName,
            lastName,
            adress,
            zip,
            city,
            country,
            phone
        } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect Email or Password'));
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashPassword,
            role,
            firstName,
            lastName,
            adress,
            zip,
            city,
            country,
            phone
        });
        const basket = await Basket.create({ userId: user.id });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }


    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('User with this email not found'));
        };
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Incorrect password'));
        };
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    };

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    };

    async getUsers(req, res, next) {
        const users = await User.findAll();
        return res.json(users)
    };

    async getOneUser(req, res, next) {
        const { id } = req.params;
        const user = await User.findOne(
            {
                where: { id }
            },
        );
        return res.json(user);
    };






    async updateUser(req, res, next) {
        const { id } = req.params;

        const {
            email,
            role,
            firstName,
            lastName,
            adress,
            zip,
            city,
            country,
            phone
        } = req.body;
        const user = await User.update(
            {
                email,
                role,
                firstName,
                lastName,
                adress,
                zip,
                city,
                country,
                phone
            },
            {
                where: { id }
            },
        );
        return res.json(user);
    };







    async deleteUser(req, res, next) {
        const { id } = req.params;
        const user = await User.destroy(
            {
                where: { id }
            },
        );
        return res.json(user);
    };
};

module.exports = new userController();