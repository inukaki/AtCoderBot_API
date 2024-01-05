import { IServerRepository } from "../repositories/IServerRepository.ts";
import { AddMember } from "../usecases/server/AddMember.ts";
import { CreateServer } from "../usecases/server/CreateServer.ts";
import { DeleteMember } from "../usecases/server/DeleteMember.ts";
import { GetServer } from "../usecases/server/GetServer.ts";
import { UpdateDailyID } from "../usecases/server/UpdateDailyID.ts";

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

    async addMember(serverID: string, discordID: string) {
        let useCase = new AddMember(this.serverRepository)
        let result = await useCase.execute(serverID, discordID)
        return result
    }

    async deleteMember(serverID: string, discordID: string) {
        let useCase = new DeleteMember(this.serverRepository)
        let result = await useCase.execute(serverID, discordID)
        return result
    }

    async updateDailyID(serverID: string, dailyID: string) {
        let useCase = new UpdateDailyID(this.serverRepository)
        let result = await useCase.execute(serverID,dailyID)
        return result
    }
}