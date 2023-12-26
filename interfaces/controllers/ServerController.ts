
import { ServerConverter } from "../../application/converter/ServerConverter.ts";
import { ServerSerializer } from "../serializers/ServerSerializer.ts";

export class ServerController {
    private serverSerializer: ServerSerializer
    private serverConverter: ServerConverter

    constructor(serverConverter: ServerConverter, serverSerializer: ServerSerializer) {
        this.serverSerializer = serverSerializer
        this.serverConverter = serverConverter
    }

    async getServer(req: any, res: any) {
        const {serverID} = req.body
        let result = await this.serverConverter.getServer(serverID)
        return this.serverSerializer.serialize(result)
    }
}