import { Server } from "../../domain/models/Server.ts";

export abstract class IServerRepository {
    abstract findAll(): Promise<Array<Server>>
    abstract findByID(serverID: number): Promise<Server>
    abstract persist(server: Server): Promise<Server>
    abstract delete(server: Server): Promise<Server>
}