import { Server } from "../../../domain/models/Server.ts"
import { IServerRepository } from "../../repositories/IServerRepository.ts"

export class AddMember {
    private serverRepository: IServerRepository

    constructor(serverRepository: IServerRepository) {
        this.serverRepository = serverRepository
    }

    execute(serverID: string, atcoderID: string) {
        return this.serverRepository.addMember(serverID, atcoderID)
    }
}