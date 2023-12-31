import { Color } from "../../domain/models/Difficulty.ts"
import { Server } from "../../domain/models/Server.ts"

const _serializeSingleServer = (server: Server) => {
    return {
        serverID: server.serverID,
        members: server.members,
        daily_id: server.dailyID
    }
}

export class ServerSerializer {
    serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleServer)
        }
        return _serializeSingleServer(data)
    }
}