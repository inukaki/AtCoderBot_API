import { UserSerializer } from '../serializers/UserSerializer.ts'
import { UserRepository } from '../database/UserRepository.ts'
import { IDBConnection } from '../database/IDBConnection.ts'
import { CreateUser } from '../../application/usecases/user/CreateUser.ts'

export class UserController {
    private userSerializer: UserSerializer
    private userRepository: UserRepository

    constructor(dbConnection: IDBConnection) {
        this.userSerializer = new UserSerializer()
        this.userRepository = new UserRepository(dbConnection)
    }

    async createUser(req: any, res: any) {
        const {discordID, atcoderID} = req.body
        const useCase = new CreateUser(this.userRepository)
        let result = await useCase.execute(discordID, atcoderID)
        return this.userSerializer.serialize(result)
    }
}