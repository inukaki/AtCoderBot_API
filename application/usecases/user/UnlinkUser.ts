import { IUserRepository } from "../../repositories/IUserRepository.ts"

export class UnlinkUser {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    execute(discordID: string) {
        return this.userRepository.unlink(discordID)
    } 
}