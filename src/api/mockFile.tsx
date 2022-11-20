import { getAggregatesResponse } from "./apiRequestTypes";

const getAggregatesResponseMockPag1 : getAggregatesResponse = {
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

const getAggregatesResponseMockPag2 : getAggregatesResponse = {
  lastEvaluatedId: "",
  lastEvaluatedName: "",
  total: 13,
  items : [
    {
      id: "agg_11",
      name: "Comuni Messina",
      usagePlan: "Large",
      createdAt: "2022-11-10 10:00:00"
    },
    {
      id: "agg_12",
      name: "Comuni Aosta",
      usagePlan: "Medium",
      createdAt: "2022-11-10 10:00:00"
    },
    {
      id: "agg_13",
      name: "Comuni Empoli",
      usagePlan: "Medium",
      createdAt: "2022-11-10 10:00:00"
    }
  ]
}

export { getAggregatesResponseMockPag1, getAggregatesResponseMockPag2 }