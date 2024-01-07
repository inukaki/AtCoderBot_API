import { Server } from "../../domain/models/Server.ts";

export abstract class IServerRepository {
    abstract findAll(): Promise<Array<Server>>
    abstract findByID(serverID: string): Promise<Server>
    abstract persist(server: Server): Promise<Server>
    abstract delete(server: Server): Promise<Server>
    abstract addMember(serverID: string, discordID: string): Promise<void>
    abstract deleteMember(serverID: string, discordID: string): Promise<void>
    abstract updateDailyID(serverID: string, dailyID: string): Promise<void>
}