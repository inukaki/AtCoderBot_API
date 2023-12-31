import { IServerRepository } from "../repositories/IServerRepository.ts";
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
}