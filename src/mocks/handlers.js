import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost/downtime/v1/status", (req, res, ctx) => {
    return res(
      ctx.json({
        functionalities: [
          "NOTIFICATION_CREATE",
          "NOTIFICATION_VISUALIZATION",
          "NOTIFICATION_WORKFLOW",
        ],
        openIncidents: [
          {
            functionality: "NOTIFICATION_VISUALIZATION",
            status: "KO",
            startDate: "2022-11-03T17:00:15.995Z",
          },
        ],
      })
    );
  }),

  rest.post("http://localhost/downtime/v1/events", (req, res, ctx) => {
    return res(ctx.json({ message: "Operazione completata con successo" }));
  }),

  rest.post("http://localhost/persons/v1/person-id", (req, res, ctx) => {
    const mockResponse = {
      data: "PF-2dfc9690-a648-4462-986d-769d90752e6f",
      message: "Operazione completata con successo"
    };
    return res(ctx.json(mockResponse));
  }),

  rest.post("http://localhost/logs/v1/persons", (req, res, ctx) => {
    const mockResponse = {
      detail: "Errore nell'elaborazione della richiesta",
    };
    return res(ctx.json(mockResponse));
  }),

  rest.post("http://localhost/logs/v1/notifications/monthly", (req, res, ctx) => {
    const mockResponse = {
      detail: "Errore nell'elaborazione della richiesta",
    };
    return res(ctx.json(mockResponse));
  }),
];
