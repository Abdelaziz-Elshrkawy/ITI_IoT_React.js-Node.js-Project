import { bcrypt_password } from '../../env.js';
import { UsersSchema } from '../Schemas/userSchema.js';
import connection from '../connection.js';
import bcrypt from 'bcrypt';

export default class UsersMethods {
    #usersModel;
    constructor(modelName) {
        this.#usersModel = connection.model(modelName, UsersSchema);
    }
    findUser = async (email) => {
        return this.#usersModel.findOne({ email });
    };

    addUser = async (name, email, password, imageId) => {
        try {
            password = await bcrypt.hash(
                password + bcrypt_password,
                parseInt(process.env.salt_rounds),
            );
            const user = await this.#usersModel({
                name,
                email,
                password,
                imageId,
            });
            await user.save();
            return user;
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    login = async (email, InputPassword) => {
        console.log(`email:${email} password: ${InputPassword}`);
        const user = await this.findUser(email);
        console.log('czz '+user);
        if (user?._id) {
            const { _id, name, email, password, imageId } = user;
            const checker = bcrypt.compareSync(
                InputPassword + bcrypt_password,
                password,
            );
            return {
                logged: checker,
                user: checker ? { _id, name, email, imageId } : null,
            };
        } else {
            return 'not found';
        }
    };

    updateUser = async (userId, name, password) => {
        try {
            const user = await this.#usersModel.findOne({ _id: userId });
            user.password = await bcrypt.hash(
                password + bcrypt_password,
                parseInt(process.env.salt_rounds),
            );
            user.name = name;
            await user.save();
            return user;
        } catch (err) {
            return err;
        }
    };
}
