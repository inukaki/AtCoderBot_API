import { getSubmissions } from './SubmissionAPI.ts';
import { server } from '../server.ts';

async function collect(from: number) {
    var last = from;
    var lastFinished = true

    const id = setInterval(async () => {
        if(!lastFinished) return
        lastFinished = false

        const submissions = await getSubmissions(last);

        if(submissions.length == 0) {
            lastFinished = true
            return
        }

        last = submissions[submissions.length - 1].epoch_second + 1

        server.instance.submissionController.createMultiSubmission({body: submissions},200)

        lastFinished = true
    }, 1000 * 60); //1時間 3600000
}

export default collect;
