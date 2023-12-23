import { User } from "../../../domain/models/User.ts"
import { IUserRepository } from "../../repositories/IUserRepository.ts"

export class CreateUser {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    execute(discordID: number, atcoderID: string) {
        let user = new User(discordID, atcoderID)
        return this.userRepository.persist(user)
    } 
}