import { ResultConverter } from "../../application/converter/ResultConverter.ts"
import { ResultSerializer } from "../serializers/ResultSerializer.ts"

export class ResultController {
    private resultConverter: ResultConverter
    private resultSerializer: ResultSerializer

    constructor(resultConverter: ResultConverter, resultSerializer: ResultSerializer) {
        this.resultConverter = resultConverter
        this.resultSerializer = resultSerializer
    }

    async getUserResultByTime(req: any, res: any) {
        const {atcoderID, from} = req.body

        let result = await this.resultConverter.getUserResultByTime(atcoderID, from)
        let serialized = this.resultSerializer.serialize(result)

        return {
            from: from,
            result: serialized
        }
    }

    async getUserResultByTimeAndServer(req: any, res: any) {
        const { serverID, from } = req.body;

        let result = await this.resultConverter.getUserResultByTimeAndServer(serverID, from)
        let serialized = this.resultSerializer.serialize(result)

        return {serverID: serverID,
                from: from,
                result: serialized}
    }
}