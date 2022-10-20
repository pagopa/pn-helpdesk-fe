/**
 * @jest-environment node
 */

import 'regenerator-runtime/runtime'


const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.sessionStorage = sessionStorageMock as unknown as Storage;

describe('Api requests tests', () => {


    /*it('getPersonId', async() => {
        const payload: getPersonIdType = {
            recipientType: "PG",
            ticketNumber: "abc",
            taxId: "MLLSNT82P65Z404U"
        }
        const request = apiRequests.getPersonId(payload)
        const {data} = await request;
        console.log(data)
        expect(data).toMatchObject({"data": expect.any(String)})
    });

    it('getPersonId with error', async() => {
        const payload = {
            recipientType: "PG",
            ticketNumber: "abc",
        }
        const request = apiRequests.getPersonId(payload as getPersonIdType)
        expect(await request).toThrowError()
    });

    it('getPersonTaxId', async() => {
        const payload: getPersonTaxIdType = {
            personId: "abc"
        }
        const request = apiRequests.getPersonTaxId(payload)
        const {data} = await request;
        expect(data).toMatchObject({"data": expect.any(String)})
    });

    it('getPersonTaxId with error', async() => {
        const payload = {
            personId: "./+"
        }
        const request = apiRequests.getPersonTaxId(payload as getPersonTaxIdType)
        expect(await request).toThrowError()
    });

    it('getNotificationsInfoLogs', async() => {
        const payload:getNotificationsInfoLogsType = {
            ticketNumber: "abc",
            iun: 5
        }
        const request = apiRequests.getNotificationsInfoLogs(payload)
        const res = await request;
        expect(res).toMatchObject({"data": expect.any(String)})
    });

    it('getNotificationsInfoLogs with error', async() => {
        const payload = {
            ticketNumber: "abc",
        }
        const request = apiRequests.getNotificationsInfoLogs(payload as getNotificationsInfoLogsType)
        expect(await request).toThrowError();
    });

    it('getNotificationsMonthlyStatsLogs', async() => {
        const payload:getNotificationsMonthlyStatsLogsType = {
            ticketNumber: "abc",
            ipaCode: 0,
            referenceMonth: "2022-05"
        }
        const request = apiRequests.getNotificationsMonthlyStatsLogs(payload)
        const res = await request;
        expect(res).toMatchObject({"data": expect.any(String)})
    });

    it('getNotificationsMonthlyStatsLogs with error', async() => {
        const payload:getNotificationsMonthlyStatsLogsType = {
            ticketNumber: "abc",
            ipaCode: 0,
            referenceMonth:"2022-05"
        }
        const request = apiRequests.getNotificationsMonthlyStatsLogs(payload)
        expect(await request).toFa();
    });

    it('getLogsProcesses', async() => {
        const payload:getLogsProcessesType = {
            traceId: "Root=1-628cd739-3a11653723d704c80fa4060e",
            dateFrom: "2022-03-25",
            dateTo: "2022-06-23"
        }
        const request = apiRequests.getLogsProcesses(payload)
        const res = await request;
        expect(res).toMatchObject({"data": expect.any(String)})
    });

    it('getLogsProcesses with errors', async() => {
        const payload = {
            traceId: "Root=1-628cd739-3a11653723d704c80fa4060e",
            dateFrom: "2022-03-25",
        }
        const request = apiRequests.getLogsProcesses(payload as getLogsProcessesType)
        expect(await request).toThrowError();
    });

    it('getPersonsLogs', async() => {
        const payload:getPersonsLogsType = {
            ticketNumber: "abc",
            deanonimization: false,
            iun: 45
        }
        const request = apiRequests.getPersonsLogs(payload)
        const res = await request;
        expect(res).toMatchObject({"data": expect.any(String)})
    });

    it('getPersonsLogs with errors', async() => {
        const payload = {
            ticketNumber: "abc",
            deanonimization: false,
        }
        const request = apiRequests.getPersonsLogs(payload as getPersonsLogsType)
        expect(await request).toThrowError();
    });

    /*it('getOperatorsLogs', async() => {
        const payload:getOperatorsLogsType = {
            ticketNumber: "abc",
            taxId: "MLLSNT82P65Z404U",
            dateFrom: "2022-04-25",
            dateTo: "2022-06-15"
        }
        const request = apiRequests.getOperatorsLogs(payload)
        const res = await request;
        expect(res).toMatchObject({"data": expect.any(String)})
    });*/

    /*it('getOperatorsLogs with errors', async() => {
        const payload = {
            ticketNumber: "abc",
            taxId: "MLLSNT82P65Z404U",
            dateTo: "2022-06-15"
        }
        const request = apiRequests.getOperatorsLogs(payload as getOperatorsLogsType)
        expect(await request).toThrowError();
    });*/
});