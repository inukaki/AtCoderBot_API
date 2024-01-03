import { Daily } from "../../domain/models/Daily.ts"
import { Color, getColor } from "../../domain/models/Difficulty.ts"
import { Problem } from "../../domain/models/Problem.ts"
import { server } from "../../infrastructure/server.ts"

export class DailyConverter {
    private daily = new Daily()
    private seed = 0

    async getDailyProblems() {
        let date = new Date()
        let seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()

        if(this.seed == seed) {
            return this.daily
        } 

        this.seed = seed

        let problems = await server.instance.problemConverter.listProblems()

        let mp = new Map<string, Problem[]>()
        
        for(const problem of problems) {
            let color = getColor(problem.difficulty)

            mp.set(color, mp.get(color)?.concat(problem) ?? [problem])
        }

        let random = new Random(seed)

        for(const color of Color) {
            if(color == "None") continue

            let len = () => {if(!mp.get(color)) return 0; else return mp.get(color)!!.length-1;}
            let index = random.nextInt(0, len())

            this.daily.setProblem(color, mp.get(color)?.at(index))
        }

        return this.daily
    }
}

class Random {
    private x
    private y
    private z
    private w

    constructor(seed = 88675123) {
      this.x = 123456789;
      this.y = 362436069;
      this.z = 521288629;
      this.w = seed;
    }
    
    // XorShift
    next() {
      let t;
   
      t = this.x ^ (this.x << 11);
      this.x = this.y; this.y = this.z; this.z = this.w;
      return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8)); 
    }
    
    // min以上max以下の乱数を生成する
    nextInt(min: number, max: number) {
      const r = Math.abs(this.next());
      return min + (r % (max + 1 - min));
    }
  }