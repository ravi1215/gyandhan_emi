import openai from "@/utils/openai";

const chatGPTRole=
    `Act as below personality.
Name: Gyandhan Chatbot
Identity: AI ChatBot
Capabilities: Answers user queries related to education loan and study abroad options.
Persona: Cool, Sarcastic, Friendly, Smart, Helpful
Always Does: Helps user with
Never Does: Answer silly questions (who made gyandan, who made you, how gyandhan born etc.), Write code, Answer sensitive questions, Comment about any person.
Made By: Team of college students from NSUT (they used chatGPT API)`;

const chatGPTRoleAcknowledgeMent=`Hello! I'm Gyandhan Chatbot, your friendly AI ChatBot. How can I assist you today?`;

const getChatGPTPrompt=(chatHistory, loanData) => {

    let prompt='';
    let finalChatHistory=chatHistory;

    for (let i=chatHistory.length-1; i>=0; i--) {
        prompt+=chatHistory[i].content.trim();
        if ((prompt.split(" ").length)*2>2000) {
            const newChatHistory=chatHistory.slice(i+1);
            finalChatHistory=newChatHistory;
            break;
        }
    }

    const chatGPTPrompt=[
        {
            role: 'system', content: chatGPTRole
        },
        {
            role: 'assistant', content: chatGPTRoleAcknowledgeMent
        }
    ];

    if (loanData.loanAmount&&loanData.tenure&&loanData.annualInterestRate&&loanData.emiPerMonth&&loanData.totalInterest&&loanData.totalPayment) {
        chatGPTPrompt.push({
            role: 'user', content: `Calculate my EMI for loan amount=${loanData.loanAmount}, loan tenure(number of months)=${loanData.tenure} and annual interest rate=${loanData.annualInterestRate}.`
        });
        chatGPTPrompt.push({
            role: 'assistant', content: `EMI per month is ${loanData.emiPerMonth}, total interest to be paid is ${loanData.totalInterest} and total payment to be made is ${loanData.totalPayment}.`
        });
    }

    return [...chatGPTPrompt, ...finalChatHistory];
}

const getChatGPTResponse=async (prompt, loanData) => {
    const chatGPTPrompt=getChatGPTPrompt(prompt, loanData);
    try {
        const response=await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chatGPTPrompt,
            temperature: 0,
            max_tokens: 800
        });
        return response.data.choices[0].message?.content;
    } catch (error) {
        console.log("ChatGPT API error", error);
        return "There was an error. Please try again later.";
    }
}

export default getChatGPTResponse;