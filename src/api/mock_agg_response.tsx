import { getAggregatesResponse } from "./apiRequestTypes";

const aggregates_list : getAggregatesResponse = {
    lastEvaluatedId: "agg10",
    lastEvaluatedName: "Comuni Palermo",
    total: 13,
    items : [
      {
        id: "agg_1",
        name: "Comuni Milano",
        usagePlan: "Large",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg_2",
        name: "Comuni Como",
        usagePlan: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg_3",
        name: "Comuni Bergamo",
        usagePlan: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg_4",
        name: "Comuni Bologna",
        usagePlan: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg_5",
        name: "Comuni Pisa",
        usagePlan: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg_6",
        name: "Comuni Livorno",
        usagePlan: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg_7",
        name: "Comuni Roma",
        usagePlan: "Large",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg_8",
        name: "Comuni Napoli",
        usagePlan: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg_9",
        name: "Comuni Catania",
        usagePlan: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg_10",
        name: "Comuni Palermo",
        usagePlan: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
    ]
}

const agg_list = {
    items: [
        {
            id: "agg_1",
            name: "Aggregation 1",
            description: "Descrizione Aggregation 1",
            usagePlan: {
                id: "0",
                name: "Small",
                quota: 1000,
                rate: 100,
                burst: 30
            },
            createdAt: "2022-11-10T10:00:33.309Z",
            lastUpdate: "2022-11-10T10:00:33.309Z",
            associatedPa: 0
        },
        {
            id: "agg_2",
            name: "Aggregation 2",
            description: "Descrizione Aggregation 2",
            usagePlan: {
                id: "1",
                name: "Medium",
                quota: 5000,
                rate: 1000,
                burst: 300
            },
            createdAt: "2022-11-10T10:00:33.309Z",
            lastUpdate: "2022-11-10T10:00:33.309Z",
            associatedPa: 0
        },
        {
            id: "agg_3",
            name: "Aggregation 3",
            description: "Descrizione Aggregation 3",
            usagePlan: {
                id: "2",
                name: "Large",
                quota: 10000,
                rate: 2000,
                burst: 600
            },
            createdAt: "2022-11-10T10:00:33.309Z",
            lastUpdate: "2022-11-10T10:00:33.309Z",
            associatedPa: 0
        }
    ]
}

const pa_list = {
    items: [
        {
            id: "pa_1_1",
            name: "Comune di Roma",
        },
        {
            id: "pa_2_1",
            name: "Comune di Fiumicino",
        },
        {
            id: "pa_3_1",
            name: "Comune di Bari",
        },
        {
            id: "pa_4_1",
            name: "Comune di Firenze",
        },
        {
            id: "pa_5_1",
            name: "Comune di Milano",
        },
        {
            id: "pa_1_12",
            name: "Comune di Potenza",
        },
        {
            id: "pa_2_2",
            name: "Comune di Aosta",
        },
        {
            id: "pa_3_2",
            name: "Comune di Livorno",
        },
        {
            id: "pa_4_2",
            name: "Comune di Nettuno",
        },
        {
            id: "pa_5_2",
            name: "Comune di Messina",
        },
        {
            id: "pa_1_3",
            name: "Comune di Genova",
        },
        {
            id: "pa_2_3",
            name: "Comune di Trapani",
        },
        {
            id: "pa_3_3",
            name: "Comune di Venezia",
        },
        {
            id: "pa_4_3",
            name: "Comune di Varese",
        },
        {
            id: "pa_5_3",
            name: "Comune di Torino",
        }
    ]
};

const pa_list_associated = {
    items: [
        {
            id: "pa_1_1",
            name: "Comune di Taranto",
        },
        {
            id: "pa_2_1",
            name: "Comune di Empoli",
        },
        {
            id: "pa_3_1",
            name: "Comune di Como",
        },
        {
            id: "pa_4_1",
            name: "Comune di Salerno",
        },
        {
            id: "pa_5_1",
            name: "Comune di Sondrio",
        }
    ]
};

const aggregate = {
    id: "agg1",
    name: "Comuni Lombardia",
    description: "Aggregazione dei comuni della Lombardia",
    usagePlan: {
        id:"1",
        name: "Medium",
        quota: 1000,
        rate: 1000,
        burst: 100
    },
    createdAt: "2022-11-10"
};

const usage_plan_list = {
    items: [
        {
        id: "0",
        name: "Small",
        quota: 1000,
        rate: 100,
        burst: 30
        },
        {
        id: "1",
        name: "Medium",
        quota: 5000,
        rate: 1000,
        burst: 300
        },
        {
        id: "2",
        name: "Large",
        quota: 10000,
        rate: 2000,
        burst: 600
        }
    ]
};

const move_pa = {
    processed: 1,
    unprocessed: 0,
    unprocessedPA: []
}

export { agg_list, pa_list, aggregate, pa_list_associated, usage_plan_list, aggregates_list, move_pa }