export const errorMessages = {
  REQUIRED: "Inserimento errato",
  DATES_INTERVAL: "L'intervallo temporale non può superare i 3 mesi",
  DATES_ORDER: "La data di inizio non può essere oltre quella di fine",
  FISCAL_CODE_LENGTH: "Il codice fiscale deve essere di 16 caratteri",
  UNIQUES_IDENTIFIER_LENGTH:
    "Il codice univoco deve avere tra 1 e 100 caratteri",
  INCORRECT: "Inserimento errato",
  INCORRECT_PASSWORD: "Password non corretta",
  INCORRECT_EMAIL: "Email non corretta",
  PSSWORDS_EQUALITY:
    "La nuova password e la conferma password devono essere le stesse",
  ONE_MONTH_INTERVAL: "Selezionare date nello stesso mese",
  BACKEND_DOWN_MESSAGE:
    "Servizio offline, contattare l'amministratore di sistema",
  TYPE_COST_INVALID: "Prego, selezionare il tipo del costo",
  CAPS_INVALID: "I valori inseriti non sono corretti",
  PRODUCT_TYPE_INVALID: "Selezionare un tipo di prodotto valido",
  ZONE_INVALID: "Selezionare una zona valida",
  MIN_LENGTH: (length: number = 5) => `Inserire almeno ${length} caratteri`,
  INCORRECT_JTI: "Identificativo di sessione non corretto",
};

export const infoMessages = {
  LOGOUT_CONFIRMATION: "Uscire dall'applicazione?",
  OK_RESPONSE: "Operazione completata con successo",
  BAD_REQUEST_RESPONSE: "Informazioni non valide",
  INTERNEL_SERVER_ERROR_RESPONSE:
    "Errore durante l'elaborazione della richiesta",
  WRONG_CREDENTIALS: "Email o password errate",
  //eslint-disable-next-line
  PASSWORD_TOOLTIP_MSG:
    "La password deve contenere almeno 1 lettera minuscola, almeno 1 lettera maiuscola, almeno 1 numero, nessuno spazio, almeno uno tra i caratteri ^$*.[]{}()?-\"!@#%&/,><':;|_~`+=+ e lunghezza almeno 16 caratteri",
  TIMEOUT:
    "L'intervallo temporale selezionato è troppo grande, selezionarne uno più piccolo",
  ACCEPTED_RESPONSE: "La richiesta è stata eseguita parzialmente",
  TITLE_ALERT_DELETE_TENDER: "Vuoi eliminare la Gara ?",
  MESSAGE_ALERT_DELETE_TENDER: "Stai per eliminare la gara e tutti i suoi dettagli. L'operazione sarà irreversibile. Vuoi continuare ?",

};

export const functionalitiesNames: { [key: string]: string } = {
  NOTIFICATION_CREATE: "Creazione Notifiche",
  NOTIFICATION_VISUALIZATION: "Visualizzazione Notifiche",
  NOTIFICATION_WORKFLOW: "Workflow Notifiche",
};
