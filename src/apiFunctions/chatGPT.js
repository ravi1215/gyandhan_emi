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

const getChatGPTPrompt=(chatHistory) => {

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
        },
        ...finalChatHistory,
    ];

    return chatGPTPrompt;
}

const getChatGPTResponse=async (prompt) => {
    const chatGPTPrompt=getChatGPTPrompt(prompt);
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