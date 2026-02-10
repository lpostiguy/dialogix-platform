import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";

import AiPng from "../assets/images/ai-technology.png";
import { Header } from "../component/Header";
import MicrophonePng from "../assets/images/microphone-black.png"
import SendPng from "../assets/images/send.png";
import TypewriterEffect from "../component/TypewriterEffect";

interface Message {
  id: number;
  index: number;
  text: string;
  sender: string;
  isThinking?: boolean;
}

export const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const isLastMessage = (index: number) => index === messages.length;

  const sendMessage = (message: string, sender: string) => {
    if (message.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        index: messages.length + 1,
        text: message,
        sender: sender,
      },
    ]);
    setInput("");
  };

  const assistantPaymentList = new Set([
    "pay",
    "payment",
    "price",
    "cost",
    "buy",
    "purchase",
    "billing",
    "invoice",
    "card",
    "checkout",
    "subscription",
    "plan",
    "money",
    "receipt",
  ]);

  const assistantSmalltalkList = new Set([
    "hi",
    "hello",
    "hey",
    "how",
    "sup",
    "morning",
    "afternoon",
    "evening",
    "weather",
    "doing",
    "name",
    "who",
    "thanks",
    "thank",
  ]);

  const assistantHelpList = new Set([
    "help",
    "support",
    "broken",
    "issue",
    "error",
    "problem",
    "fix",
    "guide",
    "how-to",
    "question",
    "manual",
    "stuck",
    "contact",
  ]);
  const assistantPaymentListResponse = [
    "We currently support a wide variety of payment methods including all major credit cards (Visa, Mastercard, Amex), PayPal, and even Apple Pay for a faster checkout experience.",
    "You can easily manage your invoices and view your entire billing history by navigating to the 'Settings' tab in your dashboard and selecting 'Billing & Subscriptions'.",
    "Our Pro plan is currently priced at $12.99 per month. However, if you choose our annual billing option, it's only $117 for the entire year, which saves you quite a bit!",
    "I'd be more than happy to assist with your payment questions! Could you please let me know if you're looking to upgrade your account, request a refund, or update your saved card details?",
  ];

  const assistantSmalltalkListResponse = [
    "Hey there! It's a pleasure to meet you. I hope your day is going smoothly so far. How can I assist you with your project today?",
    "Hello! I am your dedicated digital assistant. I'm designed to help you navigate this platform and answer any questions you might have about our services.",
    "Hi! I was actually just sitting here processing some data and thinking about clean code. It's always great to have someone to talk to, what's on your mind?",
    "I'm doing fantastic, thank you for asking! My circuits are fully charged and I'm ready to work. Is there anything specific I can do to make your life easier right now?",
  ];

  const assistantHelpListResponse = [
    "I'm truly sorry to hear that you're running into some technical trouble. To help me troubleshoot this for you, could you please describe the error or tell me what happened right before it occurred?",
    "If you're looking for a quick walkthrough, I highly recommend checking out our official documentation at /docs. It includes step-by-step guides and video tutorials for almost every feature.",
    "I'm here to help get this sorted out! Just to clarify, is this issue related to your personal account settings, or are you having trouble with one of the website's specific features?",
    "I've officially flagged this for one of our human team members to review. While they're getting up to speed, feel free to give me a little more detail about what you're experiencing.",
  ];

  const randomResponse = (responseArray: string[]) => {
    const randomIndex = Math.floor(Math.random() * responseArray.length);
    return responseArray[randomIndex];
  };

  const getAssistantIntent = (userInput: string) => {
    const words = userInput
      .toLowerCase()
      .replace(/[?.,!]/g, "")
      .split(" ");

    let assistantPaymentListCount = 0;
    let assistantHelpListCount = 0;
    let assistantSmalltalkListCount = 0;

    for (let word of words) {
      if (assistantPaymentList.has(word)) assistantPaymentListCount += 1;
      if (assistantHelpList.has(word)) assistantHelpListCount += 1;
      if (assistantSmalltalkList.has(word)) assistantSmalltalkListCount += 1;
    }

    if (assistantPaymentListCount > 0)
      return randomResponse(assistantPaymentListResponse);
    if (assistantHelpListCount > 0)
      return randomResponse(assistantHelpListResponse);
    if (assistantSmalltalkListCount > 0)
      return randomResponse(assistantSmalltalkListResponse);

    return randomResponse(assistantSmalltalkListResponse);
  };

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages.at(-1);

    if (lastMessage?.sender === "user") {
      setMessages((prev: Message[]) => [
        ...prev,
        {
          id: Date.now(),
          index: messages.length + 1,
          text: "Is thinking...",
          sender: "assistant",
          isThinking: true,
        },
      ]);

      setTimeout(() => {
        setMessages((prev: Message[]) => {
          const withoutThinking = prev.filter((m) => !m.isThinking);
          return [
            ...withoutThinking,
            {
              id: Date.now(),
              index: messages.length + 1,
              text: getAssistantIntent(lastMessage?.text || ""),
              sender: "assistant",
            },
          ];
        });
      }, 1000);
    }
  }, [messages.length]);

  return (
    <div className="w-full h-screen bg-slate-200">
      <Header />
      <div className="flex justify-center h-full text-slate-800">
        <div
          className={`${messages.length == 0 ? "bg-opacity-0" : "bg-opacity-100 shadow-lg"} h-[80vh] transition-all duration-700 ease-in-out overflow-y-auto w-4/5 bg-white rounded-3xl space-y-6 mt-6 chat-area`}
        >
          <div className="p-4 w-full flex flex-col justify-center items-center pb-32">
            <div className="w-2/3">
              {messages.map((message: Message) => (
                <>
                  {message.sender === "user" ? (
                    <div
                      key={message.id}
                      className="p-4 border-b max-w-sm w-fit ml-auto border-slate-200 bg-slate-200 rounded-3xl my-2"
                    >
                      <p>{message.text}</p>
                    </div>
                  ) : message.isThinking ? (
                    <div
                      key={message.id}
                      className="p-4 w-full my-2 text-slate-500 animate-pulse"
                    >
                      <p>{message.text}</p>
                    </div>
                  ) : (
                    <div
                      key={message.id}
                      className="p-4 w-full my-2 flex-wrap space-y-2 items-center"
                    >
                      {isLastMessage(message.index) && !message.isThinking ? (
                        <TypewriterEffect text={message.text} />
                      ) : (
                        <p>{message.text}</p>
                      )}
                    </div>
                  )}
                </>
              ))}
              <div
                className={`w-11/12 lg:w-2/3 xl:w-7/12 absolute ${messages.length == 0 ? "" : "translate-y-56"} bottom-64 transition-transform duration-700 ease-in-out right-1/2 translate-x-1/2`}
              >
                <div
                  className={`flex items-center m-4 ${messages.length > 0 ? "hidden" : ""}`}
                >
                  <img src={AiPng} className="w-10" alt="" />
                  <h2 className="text-3xl font-semibold p-4">
                    Where should we start?
                  </h2>
                </div>
                <div className="p-8 flex justify-center items-center shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] rounded-3xl bg-white">
                  <textarea
                    className="w-full p-2 bg-white focus:outline-none h-auto max-h-44 overflow-y-auto"
                    autoFocus
                    placeholder="Ask Dialogix anything..."
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(input, "user");
                      }
                    }}
                    value={input || transcript}
                  />
                  <button
                    className={`ml-2 p-3 rounded-full bg-slate-200 hover:bg-slate-300 duration-300 ease-in-out ${listening ? "bg-slate-300" : ""}`}
                    onClick={
                      listening
                        ? SpeechRecognition.stopListening
                        : SpeechRecognition.startListening
                    }
                  >
                    <img className="w-5" src={MicrophonePng} alt="Send" />
                  </button>
                  <button
                    className="ml-2 p-3 rounded-full bg-slate-200 hover:bg-slate-300 duration-300 ease-in-out"
                    onClick={() => {
                      sendMessage(input || transcript, "user");
                      resetTranscript();
                    }}
                  >
                    <img className="w-5" src={SendPng} alt="Send" />
                  </button>
                </div>
                <div
                  className={`${messages.length > 0 ? "hidden" : ""} flex-wrap items-center space-x-2 space-y-2`}
                >
                  <button
                    className="p-4 rounded-full bg-slate-100 hover:bg-slate-300 duration-300 ease-in-out"
                    onClick={() => sendMessage("Hey how are you ?", "user")}
                  >
                    <p>Hey how are you ?</p>
                  </button>
                  <button
                    className="p-4 rounded-full bg-slate-100 hover:bg-slate-300 duration-300 ease-in-out"
                    onClick={() =>
                      sendMessage("How much does it cost?", "user")
                    }
                  >
                    <p>How much does it cost?</p>
                  </button>
                  <button
                    className="p-4 rounded-full bg-slate-100 hover:bg-slate-300 duration-300 ease-in-out"
                    onClick={() =>
                      sendMessage("Help me understand your website", "user")
                    }
                  >
                    <p>Help me understand your website</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
