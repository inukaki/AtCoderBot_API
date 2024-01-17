import { getSubmissions } from './SubmissionAPI.ts';
import { server } from '../server.ts';

async function collectSubmission(from: number, delay: number) {
    let last = from;
    let lastFinished = true
    
    let latest = (await server.instance.submissionConverter.getLatestSubmission())

    if(latest) {
        last = Math.max(last, latest.epochSecond)
    }

    const insertSubmissions = async () => {
        if(!lastFinished) return
        lastFinished = false

        await getSubmissions(last)
        last = (await server.instance.submissionConverter.getLatestSubmission()).epochSecond

        lastFinished = true
    } 

    insertSubmissions()

    const id = setInterval(insertSubmissions, delay)
}

export default collectSubmission
