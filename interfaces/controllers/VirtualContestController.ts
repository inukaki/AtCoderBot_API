import { VirtualContestConverter } from "../../application/converter/VirtualContestConverter.ts"
import { getColor, getRating, isColor } from "../../domain/models/Difficulty.ts"
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
        let result = await this.virtualContestConverter.createVirtualContest(startAt,durationSecond,title,visible,serverID,members, await this.convertProblems(problems))

        return this.virtualContestSerializer.serialize(result)
    }

    async updateVirtualContest(req: any, res: any) {
        let {startAt, durationSecond, title, visible, serverID, members, problems} = req.body
        const {virtualContestID} = req.params

        let vc = await this.virtualContestConverter.getVirtualContest(virtualContestID);

        if(!startAt) startAt = vc.startAt;
        if(!durationSecond) durationSecond = vc.durationSecond;
        if(!title) title = vc.title;
        if(!visible) visible = vc.visible;
        if(!serverID) serverID = vc.serverID;
        if(!members) members = vc.members;
        if(!problems) problems = vc.problems; else problems = await this.convertProblems(problems);

        let result = await this.virtualContestConverter.updateVirtualContest(virtualContestID,startAt,durationSecond,title,visible,serverID,members,problems)

        return this.virtualContestSerializer.serialize(result)
    }

    private async convertProblems(problems: string[]) {
        return await Promise.all(problems.map((color: string) => {
            if(!isColor(color)) return color

            let rating = getRating(color)
            return server.instance.problemConverter.getRandomProblem(rating[0],rating[1],1).then((x)=>{return x[0].problemID})
        }))
    }

    async listVirtualContests(req: any, res: any) {
        const {serverID, from, to} = req.query
        let result = await this.virtualContestConverter.listVirtualContests(serverID,from,to)

        return this.virtualContestSerializer.serialize(result)
    }

    async getVirtualContestStandings(req: any, res: any) {
        const {virtualContestID} = req.params
        let result = await server.instance.standingConverter.getVirtualContestStandings(virtualContestID).then(
            server.instance.standingSerializer.serialize
        ).catch(
            () => {
                res.status(404)
                return
            }
        )

        return result
    }

    async getVirtualContest(req: any, res: any) {
        const {virtualContestID} = req.params
        let result = await this.virtualContestConverter.getVirtualContest(virtualContestID).then(
            (virtualContest) => {
                return this.virtualContestSerializer.serialize(virtualContest)
            }
        ).catch(
            () => {
                res.status(404)
                return
            }
        )

        return result
    }
}