import { UserSerializer } from '../serializers/UserSerializer.ts'
import { UserConverter } from '../../application/converter/UserConverter.ts'

export class UserController {
    private userSerializer: UserSerializer
    private userConverter: UserConverter

    constructor(userConverter: UserConverter, userSerializer: UserSerializer) {
        this.userSerializer = userSerializer
        this.userConverter = userConverter
    }

    async createUser(req: any, res: any) {
        const {discordID, atcoderID} = req.body
        let result = await this.userConverter.createUser(discordID, atcoderID)
        return this.userSerializer.serialize(result)
    }
}