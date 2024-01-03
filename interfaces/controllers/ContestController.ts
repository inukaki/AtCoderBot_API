import { ContestConverter } from "../../application/converter/ContestConverter.ts"
import { ContestSerializer } from "../serializers/ContestSerializer.ts"

export class ContestController {
    private contestSerializer: ContestSerializer
    private contestConverter: ContestConverter

    constructor(contestConverter: ContestConverter, contestSerializer: ContestSerializer) {
        this.contestConverter = contestConverter
        this.contestSerializer = contestSerializer
    }

    async getContestByTime(req: any, res: any) {
        const {from,to} = req.query
        const result = await this.contestConverter.getContestByTime(from,to)

        return this.contestSerializer.serialize(result)
    }
}