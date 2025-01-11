import { useState } from "react";
import "./App.css";
import Chatbot from "./components/chatBot";

type ChatbotOptions = {
  color?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  welcomeMessage?: string;
};

type InitProps = {
  container: string;
  options?: ChatbotOptions;
};

declare global {
  interface Window {
    Chatbot: {
      init: (props: InitProps) => void;
      updateOptions: (options: ChatbotOptions) => void;
    };
  }
}

function App() {
  // @ts-ignore
  const [chatbotOptions, setChatbotOptions] = useState({});

  return <Chatbot options={chatbotOptions} />;
}

export default App;
