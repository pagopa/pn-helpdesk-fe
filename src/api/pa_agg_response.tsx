const agg_list = {
    items: [
        {
            id: "agg_1",
            name: "Aggregation 1",
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
            name: "Comune di Pisa",
        },
        {
            id: "pa_2_2",
            name: "Comune di Napoli",
        },
        {
            id: "pa_3_2",
            name: "Comune di Catanzaro",
        },
        {
            id: "pa_4_2",
            name: "Comune di Trieste",
        },
        {
            id: "pa_5_2",
            name: "Comune di Bologna",
        },
        {
            id: "pa_1_3",
            name: "Comune di Monza",
        },
        {
            id: "pa_2_3",
            name: "Comune di Rimini",
        },
        {
            id: "pa_3_3",
            name: "Comune di Domodossola",
        },
        {
            id: "pa_4_3",
            name: "Comune di Torino",
        },
        {
            id: "pa_5_3",
            name: "Comune di Ragusa",
        }
    ]
}


export { agg_list, pa_list }