import { Pa, getAggregatesResponse } from './apiRequestTypes';

const aggregates_list: getAggregatesResponse = {
  lastEvaluatedId: 'agg10',
  lastEvaluatedName: 'Comuni Palermo',
  total: 13,
  items: Array.from(new Array(10), (val, index) => ({
    id: `agg_${index}`,
    name: `Comune indice ${index + 1}`,
    usagePlan: index % 2 === 0 ? 'Medium' : 'Large',
    createdAt: '2022-11-10 10:00:00',
  })),
};

const pa_list = {
  items: Array.from(new Array(15), (val, index) => ({
    id: `pa_1_${index}`,
    name: `Comune indice ${index + 1}`,
  })),
};

const pa_list_associated = {
  items: Array.from(new Array(15), (val, index) => ({
    id: `pa_associated_1_${index}`,
    name: `Comune associato indice ${index + 1}`,
  })),
};

const aggregate = {
  id: 'agg1',
  name: 'Comuni Lombardia',
  description: 'Aggregazione dei comuni della Lombardia',
  usagePlan: {
    id: '1',
    name: 'Medium',
    quota: 1000,
    rate: 1000,
    burst: 100,
  },
  createdAt: '2022-11-10',
};

const search_pa = (limit: number, lastKey: string, name: string = '') => {
  lastKey = lastKey || '1';
  let items: Array<Pa> = Array.from({ length: limit }, (v, index) => ({
    id: String(index),
    name: `Comune indice ${index * Number(lastKey)}`,
  }));
  let total = items.length + 12;

  if (name !== '') {
    items = items.filter((item) => item.name.includes(name));
    total = items.length;
  }

  return {
    lastEvaluatedId: String(Number(lastKey) + 1),
    lastEvaluatedName: 'testLastEvaluatedName',
    items,
    total,
  };
};

const api_key = {
  items: [
    {
      id: '001',
      name: 'Key Group 1',
      groups: 'Group 1',
      status: 'attiva',
      pdnd: true,
    },
    {
      id: '002',
      name: 'Key Group 2',
      groups: 'Group 2',
      status: 'attiva',
      pdnd: false,
    },
    {
      id: '003',
      name: 'Key Group 3',
      groups: 'Group 3',
      status: 'attiva',
      pdnd: true,
    },
    {
      id: '004',
      name: 'Key Group 4',
      groups: 'Group 4',
      status: 'attiva',
      pdnd: false,
    },
    {
      id: '005',
      name: 'Key Group 5',
      groups: 'Group 5',
      status: 'rotata',
      pdnd: false,
    },
    {
      id: '006',
      name: 'Key Group 6',
      groups: 'Group 6',
      status: 'rotata',
      pdnd: false,
    },
    {
      id: '007',
      name: 'Key Group 7',
      groups: 'Group 7',
      status: 'attiva',
      pdnd: false,
    },
    {
      id: '008',
      name: 'Key Group 8',
      groups: 'Group 8',
      status: 'attiva',
      pdnd: true,
    },
    {
      id: '009',
      name: 'Key Group 9',
      groups: 'Group 9',
      status: 'attiva',
      pdnd: true,
    },
  ],
  total: 1,
};

const modify_pdnd = {
  unprocessedKey: ['0001'],
};

const usage_plan_list = {
  items: [
    {
      id: '0',
      name: 'Small',
      quota: 1000,
      rate: 100,
      burst: 30,
    },
    {
      id: '1',
      name: 'Medium',
      quota: 5000,
      rate: 1000,
      burst: 300,
    },
    {
      id: '2',
      name: 'Large',
      quota: 10000,
      rate: 2000,
      burst: 600,
    },
  ],
};

const move_pa = {
  processed: 1,
  unprocessed: 0,
  unprocessedPA: [],
};

export {
  pa_list,
  aggregate,
  pa_list_associated,
  usage_plan_list,
  aggregates_list,
  move_pa,
  search_pa,
  api_key,
  modify_pdnd,
};
