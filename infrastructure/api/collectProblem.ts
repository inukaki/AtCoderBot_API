import { getProblems } from './ProblemAPI.ts';
import { server } from '../server.ts';

async function collectProblem(delay: number) {
    const insertProblems = async () => {
        const problems = await getProblems()
        server.instance.problemController.createMultiProblem({body:problems}, 200)
        console.log(`${problems.length} problems inserted`)
    }

    insertProblems()

    const id = setInterval(() => {
        insertProblems()
    }, delay) //1日
}

export default collectProblem