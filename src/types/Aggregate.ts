import { Pa } from "./Pa";
import { UsagePlan } from "./UsagePlan";

export interface Aggregate {
    id: string,
    name: string,
    description: string,
    usagePlan: UsagePlan,
    createdAt: string,
    lastUpdate?: string,
    associatedPa?: Array<Pa>
}