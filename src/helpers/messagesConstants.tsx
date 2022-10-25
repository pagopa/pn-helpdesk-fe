export const errorMessages = {
    REQUIRED: "Inserimento errato",
    DATES_INTERVAL: "L'intervallo temporale non può superare i 3 mesi",
    DATES_ORDER: "La data di inizio periodo non può essere oltre la data di fine periodo",
    FISCAL_CODE_LENGTH: "Il codice fiscale deve essere di 16 caratteri",
    UNIQUES_IDENTIFIER_LENGTH: "Il codice univoco deve avere tra 1 e 100 caratteri",
    INCORRECT: "Inserimento errato",
    INCORRECT_PASSWORD: "Password non corretta",
    INCORRECT_EMAIL: "Email non corretta",
    PSSWORDS_EQUALITY: "La nuova password e la conferma password devono essere le stesse",
    ONE_MONTH_INTERVAL: "Le date selezionate devono essere all'interno dello stesso mese",
}

export const infoMessages = {
    LOGOUT_CONFIRMATION: "Uscire dall'applicazione?",
    OK_RESPONSE: "Operazione completata con successo",
    BAD_REQUEST_RESPONSE: "Informazioni non valide",
    INTERNEL_SERVER_ERROR_RESPONSE: "Errore durante l'elaborazione della richiesta",
    WRONG_CREDENTIALS: "Email o password errate",
    PASSWORD_TOOLTIP_MSG: "La password deve contenere almeno 1 lettera minuscola, almeno 1 lettera maiuscola, almeno 1 numero, nessuno spazio, almeno uno tra i caratteri ^$*.[]{}()?-\"!@#%&/\,><':;|_~`+=+ e lunghezza almeno 16 caratteri",
    TIMEOUT: "L'intervallo temporale selezionato è troppo grande, selezionarne uno più piccolo"
}

export const functionalitiesNames: {[key: string]: string} = {
    NOTIFICATION_CREATE: "Creazione notifiche",
    NOTIFICATION_VISUALIZATION: "Operazione di visualizzazione",
    NOTIFICATION_WORKFLOW: "Workflow"
}