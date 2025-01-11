import ReactDOM from "react-dom/client";
import Chatbot from "./components/chatBot";
import { useState } from "react";
import { ChatbotOptions } from "./components/interface";

type InitProps = {
  container: string;
  options?: ChatbotOptions;
};

// declare global {
//   interface Window {
//     Chatbot: {
//       init: (props: InitProps) => void;
//       updateOptions: (options: ChatbotOptions) => void;
//     };
//   }
// }

let updateChatbotOptions: ((options: ChatbotOptions) => void) | null = null;

function init({ container, options }: InitProps): void {
  const rootElement = document.querySelector(container);

  if (!rootElement) {
    console.error(
      `Container "${container}" non trovato. Assicurati che esista un elemento con questo selettore.`
    );
    return;
  }

  // Utilizza React 18 per creare la root
  const root = ReactDOM.createRoot(rootElement);

  // Monta il componente Chatbot con stato dinamico per le opzioni
  const App = () => {
    const [chatbotOptions, setChatbotOptions] = useState(options || {});

    updateChatbotOptions = setChatbotOptions;

    return <Chatbot options={{ ...options, ...chatbotOptions }} />;
  };

  root.render(<App />);
}

function updateOptions(options: ChatbotOptions) {
  if (updateChatbotOptions) {
    updateChatbotOptions(options);
  } else {
    console.warn(
      "Chatbot non inizializzato. Chiama `init` prima di aggiornare le opzioni."
    );
  }
}

// Esporta le funzioni init e updateOptions come parte del bundle globale
window.Chatbot = {
  init,
  updateOptions,
};
