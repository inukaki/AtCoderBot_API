import { IUserRepository } from "../../repositories/IUserRepository.ts"

export class LinkUser {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    execute(discordID: string, atcoderID: string) {
        return this.userRepository.link(discordID, atcoderID)
    } 
}