import { User } from "../../../domain/models/User.ts"
import { IUserRepository } from "../../repositories/IUserRepository.ts"

export class GetUser {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    execute(discordID: string) {
        return this.userRepository.findByDiscord(discordID)
    } 
}