import { Permission } from "../model/user-permission";
import * as routes from "./router.const";

export const allNavigationItems: { title: string; link: string; permissions?: Array<Permission> }[] = [
  {
    title: "Ricerca ed estrazione dati",
    link: routes.SEARCH_ROUTE,
    permissions: [Permission.LOG_EXTRACT_READ]
  },
  {
    title: "Monitoraggio Piattaforma Notifiche",
    link: routes.MONITOR_ROUTE,
    permissions: [Permission.LOG_DOWNTIME_READ]
  },
  {
    title: "Gestione gare",
    link: routes.TENDERS_TABLE_ROUTE,
    permissions: [Permission.TENDER_READ]
  },
  {
    title: "Stime volume notifiche",
    link: routes.SEARCH_USAGE_ESTIMATES_ROUTE,
    permissions: [Permission.TENDER_READ]
  },
  {
    title: "Report",
    link: routes.REPORT_PA_ROUTE,
    permissions: [Permission.TENDER_READ]
  },
  {
    title: "Gestione Aggregazioni ApiKey",
    link: routes.AGGREGATES_LIST,
    permissions: [Permission.API_KEY_READ]
  },
  {
    title: "Trasferimento di PA",
    link: routes.TRANSFER_PA,
    permissions: [Permission.API_KEY_WRITE]
  },
  {
    title:"Gestione Autorizzazioni ApiKey",
    link: routes.AUTH_APIKEY,
    permissions: [Permission.API_KEY_WRITE] 
  }
];