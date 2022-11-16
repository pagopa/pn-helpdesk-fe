export interface UsagePlan {
    id: string,
    name: string,
    quota: number,
    rate: number,
    burst: number
}