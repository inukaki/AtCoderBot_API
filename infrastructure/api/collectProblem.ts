import { getProblems } from './ProblemAPI.ts';
import { server } from '../server.ts';
import { getContests, getFutureContests } from './ContestAPI.ts';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function collectProblem(delay: number) {
    const insertProblems = async () => {
        await sleep(10000)
        let contests: any[] = await getContests()
        await sleep(10000)
        let problems: any[] = await getProblems()

        const future = await getFutureContests()

        contests = contests.concat(future.contests)
        problems = problems.concat(future.problems)

        const list: any[] = []

        const mp = new Map<string, string[]>()

        for(let i = 0; i < problems.length; i++) {
            list.push([problems[i].id, problems[i].contest_id, problems[i].problem_index, problems[i].name, problems[i].title, problems[i].point, problems[i].difficulty])
            mp.set(problems[i].contest_id, mp.get(problems[i].contest_id)?.concat(problems[i].id) ?? [problems[i].id])
        }

        await server.instance.problemConverter.createMultiProblem(list)
        console.log(`${problems.length} problems loaded`)

        list.splice(0)

        for(const contest of contests) {
            list.push([contest.id,contest.start_epoch_second,contest.duration_second,contest.title,mp.get(contest.id) ?? []])
        }

        await server.instance.contestConverter.createMultiContest(list)
        console.log(`${contests.length} contests loaded`)
    }

    insertProblems()

    const id = setInterval(async () => {
        await insertProblems()
    }, delay) 
}

export default collectProblem