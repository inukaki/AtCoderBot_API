import { User } from "../../../domain/models/User.ts"
import { IUserRepository } from "../../repositories/IUserRepository.ts"

export class CreateUser {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    execute(discordID: string, atcoderID: string) {
        let user = new User(discordID, atcoderID, 0, [])
        return this.userRepository.persist(user)
    } 
}