import { IServerRepository } from "../../repositories/IServerRepository.ts"

export class GetServer {
    private serverRepository: IServerRepository

    constructor(serverRepository: IServerRepository) {
        this.serverRepository = serverRepository
    }

    execute(serverID: string) {
        return this.serverRepository.findByID(serverID)
    }
}