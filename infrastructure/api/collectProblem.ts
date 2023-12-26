import { getProblems } from './ProblemAPI.ts';
import { server } from '../server.ts';

async function collectProblem(delay: number) {
    const insertProblems = async () => {
        const problems = await getProblems()

        const list: any[] = []

        for(let i = 0; i < problems.length; i++) {
            list.push([problems[i].id, problems[i].contest_id, problems[i].problem_index, problems[i].name, problems[i].title, problems[i].difficulty])
        }

        server.instance.problemConverter.createMultiProblem(list)
        console.log(`${problems.length} problems loaded`)
    }

    insertProblems()

    const id = setInterval(() => {
        insertProblems()
    }, delay) 
}

export default collectProblem