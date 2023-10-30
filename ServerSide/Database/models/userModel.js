import { bcrypt_password } from '../../env.js';
import { UsersSchema } from '../Schemas/userSchema.js';
import connection from '../connection.js';
import bcrypt from 'bcrypt';

export default class UsersMethods {
    #usersModel
    constructor(modelName) {
        this.#usersModel = connection.model(modelName, UsersSchema);
    }
    findUser = async (email, populate) => {
        if (populate) {
            return this.#usersModel.findOne({ email });
        } else {
            return this.#usersModel.findOne({ email });
        }
    };

    addUser = async (name, age, email, username, password) => {
        try {
            password = await bcrypt.hash(
                password + bcrypt_password,
                parseInt(process.env.salt_rounds),
            );
            const user = await this.#usersModel({
                name,
                age,
                email,
                username,
                password,
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
        if (user) {
            const { _id, name, username, email, age, password } = user;
            const checker = bcrypt.compareSync(
                InputPassword + bcrypt_password,
                password,
            );
            return {
                logged: checker,
                user: checker ? { _id, name, username, email, age } : null,
            };
        } else {
            return 'not found';
        }
    };
}
