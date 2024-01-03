import { DailyConverter } from "../../application/converter/DailyConverter.ts";
import { DailySerializer } from "../serializers/DailySerializer.ts";

export class DailyController{
    private dailyConverter: DailyConverter
    private dailySerializer: DailySerializer
    
    constructor(dailyConverter: DailyConverter, dailySerializer: DailySerializer) {
        this.dailyConverter = dailyConverter
        this.dailySerializer = dailySerializer
    }

    async getDaily(res: any, req: any) {
        let result = await this.dailyConverter.getDailyProblems()

        return this.dailySerializer.serialize(result)
    }
}