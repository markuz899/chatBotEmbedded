# React Chatbot Embedded

React Chatbot Embedded è un'applicazione che consente di integrare facilmente un chatbot nelle tue pagine web o applicazioni. Il chatbot è altamente configurabile e supporta personalizzazioni tramite opzioni e metodi di inizializzazione.

## Installazione

Per iniziare, clonare il repository e installare le dipendenze necessarie:

```bash
  npm install
  npm run dev (for dev mode)
  npm run build && npm run preview (production mode)
```

## Distribuzione

Dopo aver eseguito il comando di build, l'app genera un file UMD (chatbot.umd.js) nella cartella dist. Questo file può essere facilmente aggiunto a qualsiasi applicazione web utilizzando un tag <script>:

```bash
  <script src="dist/chatbot.umd.js"></script>
```

## Utilizzo

Per inizializzare il chatbot, utilizza il metodo Chatbot.init() fornendo un container e le opzioni di configurazione:

```bash
  <script>
    Chatbot.init({
      container: "#chatbot-root", // ID o selettore del contenitore HTML
      options: {
        color: "blue", // Colore principale del chatbot
        position: "bottom-right", // Posizione del chatbot: "bottom-right", "bottom-left", "top-right", "top-left"
        welcomeMessage: "Ciao! Sono qui per aiutarti.", // Messaggio di benvenuto
      },
    });
  </script>
```

Aggiungi un contenitore vuoto dove il chatbot verrà montato:

```bash
  <div id="chatbot-root"></div>
```

## Aggiornamento delle opzioni es:

```bash
  <script>
    setTimeout(() => {
      Chatbot.updateOptions({
        color: "green",
        welcomeMessage: "Ciao! Come posso esserti utile oggi?",
      });
    }, 5000);
  </script>
```

## Esempio completo:

```bash
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot Demo</title>
    <script src="dist/chatbot.umd.js"></script>
  </head>
  <body>
    <div id="chatbot-root"></div>
    <script>
      Chatbot.init({
        container: "#chatbot-root",
        options: {
          color: "blue",
          position: "bottom-right",
          welcomeMessage: "Ciao! Sono qui per aiutarti.",
        },
      });

      setTimeout(() => {
        Chatbot.updateOptions({
          color: "green",
          welcomeMessage: "Ciao! Come posso esserti utile oggi?",
        });
      }, 5000);
    </script>
  </body>
  </html>
```

## Buon utilizzo! 🎉
