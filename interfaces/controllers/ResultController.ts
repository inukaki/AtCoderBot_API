import { ResultConverter } from "../../application/converter/ResultConverter.ts"
import { ContestResultSerializer } from "../serializers/ContestResultSerializer.ts"
import { ResultSerializer } from "../serializers/ResultSerializer.ts"

export class ResultController {
    private resultConverter: ResultConverter
    private resultSerializer: ResultSerializer
    private contestResultSerializer: ContestResultSerializer

    constructor(resultConverter: ResultConverter, resultSerializer: ResultSerializer, contestResultSerializer: ContestResultSerializer) {
        this.resultConverter = resultConverter
        this.resultSerializer = resultSerializer
        this.contestResultSerializer = contestResultSerializer
    }

    async getUserResultByTime(req: any, res: any) {
        const {atcoderID} = req.params
        const {from,to} = req.query

        let result = await this.resultConverter.getUserResultByTime(atcoderID, from, to)
        let serialized = this.resultSerializer.serialize(result)

        return {
            from: Number(from),
            to: Number(to),
            result: serialized
        }
    }

    async getUserResultByTimeAndServer(req: any, res: any) {
        const { serverID } = req.params;
        const {from,to} = req.query

        let result = await this.resultConverter.getUserResultByTimeAndServer(serverID, from, to)
        let serialized = this.resultSerializer.serialize(result)

        return {serverID: serverID,
                from: Number(from),
                to: Number(to),
                results: serialized}
    }

    async getUserResultByContest(req: any, res: any) {
        const { contestID } = req.params;
        const {atcoderID} = req.query

        let result = await this.resultConverter.getUserContestResult(contestID,atcoderID)

        return this.contestResultSerializer.serialize(result)
    }
}