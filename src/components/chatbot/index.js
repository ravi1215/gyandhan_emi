import { useState } from "react";
import ChatSection from "./chatSection";
import InputArea from "./input";

const Chatbot=({
    loanAmount,
    annualInterestRate,
    tenure,
    totalInterest,
    totalPayment,
    emiPerMonth
}) => {

    const [input, setInput]=useState('');
    const [chatHistory, setChatHistory]=useState([]);

    return (
        <div className="flex flex-col gap-5 h-[63vh] justify-between">
            <ChatSection chatHistory={chatHistory} />
            <InputArea
                input={input}
                setInput={setInput}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                loanAmount={loanAmount}
                annualInterestRate={annualInterestRate}
                tenure={tenure}
                totalInterest={totalInterest}
                totalPayment={totalPayment}
                emiPerMonth={emiPerMonth}
            />
        </div>
    );
}

export default Chatbot;