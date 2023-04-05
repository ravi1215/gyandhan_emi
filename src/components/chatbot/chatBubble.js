const ChatBubble=({ message, sent }) => {
    return (
        <div
            className={`w-full flex items-start my-6 ${sent? "justify-end":"justify-start"}`}
        >
            <div
                className={`flex flex-col items-start justify-start p-3 md:p-4 rounded-xl  max-w-xl ${sent
                    ? "rounded-tr-none bg-blue-500"
                    :"rounded-tl-none bg-blue-100"
                    }`}
            >
                <p className="text-sm md:text-base leading-normal text-gray-900">{message}</p>
            </div>
        </div>
    );
};

export default ChatBubble;
