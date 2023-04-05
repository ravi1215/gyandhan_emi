import { useState } from "react";
import ChatSection from "./chatSection";
import InputArea from "./input";

const Chatbot=() => {

    const [input, setInput]=useState('');
    const [chatHistory, setChatHistory]=useState([]);

    return (
        <div className="flex flex-col gap-5">
            <ChatSection chatHistory={chatHistory} />
            <InputArea input={input} setInput={setInput} chatHistory={chatHistory} setChatHistory={setChatHistory} />
        </div>
    );
}

export default Chatbot;