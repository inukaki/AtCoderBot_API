import { IServerRepository } from "../../repositories/IServerRepository.ts"

export class UpdateDailyID {
    private serverRepository: IServerRepository

    constructor(serverRepository: IServerRepository) {
        this.serverRepository = serverRepository
    }

    execute(serverID: string, dailyID: string) {
        return this.serverRepository.updateDailyID(serverID, dailyID)
    }
}