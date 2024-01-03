import { IServerRepository } from "../repositories/IServerRepository.ts";
import { AddMember } from "../usecases/server/AddMember.ts";
import { CreateServer } from "../usecases/server/CreateServer.ts";
import { GetServer } from "../usecases/server/GetServer.ts";

export class ServerConverter {
    private serverRepository: IServerRepository

    constructor(serverRepository: IServerRepository) {
        this.serverRepository = serverRepository
    }

    async getServer(serverID: string) {
        let useCase = new GetServer(this.serverRepository)
        let result = await useCase.execute(serverID)
        return result
    }

    async createServer(serverID: string) {
        let useCase = new CreateServer(this.serverRepository)
        let result = await useCase.execute(serverID)
        return result
    }

    async addMember(serverID: string, atcoderID: string) {
        let useCase = new AddMember(this.serverRepository)
        let result = await useCase.execute(serverID, atcoderID)
        return result
    }
}