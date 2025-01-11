import { SetStateAction, useState, useRef, useEffect } from "react";
import { ChatbotOptions } from "./interface";
import styled from "styled-components";
import notificationSound from "../assets/notify.mp3";

const Chatbot = ({ options }: { options: ChatbotOptions }) => {
  const {
    label,
    color = "#0078D7",
    position = "bottom-right",
    welcomeMessage = "Ciao! Come posso aiutarti?",
    openState,
  } = options;
  const [isOpen, setIsOpen] = useState(openState);
  const [messages, setMessages] = useState([
    { text: welcomeMessage, sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Errore durante la riproduzione del suono:", err);
      });
    }
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    scrollToBottom();

    // Riproduci suono se ultimo msg non viene dall'utente
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender !== "user") {
        playNotificationSound();
      }
    }
  }, [messages]);

  useEffect(() => {
    setIsOpen(openState);
  }, [openState]);

  const handleInputChange = (evt: {
    target: { value: SetStateAction<string> };
  }) => {
    if (evt.target.value) {
      setInputError(false);
    }
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
    } else {
      setInputError(true);
    }
  };

  // Calcola la posizione del chatbot
  const positionStyles: any = {
    "bottom-right": { bottom: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "top-left": { top: "20px", left: "20px" },
  };

  return (
    <>
      <audio ref={audioRef} src={notificationSound} />
      {isOpen ? (
        <Container $positionStyles={positionStyles[position]}>
          <Header color={color}>
            <p>{label || "Chatbot"}</p>
            <div className="toggle" onClick={toggle}>
              &#10134;
            </div>
          </Header>
          <Messages>
            {messages.map((msg, index) => (
              <MessageContainer key={index} $isUser={msg.sender === "user"}>
                <Bubble $isUser={msg.sender === "user"} color={color}>
                  {msg.text}
                </Bubble>
              </MessageContainer>
            ))}
            <div ref={messagesEndRef}></div>
          </Messages>
          <InputContainer>
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              $isError={inputError}
            />
            <Button onClick={sendMessage} color={color}>
              Invia
            </Button>
          </InputContainer>
        </Container>
      ) : (
        <Collapsed
          color={color}
          $positionStyles={positionStyles[position]}
          onClick={toggle}
        >
          <div className="toggle">{label || "Chatbot"}</div>
        </Collapsed>
      )}
    </>
  );
};

export default Chatbot;

const Container = styled.div<{ $positionStyles: any }>`
  position: fixed;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  ${(props) => props.$positionStyles};
`;

const Collapsed = styled(Container)`
  cursor: pointer;
  background: ${(props) => props.color};
  width: fit-content;
  padding: 10px;
  transition: 0.5s;
  .toggle {
    color: #fff;
    display: flex;
    align-items: center;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const Header = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0;
  }
  .toggle {
    cursor: pointer;
  }
`;

const Messages = styled.div`
  padding: 10px;
  height: 300px;
  overflow-y: scroll;
  background: #f9f9f9;
`;

const MessageContainer = styled.div<{ $isUser: boolean }>`
  text-align: ${(props) => (props.$isUser ? "right" : "left")};
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
`;

const Bubble = styled.p<{ $isUser: boolean; color: string }>`
  width: fit-content;
  padding: 8px;
  border-radius: 10px;
  background: ${(props) => (props.$isUser ? props.color : "#e0e0e0")};
  color: ${(props) => (props.$isUser ? "white" : "black")};
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background: #fff;
  border-radius: 0 0 10px 10px;
`;

const Input = styled.input<{ $isError: boolean }>`
  flex: 1;
  padding: 8px;
  border: ${({ $isError }) => ($isError ? "1px solid red" : "1px solid #ccc")};
  border-radius: 5px;
`;

const Button = styled.button<{ color: string }>`
  margin-left: 10px;
  padding: 8px 10px;
  background: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
