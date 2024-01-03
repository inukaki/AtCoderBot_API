import { Server } from "../../../domain/models/Server.ts"
import { IServerRepository } from "../../repositories/IServerRepository.ts"

export class CreateServer {
    private serverRepository: IServerRepository

    constructor(serverRepository: IServerRepository) {
        this.serverRepository = serverRepository
    }

    execute(serverID: string) {
        return this.serverRepository.persist(new Server(serverID, [], "0"))
    }
}