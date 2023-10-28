import { bcrypt_password } from '../../env.js'
import { UsersSchema } from '../Schemas/userSchema.js'
import connection from '../connection.js'
import bcrypt from 'bcrypt'

const usersModel = connection.model('Users', UsersSchema)

export default class UsersMethods {
    addUser = async (name, age, email, username, password) => {
        if (!await this.#findUser('email', email) && !await this.#findUser('', username)) {
            try {
                password = await bcrypt.hash(password + process.env.bcrypt_password, parseInt(process.env.salt_rounds))
                const user = new usersModel({
                    name, age, email, username, password
                })
                await user.save()
                return user
            } catch (err) {
                console.log(err)
                return err
            }
        } else if (await this.#findUser('email', email)) {
            return 'user exists'
        }
        else if (await this.#findUser('', username)) {
            return 'username exists'
        }

    }
    #findUser = async (argName, arg) => {
        if (argName === 'email') {
            const email = arg
            return usersModel.findOne({ email }).exec()
        } else {
            const username = arg
            return usersModel.findOne({ username }).exec()
        }
    }
    login = async (email, password) => {
        const user = await this.#findUser('email', email)
        console.log(user)
        console.log(user? bcrypt.compareSync(password + bcrypt_password, user.password): null)
        if (user && bcrypt.compareSync(password + bcrypt_password, user.password)) {
            return 'login'
        } else {
            return 'wrong entry'
        }
    }
}