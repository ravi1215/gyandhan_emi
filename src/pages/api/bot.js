import getChatGPTResponse from "@/apiFunctions/chatGPT";

const handler=async (req, res) => {
    if (req.method==='POST') {
        if (req.body.chatHistory) {
            const chatHistory=[];

            for (let i=0; i<req.body.chatHistory.length; i++) {
                chatHistory.push({
                    role: req.body.chatHistory[i].sent? 'user':'assistant',
                    content: req.body.chatHistory[i].message,
                });
            }
            const response=await getChatGPTResponse(chatHistory, req.body.loanData);
            res.status(200).json({ message: response });
        }
        else {
            res.status(400).json({ message: 'Bad Request' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

export default handler;