import axios from 'axios'

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * 問題一覧をjsonで取得
 */
async function getProblems() {
    return new Promise<any[]>(async (resolve,reject) => {
        await axios.get('https://kenkoooo.com/atcoder/resources/problems.json').then(async (res1: { data: any }) => {
            const problems = res1.data

            await sleep(5000)

            await axios.get('https://kenkoooo.com/atcoder/resources/problem-models.json').then((res2: { data: any }) => {
                const difficulties = res2.data

                for(let i = 0; i < problems.length; i++) {
                    const problemID = problems[i].id
                    const difficulty = (problemID in difficulties) ? difficulties[problemID].difficulty : undefined

                    problems[i].difficulty = difficulty
                }
                resolve(problems)
            })
        })
    })
}

export {
    getProblems
}