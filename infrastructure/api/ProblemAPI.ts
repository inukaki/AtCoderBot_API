import axios from 'axios'

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * 問題一覧をjsonで取得
 */
export async function getProblems() {
    return new Promise<any[]>(async (resolve,reject) => {
        await axios.get('https://kenkoooo.com/atcoder/resources/merged-problems.json').then(async (res1: { data: any }) => {
            const problems = res1.data

            await sleep(5000)

            await axios.get('https://kenkoooo.com/atcoder/resources/problem-models.json').then((res2: { data: any }) => {
                const difficulties = res2.data

                for(let i = 0; i < problems.length; i++) {
                    const problemID = problems[i].id
                    let diff: number = (problemID in difficulties) ? difficulties[problemID].difficulty : undefined

                    if(diff) diff = Math.round(diff >= 400 ? diff : 400 / Math.exp(1.0 - diff / 400));

                    problems[i].difficulty = diff
                }
                resolve(problems)
            })
        })
    })
}

