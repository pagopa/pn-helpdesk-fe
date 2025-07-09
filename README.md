## **Piattaforma notifiche - helpdesk**

### **Start**

Nella root del progetto utilizzare il comando

`yarn install`

### **Avviare l'applicazione**

Prima di avviare l'applicazione:

1. copia nella cartella `public/conf` il file `config.dev.json`
2. rinominalo in `config.json`
3. sostituisci i valori di AWS_USER_POOLS_ID e AWS_USER_POOLS_WEB_CLIENT_ID
4. aggiungere il file `.env.local` con le seguenti config

```text
HOST = 'helpdesk.dev.notifichedigitali.it'
HTTPS = true
PORT = 443
```

5. Aggiungere nei virtual hosts (es: `/etc/hosts`)

```text
127.0.0.1 helpdesk.dev.notifichedigitali.it
```

Per avviare l'applicazione utilizzare il comando

`sudo yarn start`

Per eseguire i test di tutti i packages utilizzare il comando 
`yarn test`
