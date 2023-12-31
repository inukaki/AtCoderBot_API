
import { IUserRepository } from "../repositories/IUserRepository.ts"
import { CreateUser } from "../usecases/user/CreateUser.ts"
import { GetUser } from "../usecases/user/GetUser.ts"
import { LinkUser } from "../usecases/user/LinkUser.ts"
import { ListUsers } from "../usecases/user/ListUsers.ts"
import { UnlinkUser } from "../usecases/user/UnlinkUser.ts"
import { UpdateUser } from "../usecases/user/UpdateUser.ts"

export class UserConverter {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async createUser(discordID: string, atcoderID: string) {
        let useCase = new CreateUser(this.userRepository)
        let result = await useCase.execute(discordID, atcoderID)
        return result
    }

    async listUsers() {
        let useCase = new ListUsers(this.userRepository)
        let result = await useCase.execute()
        return result
    }

    async getUser(discordID: string) {
        let useCase = new GetUser(this.userRepository)
        let result = await useCase.execute(discordID)
        return result
    }

    async linkUser(discordID: string, atcoderID: string) {
        let useCase = new LinkUser(this.userRepository)
        let result = await useCase.execute(discordID,atcoderID)
        return result
    }

    async unlinkUser(discordID: string) {
        let useCase = new UnlinkUser(this.userRepository)
        let result = await useCase.execute(discordID)
        return result
    }

    async updateUser(discordID: string, atcoderID: string, rating: number, solved: string[]) {
        let useCase = new UpdateUser(this.userRepository)
        let result = await useCase.execute(discordID, atcoderID, rating, solved)
        return result
    }
}