import { IUserRepository } from "../repositories/IUserRepository.ts"
import { CreateUser } from "../usecases/user/CreateUser.ts"

export class UserConverter {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async createUser(discordID: number, atcoderID: string) {
        let useCase = new CreateUser(this.userRepository)
        let result = await useCase.execute(discordID, atcoderID)
        return result
    }
}