import axios from 'axios'
import * as playwright from 'playwright'

export async function getContests() {
    return new Promise<any[]>(async (resolve,reject) => {
        await axios.get('https://kenkoooo.com/atcoder/resources/contests.json').then(async (res: { data: any }) => {
            const contests = res.data
            resolve(contests)
        })
    })
}

export async function getFutureContests() {
    const browser = await playwright.chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://atcoder.jp/home?lang=ja")

    const contests = await page.locator(".panel-body.blog-post")
    const contestsCount = await contests.count()

    let result: any = {
        contests: [],
        problems: []
    }

    label: for(let i = 0; i < contestsCount; i++) {
        const contest = await contests.nth(i)
        const json: any = {}

        const li = await contest.locator("ul>li")
        const liCount = await li.count()

        const p = await contest.locator("p")
        const pCount = await p.count()

        for(let j = 0; j < liCount; j++) {
            const e = await li.nth(j)
            const text: string = await e.innerHTML()

            if(text.startsWith("開始時刻")){
                const time = await e.locator("a").locator("time").innerHTML()
                const iso = time.replace(/(\d{4}-\d{2}-\d{2})\(.{1}\) (\d{2}:\d{2})/, "$1T$2:00");
                const date = new Date(iso);

                const epoch = date.getTime() / 1000

                if(epoch < (Date.now() / 1000)){
                    continue label
                }

                json.start_epoch_second = epoch
            }else if(text.startsWith("コンテストページ")) {
                const url: string = await (await e.locator("a")).innerHTML()
                const match = url.match(/contests\/(.*)/)
                
                if(match) {
                    json.id = match[1]
                }
            }else if(text.startsWith("コンテスト時間")){
                const match = text.match(/コンテスト時間： (.+) 分/)

                if(match){
                    json.duration_second = (+match[1]) * 60
                }
            }else if(text.startsWith("配点")) {
                text.replace("配点： ", "").split("-").forEach((point,index) => {
                    const problemIndex = String.fromCharCode('a'.charCodeAt(0) + index)
                    const problemID = json.id + "_" + problemIndex

                    result.problems.push({
                        id: problemID,
                        contest_id: json.id,
                        problem_index: problemIndex.toUpperCase(),
                        point: +point
                    })
                })
            }
        }

        if(!json.id) continue label

        for(let j = 0; j < pCount; j++){
            const e = await p.nth(j)
            const text: string = await e.innerHTML()

            if(text.startsWith("配点は")){
                const match = text.match(/配点は (.+) です。/)

                if(match){
                    match[1].split("-").forEach((point,index) => {
                        const problemIndex = String.fromCharCode('a'.charCodeAt(0) + index)
                        const problemID = json.id + "_" + problemIndex
    
                        result.problems.push({
                            id: problemID,
                            contest_id: json.id,
                            problem_index: problemIndex.toUpperCase(),
                            point: +point
                        })
                    })
                }
            }
        }

        result.contests.push(json)
    }

    console.log(result)

    browser.close()

    return result
}