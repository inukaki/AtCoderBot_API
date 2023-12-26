import { IServerRepository } from "../../application/repositories/IServerRepository.ts";
import { IDBConnection } from "./IDBConnection.ts";
import { Server } from "../../domain/models/Server.ts";
import { Color, valueOfColor } from "../../domain/models/Difficulty.ts";

export class ServerRepository extends IServerRepository {
    private connection: any

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    async findAll(): Promise<Server[]> {
        throw new Error("Method not implemented.");
    }

    async findByID(serverID: number): Promise<Server> {
        let result = await this.connection.execute(
            `select * from servers where server_id = ?`,
            [
                serverID
            ]
        )
        
        return new Server(serverID, JSON.parse(result[0].members), result[0].daily, JSON.parse(result[0].daily_id).map((x: string) => {return valueOfColor(x)}))
    }

    async persist(server: Server): Promise<Server> {
        throw new Error("Method not implemented.");
    }

    async delete(server: Server): Promise<Server> {
        throw new Error("Method not implemented.");
    }

}