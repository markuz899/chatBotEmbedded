import { SetStateAction, useState, useRef, useEffect } from "react";

const Chatbot = ({
  options,
}: {
  options: {
    color?: string;
    position?: string;
    welcomeMessage?: string;
  };
}) => {
  const {
    color = "#0078D7",
    position = "bottom-right",
    welcomeMessage = "Ciao! Come posso aiutarti?",
  } = options;

  const [messages, setMessages] = useState([
    { text: welcomeMessage, sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (evt: {
    target: { value: SetStateAction<string> };
  }) => {
    setInput(evt.target.value);
  };

  const handleKeyDown = (evt: any) => {
    if (evt.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setMessages((prev) => [
        ...prev,
        { text: "Risposta automatica", sender: "bot" },
      ]);
      setInput("");
    }
  };

  // Calcola la posizione del chatbot
  const positionStyles: any = {
    "bottom-right": { bottom: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "top-left": { top: "20px", left: "20px" },
  };

  const styles: any = {
    container: {
      position: "fixed",
      width: "300px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      ...positionStyles[position],
    },
    header: {
      backgroundColor: color,
      color: "white",
      padding: "10px",
      borderRadius: "10px 10px 0 0",
    },
    messages: {
      padding: "10px",
      height: "300px",
      overflowY: "scroll" as const,
      backgroundColor: "#f9f9f9",
    },
    messageContainer: (isUser: boolean) => ({
      textAlign: isUser ? "right" : ("left" as const),
      margin: "5px 0",
    }),
    bubble: (isUser: boolean) => ({
      padding: "8px",
      borderRadius: "10px",
      backgroundColor: isUser ? color : "#e0e0e0",
      color: isUser ? "white" : "black",
    }),
    inputContainer: {
      display: "flex",
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "0 0 10px 10px",
    },
    input: {
      flex: 1,
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      marginLeft: "10px",
      padding: "8px 10px",
      backgroundColor: color,
      color: "white",
      border: "none",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Chatbot</div>
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={styles.messageContainer(msg.sender === "user")}
          >
            <span style={styles.bubble(msg.sender === "user")}>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Invia
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
