import { User } from "../../../domain/models/User"
import { IUserRepository } from "../../repositories/IUserRepository"

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