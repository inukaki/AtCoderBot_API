import { IUserRepository } from "../../repositories/IUserRepository.ts"

export class ListUsers {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    execute() {
        return this.userRepository.findAll()
    } 
}