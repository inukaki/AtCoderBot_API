import { getSubmissions } from './SubmissionAPI.ts';
import { server } from '../server.ts';

async function collectSubmission(from: number, delay: number) {
    let last = from;
    let lastFinished = true

    let latest = (await server.instance.submissionConverter.getLatestSubmission()).epochSecond
    if(latest) {
        last = Math.max(last, latest)
    }

    const insertSubmissions = async () => {
        if(!lastFinished) return
        lastFinished = false

        const submissions = await getSubmissions(last);

        if(submissions.length == 0) {
            lastFinished = true
            return
        }

        last = submissions[submissions.length - 1].epoch_second

        while(submissions.length != 0){
            const list: any[] = []

            for(let i = 0; i < 1000; i++) {
                if(submissions.length == 0) break
                let submission = submissions.pop()
                list.push([submission.id, submission.epoch_second, submission.problem_id, submission.contest_id, submission.user_id, submission.language, submission.point, submission.length, submission.result, submission.execution_time])
            }

            await server.instance.submissionConverter.createMultiSubmission(list)
        }

        lastFinished = true
    } 

    insertSubmissions()

    const id = setInterval(insertSubmissions, delay)
}

export default collectSubmission
