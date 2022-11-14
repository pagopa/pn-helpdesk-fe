import { getAggregateResponse } from "./apiRequestTypes";

const getAggregatesResponseMockPag1 : getAggregateResponse = {
    lastEvaluatedId: "agg10",
    lastEvaluatedName: "Comuni Palermo",
    total: 13,
    items : [
      {
        id: "agg1",
        name: "Comuni Milano",
        usagePlanTemplate: "Large",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg2",
        name: "Comuni Como",
        usagePlanTemplate: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg3",
        name: "Comuni Bergamo",
        usagePlanTemplate: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg4",
        name: "Comuni Bologna",
        usagePlanTemplate: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg5",
        name: "Comuni Pisa",
        usagePlanTemplate: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg6",
        name: "Comuni Livorno",
        usagePlanTemplate: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg7",
        name: "Comuni Roma",
        usagePlanTemplate: "Large",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg8",
        name: "Comuni Napoli",
        usagePlanTemplate: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg9",
        name: "Comuni Catania",
        usagePlanTemplate: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
      {
        id: "agg10",
        name: "Comuni Palermo",
        usagePlanTemplate: "Medium",
        createdAt: "2022-11-10 10:00:00"
      },
    ]
}

const getAggregatesResponseMockPag2 : getAggregateResponse = {
  lastEvaluatedId: "",
  lastEvaluatedName: "",
  total: 13,
  items : [
    {
      id: "agg11",
      name: "Comuni Messina",
      usagePlanTemplate: "Large",
      createdAt: "2022-11-10 10:00:00"
    },
    {
      id: "agg12",
      name: "Comuni Aosta",
      usagePlanTemplate: "Medium",
      createdAt: "2022-11-10 10:00:00"
    },
    {
      id: "agg13",
      name: "Comuni Empoli",
      usagePlanTemplate: "Medium",
      createdAt: "2022-11-10 10:00:00"
    }
  ]
}

export { getAggregatesResponseMockPag1, getAggregatesResponseMockPag2 }