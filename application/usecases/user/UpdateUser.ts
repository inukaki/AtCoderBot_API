import { User } from "../../../domain/models/User.ts"
import { IUserRepository } from "../../repositories/IUserRepository.ts"

export class UpdateUser {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    execute(discordID: string, atcoderID: string, rating: number, solved: string[]) {
        return this.userRepository.merge(new User(discordID, atcoderID, rating, solved))
    } 
}