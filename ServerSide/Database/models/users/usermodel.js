import { UsersSchema } from './schema.js'
import connection from '../../connection.js'
import bcrypt from 'bcrypt'

const usersModel = connection.model('Users', UsersSchema)

export default class UsersMethods {
    addUser = async (name, age, email, username, password) => {
        console.log((await this.#findUser('email', email)).password)
        if (!await this.#findUser('email', email) && !await this.#findUser('', username)) {
            try {
                password = await bcrypt.hash(password, parseInt(process.env.salt_rounds))
                console.log(password)
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
            console.log('no add')
            return 'user exists'
        }
        else if (await this.#findUser('', username)) {
            return 'username exists'
        }

    }
    #findUser = (argName, arg) => {
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
    }
}