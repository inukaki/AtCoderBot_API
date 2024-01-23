import { Submission } from "../../domain/models/Submission.ts";
import axios from 'axios'
import { server } from "../server.ts";

async function getSubmissions(from: number)  {
    return new Promise<void>((resolve,reject) => {
        let last = from
        let finished = false

        let sum = 0
        
        console.log("---------------------")
        console.debug("start: " + from)
        console.log()
        
        const id = setInterval(async () => {
            await axios.get('https://kenkoooo.com/atcoder/atcoder-api/v3/from/' + last).then(async (res: { data: any; }) => {
            const data = res.data

            data.sort()

            const length = Object.keys(data).length

            if(length < 1000) finished = true

            const submissions: any[] = []

            for(let i = 0; i < length; i++) {
                let submission = data[i]

                if(submission.epoch_second >= ((Date.now() / 1000) - 60*15)) break

                if(!submission.result.includes("/")) {
                    submissions.push([submission.id, submission.epoch_second, submission.problem_id, submission.contest_id, submission.user_id, submission.language, submission.point, submission.length, submission.result, submission.execution_time])
                    sum++
                    last = submission.epoch_second
                    continue
                }

                finished = true
                console.log("found WJ: " + submission.epoch_second)
                break
            }
            
            await server.instance.submissionConverter.createMultiSubmission(submissions)
    
            console.log(`${submissions.length} submissions inserted`)
            console.log(`last time: ${last}`)
            console.log()
    
            }).catch((err: any) => {
                console.log(err)
                finished = true;
            })
    
            if(finished) {
                clearInterval(id)
                resolve()
                console.log("finished")
                console.log(`sum: ${sum}`)
                console.log("---------------------")
                console.log()
            }
    
        }, 8000)
    })
}

export {
    getSubmissions,
}
