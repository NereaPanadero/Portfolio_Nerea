import { motion } from 'framer-motion';

export default function ChatMessage({ message, isUser, isTyping }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
        >
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white/80 backdrop-blur-sm text-ink border border-neutral-200'
                    }`}
            >
                {isTyping ? (
                    <div className="flex gap-1 items-center py-1">
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></span>
                    </div>
                ) : (
                    <div className="text-sm leading-relaxed whitespace-pre-line">
                        {message.split('\n').map((line, i) => {
                            // Handle bold text **text**
                            if (line.includes('**')) {
                                const parts = line.split('**');
                                return (
                                    <p key={i} className="mb-1 last:mb-0">
                                        {parts.map((part, j) =>
                                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                                        )}
                                    </p>
                                );
                            }
                            // Handle bullet points
                            if (line.startsWith('• ')) {
                                return (
                                    <li key={i} className="ml-4 mb-1">
                                        {line.substring(2)}
                                    </li>
                                );
                            }
                            // Handle numbered lists
                            if (/^\d+\./.test(line)) {
                                return (
                                    <p key={i} className="mb-1">
                                        {line}
                                    </p>
                                );
                            }
                            // Regular text
                            return line ? (
                                <p key={i} className="mb-1 last:mb-0">
                                    {line}
                                </p>
                            ) : null;
                        })}
                    </div>
                )}
                {!isTyping && (
                    <div className={`text-[10px] mt-1 ${isUser ? 'text-white/70' : 'text-neutral-500'}`}>
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
