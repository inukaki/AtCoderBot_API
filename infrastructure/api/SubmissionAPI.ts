import { Submission } from "../../domain/models/Submission.ts";
import axios from 'axios'

/**
* AtCoder ProblemsのSubmission APIから、from以降の提出一覧をjsonで取得 (WJがあった場合、そこまでの提出一覧)
* @param from この時刻以降のすべての提出を取得する
*/
async function getSubmissions(from: number)  {
    return new Promise<any[]>((resolve,reject) => {
        const submissions: any[] = []

        let last = from
        let finished = false
        
        console.log("---------------------")
        console.debug("start: " + from)
        console.log()
        
        const id = setInterval(async () => {
            await axios.get('https://kenkoooo.com/atcoder/atcoder-api/v3/from/' + last).then((res: { data: any; }) => {
            const data = res.data
    
            data.sort()

            const length = Object.keys(data).length

            last = data[length-1].epoch_second + 1

            if(length < 1000) finished = true

            var foundWJ = false

            for(const submission of data) {
                if(!submission.result.includes("WJ")) continue
                last = Math.min(last, submission.epoch_second)
                foundWJ = true
                finished = false;
                console.log("found WJ: " + submission.epoch_second)
            }
    
            console.log(`size: ${length}`)
            console.log(`last time: ${last}`)
            console.log()

            if(foundWJ) return
    
            submissions.push(...data)
    
            }).catch((err: any) => {
                finished = true;
            })
    
            if(finished) {
                clearInterval(id)
                resolve(submissions)
                console.log("finished")
                console.log(`sum: ${submissions.length}`)
                console.log("---------------------")
                console.log()
            }
    
        }, 8000)
    })
}

export {
    getSubmissions,
}
