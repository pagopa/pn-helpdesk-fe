import { Permission } from '../model/user-permission';
import * as routes from './router.const';

export const allNavigationItems: Array<{
  title: string;
  link: string;
  permissions?: Array<Permission>;
  id: string;
}> = [
  {
    title: 'Ricerca ed estrazione dati',
    link: routes.SEARCH_ROUTE,
    permissions: [Permission.LOG_EXTRACT_READ],
    id: 'ricercaEdEstrazioneDati',
  },
  {
    title: 'Monitoraggio Piattaforma Notifiche',
    link: routes.MONITOR_ROUTE,
    permissions: [Permission.LOG_DOWNTIME_READ],
    id: 'monitoraggioPiattaformaNotifiche'
  },
  {
    title: 'Gestione gare',
    link: routes.TENDERS_TABLE_ROUTE,
    permissions: [Permission.TENDER_READ],
    id:'gestioneGare'
  },
  {
    title: 'Gestione Aggregazioni ApiKey',
    link: routes.AGGREGATES_LIST,
    permissions: [Permission.API_KEY_READ],
    id:'gestioneAggregazioniApiKey',
  },
  {
    title: 'Trasferimento di PA',
    link: routes.TRANSFER_PA,
    permissions: [Permission.API_KEY_WRITE],
    id:'trasferimentoPa'
  },
  {
    title: 'Gestione Autorizzazioni ApiKey',
    link: routes.AUTH_APIKEY,
    permissions: [Permission.API_KEY_WRITE],
    id:'gestioneAutorizzazioniApiKey'
  },
];
