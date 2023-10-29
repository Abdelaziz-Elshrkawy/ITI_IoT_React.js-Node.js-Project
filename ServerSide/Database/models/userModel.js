import { bcrypt_password } from '../../env.js';
import { UsersSchema } from '../Schemas/userSchema.js';
import connection from '../connection.js';
import bcrypt from 'bcrypt';

export default class UsersMethods {
    #usersModel = connection.model('Users', UsersSchema);

    #findUser = async (argName, arg) => {
        if (argName === 'email') {
            const email = arg;
            return this.#usersModel.findOne({ email }).exec();
        } else {
            const username = arg;
            return this.#usersModel.findOne({ username }).exec();
        }
    };

    addUser = async (name, age, email, username, password) => {
        if (
            !(await this.#findUser('email', email)) &&
            !(await this.#findUser('', username))
        ) {
            try {
                password = await bcrypt.hash(
                    password + bcrypt_password,
                    parseInt(process.env.salt_rounds),
                );
                const user = new this.#usersModel({
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
        } else if (await this.#findUser('email', email)) {
            return 'user exists';
        } else if (await this.#findUser('', username)) {
            return 'username exists';
        }
    };

    login = async (email, password) => {
        const user = await this.#findUser('email', email);
        console.log(user);
        if (user) {
            const { _id, name, username, email, age } = user;
            const checker = bcrypt.compareSync(
                password + bcrypt_password,
                user.password,
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
