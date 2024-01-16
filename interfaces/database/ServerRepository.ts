import { IServerRepository } from "../../application/repositories/IServerRepository.ts";
import { IDBConnection } from "./IDBConnection.ts";
import { Server } from "../../domain/models/Server.ts";

export class ServerRepository extends IServerRepository {
    private connection: any

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    async findAll(): Promise<Server[]> {
        throw new Error("Method not implemented.");
    }

    async findByID(serverID: string): Promise<Server> {
        let result = await this.connection.execute(
            `select * from servers where server_id = ?`,
            [
                serverID
            ]
        )
        
        return new Server(serverID, JSON.parse(result[0].members), result[0].daily_id)
    }

    async persist(server: Server): Promise<Server> {
        await this.connection.execute(
            `insert ignore into servers (server_id, members, daily_id) values (?, ?, ?)`,
            [
                server.serverID,
                JSON.stringify(server.members),
                server.dailyID
            ]
        )
        
        return server
    }

    async delete(server: Server): Promise<Server> {
        throw new Error("Method not implemented.");
    }

    async addMember(serverID: string, discordID: string): Promise<void> {
        let result = await this.connection.execute(
            "update servers set members=JSON_ARRAY_APPEND(members, '$', ?) where server_id = ?",
            [
                JSON.stringify(discordID),
                serverID
            ]
        )
    }

    async deleteMember(serverID: string, discordID: string) {
        if(!discordID) return this.deleteAllMembers(serverID)

        let result = await this.connection.execute(
            "update servers set members=IFNULL(JSON_REMOVE(members,JSON_UNQUOTE(JSON_SEARCH(members,'one',?))),members) where server_id = ?",
            [
                discordID,
                serverID
            ]
        )
    }

    async deleteAllMembers(serverID: string) {
        let result = await this.connection.execute(
            "update servers set members='[]' where server_id = ?",
            [
                serverID
            ]
        )
    }

    async updateDailyID(serverID: string, dailyID: string) {
        let result = await this.connection.execute(
            "update servers set daily_id = ? where server_id = ?",
            [
                dailyID,
                serverID
            ]
        )
    }
}