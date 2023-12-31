
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
        const serverID = req.params.serverID
        let result = await this.serverConverter.getServer(serverID)
        return this.serverSerializer.serialize(result)
    }

    async createServer(req: any, res: any) {
        const {serverID} = req.body
        let result = await this.serverConverter.createServer(serverID)
        return this.serverSerializer.serialize(result)
    }

    async addMember(req: any, res: any) {
        const {serverID} = req.params
        const {discordID} = req.body
        let result = await this.serverConverter.addMember(serverID, discordID)
    }

    async deleteMember(req: any, res: any) {
        const {serverID} = req.params
        const {discordID} = req.query
        
        let result = await this.serverConverter.deleteMember(serverID, discordID)
    }

    async updateDailyID(req: any, res: any) {
        const {serverID} = req.params
        const {dailyID} = req.body

        let result = await this.serverConverter.updateDailyID(serverID,dailyID)
        
    }
}