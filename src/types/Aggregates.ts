export interface GetAggregateParams {
    name?: string,
    limit?: number,
    lastEvaluatedId?: string,
    lastEvaluatedName?: string
}

export interface GetAggregateResponse {
    items: Array<AggregateSummary>
    lastEvaluatedId: string,
    lastEvaluatedName: string,
    total: number
}

export interface AggregateSummary {
    id: string,
    name: string,
    usagePlanTemplate: string,
    createdAt: string,
    lastUpdate?: string
}