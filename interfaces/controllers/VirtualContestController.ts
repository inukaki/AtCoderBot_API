import { VirtualContestConverter } from "../../application/converter/VirtualContestConverter.ts"
import { getColor, getRating } from "../../domain/models/Difficulty.ts"
import { server } from "../../infrastructure/server.ts"
import { VirtualContestSerializer } from "../serializers/VirtualContestSerializer.ts"

export class VirtualContestController {
    private virtualContestSerializer: VirtualContestSerializer
    private virtualContestConverter: VirtualContestConverter

    constructor(virtualContestConverter: VirtualContestConverter, virtualContestSerializer: VirtualContestSerializer) {
        this.virtualContestConverter = virtualContestConverter
        this.virtualContestSerializer = virtualContestSerializer
    }

    async createVirtualContest(req: any, res: any) {
        const {startAt, durationSecond, title, visible, serverID, members, problems} = req.body
        let result = await this.virtualContestConverter.createVirtualContest(startAt,durationSecond,title,visible,serverID,members, await Promise.all(problems.map((color: string) => {
            let rating = getRating(color)
            return server.instance.problemConverter.getRandomProblem(rating[0],rating[1],1).then((x)=>{return x[0].problemID})
        })))

        return this.virtualContestSerializer.serialize(result)
    }

    async listVirtualContests(req: any, res: any) {
        const {serverID, from, to} = req.query
        let result = await this.virtualContestConverter.listVirtualContests(serverID,from,to)

        return this.virtualContestSerializer.serialize(result)
    }

    async getVirtualContestStandings(req: any, res: any) {
        const {virtualContestID} = req.params
        let result = await server.instance.standingConverter.getVirtualContestStandings(virtualContestID)

        return server.instance.standingSerializer.serialize(result)
    }

    async getVirtualContest(req: any, res: any) {
        const {virtualContestID} = req.params
        let result = await this.virtualContestConverter.getVirtualContest(virtualContestID)

        return this.virtualContestSerializer.serialize(result)
    }
}