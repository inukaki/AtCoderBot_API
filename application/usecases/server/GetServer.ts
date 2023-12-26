import { IServerRepository } from "../../repositories/IServerRepository.ts"

export class GetServer {
    private serverRepository: IServerRepository

    constructor(serverRepository: IServerRepository) {
        this.serverRepository = serverRepository
    }

    execute(serverID: number) {
        return this.serverRepository.findByID(serverID)
    }
}