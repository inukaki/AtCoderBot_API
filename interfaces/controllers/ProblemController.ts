import { ProblemConverter } from "../../application/converter/ProblemConverter.ts"
import { ProblemSerializer } from "../serializers/ProblemSerializer.ts"

export class ProblemController {
    private problemSerializer: ProblemSerializer
    private problemConverter: ProblemConverter

    constructor(problemConverter: ProblemConverter) {
        this.problemSerializer = new ProblemSerializer()
        this.problemConverter = problemConverter
    }

    async createMultiProblem(req: any, res: any) {
        const list: any[] = []
        
        for(const problem of req.body) {
            const {id, contest_id, problem_index, name, title, difficulty} = problem
            list.push(id, contest_id, problem_index, name, title, difficulty)
        }

        let result = await this.problemConverter.createMultiProblem(list)
        
        return this.problemSerializer.serialize(result)
    }
}