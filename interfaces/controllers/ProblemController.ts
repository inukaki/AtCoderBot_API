import { CreateMultiProblem } from "../../application/usecases/problem/CreateMultiProblem.ts"
import { IDBConnection } from "../database/IDBConnection.ts"
import { ProblemRepository } from "../database/ProblemRepository.ts"
import { ProblemSerializer } from "../serializers/ProblemSerializer.ts"

export class ProblemController {
    private problemSerializer: ProblemSerializer
    private problemRepository: ProblemRepository

    constructor(dbConnection: IDBConnection) {
        this.problemSerializer = new ProblemSerializer()
        this.problemRepository = new ProblemRepository(dbConnection)
    }

    async createMultiProblem(req: any, res: any) {
        const useCase = new CreateMultiProblem(this.problemRepository)
        const list: any[] = []
        
        for(const problem of req.body) {
            const {id, contest_id, problem_index, name, title, difficulty} = problem
            list.push(id, contest_id, problem_index, name, title, difficulty)
        }

        let result = await useCase.execute(list)
        
        return this.problemSerializer.serialize(result)
    }
}