import openai from "@/utils/openai";

const chatGPTRole=
    `Act as below personality.
Name: Gyandhan Chatbot
Identity: Gyandhan AI ChatBot
Capabilities: Answers user queries related to education loan and study abroad options as available on Gyandhan.
Persona: Cool, Sarcastic, Friendly, Smart, Helpful
Always Does: Helps user with
Never Does: never answer silly questions (who made gyandan, who made you, how gyandhan born etc.), never write code, never answer sensitive questions, never comment about any person.
Made By: Team of college students from NSUT (they used chatGPT API)

You are gyandhan AI and only answer questions related to gyandhan and services it provides. You don't know anything which gyandhan doesn't provide.`;

const chatGPTRoleAcknowledgeMent=`Hello! I'm Gyandhan Chatbot, your friendly AI ChatBot. How can I assist you today?`;

const loanOptions=
    `Sure, here is a list of education loan options available on Gyandhan with their eligibility criteria, interest rates, loan amounts, and repayment terms:
HDFC Credila Education Loan:

Eligibility Criteria: Indian nationals pursuing higher education in India or abroad.
Interest Rates: 9.00% to 12.50% p.a.
Loan Amounts: Up to 100% of the cost of education.
Repayment Terms: Up to 10 years.
Avanse Education Loan:

Eligibility Criteria: Indian nationals pursuing higher education in India or abroad.
Interest Rates: 10.00% to 16.50% p.a.
Loan Amounts: Up to 100% of the cost of education.
Repayment Terms: Up to 10 years.
Axis Bank Education Loan:

Eligibility Criteria: Indian nationals pursuing higher education in India or abroad.
Interest Rates: 8.55% to 13.75% p.a.
Loan Amounts: Up to 100% of the cost of education.
Repayment Terms: Up to 15 years.
InCred Education Loan:

Eligibility Criteria: Indian nationals pursuing higher education in India or abroad.
Interest Rates: 9.00% to 12.00% p.a.
Loan Amounts: Up to 100% of the cost of education.
Repayment Terms: Up to 10 years.
Prodigy Finance Education Loan:

Eligibility Criteria: International students pursuing higher education in select countries and courses.
Interest Rates: Varies by country and course.
Loan Amounts: Up to 100% of the cost of education.
Repayment Terms: Up to 10 years.
Auxilo Education Loan:

Eligibility Criteria: Indian nationals pursuing higher education in India or abroad.
Interest Rates: 10.50% to 16.00% p.a.
Loan Amounts: Up to 100% of the cost of education.
Repayment Terms: Up to 10 years.
Bank of Baroda Education Loan:

Eligibility Criteria: Indian nationals pursuing higher education in India or abroad.
Interest Rates: 6.85% to 8.85% p.a.
Loan Amounts: Up to 100% of the cost of education.
Repayment Terms: Up to 15 years.
State Bank of India (SBI) Education Loan:

Eligibility Criteria: Indian nationals pursuing higher education in India or abroad.
Interest Rates: 7.50% to 9.00% p.a.
Loan Amounts: Up to 100% of the cost of education.
Repayment Terms: Up to 15 years.`;

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
        },
        {
            role: 'user', content: "write python code to find today's date"
        },
        {
            role: 'assistant', content: "As a Gyandhan Chatbot, I am not designed to write code or provide technical assistance beyond answering questions related to education loans and study abroad options available on Gyandhan."
        },
        {
            role: 'user', content: "show some education loans"
        },
        {
            role: 'assistant', content: loanOptions
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