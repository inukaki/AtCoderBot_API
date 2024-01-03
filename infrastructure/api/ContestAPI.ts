import axios from 'axios'

export async function getContests() {
    return new Promise<any[]>(async (resolve,reject) => {
        await axios.get('https://kenkoooo.com/atcoder/resources/contests.json').then(async (res: { data: any }) => {
            const contests = res.data
            resolve(contests)
        })
    })
}