import { useRef, useEffect } from "react";
import ChatBubble from "./chatBubble";

const ChatSection=({ chatHistory }) => {
    const messagesEndRef=useRef(null);

    const scrollToBottom=() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(scrollToBottom, [chatHistory]);

    return (
        <section className="flex-2/3 overflow-auto scrollbar-none pr-2">
            <ChatBubble
                message="Hi, I'm Gyandhan chatbot. How can I help you?"
                sent={false}
            />
            {chatHistory?.map((item, index) => (
                <div key={index}>
                    <ChatBubble message={item.message} sent={item.sent} />
                    <div ref={messagesEndRef} />
                </div>
            ))}
        </section>
    );
};

export default ChatSection;