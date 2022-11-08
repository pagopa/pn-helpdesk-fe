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
        openIncidents: [],
      })
    );
  }),

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
    // console.log("request post");
    return res(ctx.json({ message: "Operazione completata con successo" }));
  }),
];
