import axios from "axios";
import { useState } from "react";

const InputArea=({ input, setInput, chatHistory, setChatHistory }) => {

    const [loading, setLoading]=useState(false);

    const handleGenerate=async () => {
        try {
            setLoading(true);
            const response=await axios.post("/api/bot", {
                chatHistory: [...chatHistory, { message: input, sent: true }]
            });
            setChatHistory([
                ...chatHistory,
                {
                    message: input,
                    sent: true,
                },
                {
                    message: response.data.message,
                    sent: false,
                }
            ]);

            setInput('');
        } catch (error) {
            console.log(error);
            setChatHistory([
                ...chatHistory,
                {
                    message: input,
                    sent: true,
                },
                {
                    message: "There was an error. Please try again later.",
                    sent: false,
                }
            ]);
            setInput('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative rounded-md shadow-sm flex-1/3">
            <input
                type="text"
                name="input"
                id="input"
                className="block w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-indigo-500 transition duration-150 ease-in-out"
                placeholder="Send a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key==="Enter"&&input.trim()!='') {
                        handleGenerate();
                    }
                }}
                disabled={loading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none z-30">
                <button
                    onClick={handleGenerate}
                    style={{
                        opacity: input.trim()!=''? 1:0.5,
                    }}
                    disabled={input.trim()==''}
                >
                    {!loading? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="blue"
                            strokeWidth="2"
                            className="w-6 h-6 text-black"
                        >
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    ):(
                        <svg
                            className="animate-spin h-7 w-7 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="orange"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="blue"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="blue"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}

export default InputArea;