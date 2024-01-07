import { IServerRepository } from "../../repositories/IServerRepository.ts"

export class DeleteMember {
    private serverRepository: IServerRepository

    constructor(serverRepository: IServerRepository) {
        this.serverRepository = serverRepository
    }

    execute(serverID: string, discordID: string) {
        return this.serverRepository.deleteMember(serverID, discordID)
    }
}