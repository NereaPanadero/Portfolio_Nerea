import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { generateResponse, getSuggestedQuestions, detectLanguage } from '../../utils/chatbotEngine';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Initialize with welcome message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {
                setMessages([
                    {
                        text: "Hi! 👋 I'm Nerea's virtual assistant. I can tell you about her projects, experience, achievements and more. What would you like to know?",
                        isUser: false,
                        timestamp: new Date()
                    }
                ]);
            }, 300);
        }
    }, [isOpen]);

    const handleSendMessage = async (messageText) => {
        if (!messageText.trim()) return;

        const userMessage = {
            text: messageText,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Detect language from user message
        const detectedLang = detectLanguage(messageText);
        setCurrentLang(detectedLang);

        // Simulate thinking time for more natural feel
        setTimeout(() => {
            const response = generateResponse(messageText);
            setIsTyping(false);

            setMessages(prev => [
                ...prev,
                {
                    text: response.text,
                    isUser: false,
                    timestamp: new Date()
                }
            ]);
        }, 800 + Math.random() * 400); // Random delay between 800-1200ms
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };

    const handleSuggestedQuestion = (question) => {
        handleSendMessage(question);
    };

    const suggestedQuestions = getSuggestedQuestions(currentLang);

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open chatbot"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Sparkles size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">Ask me about Nerea</h3>
                                <p className="text-xs text-white/80">AI Assistant</p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-gradient-to-b from-neutral-50 to-white">
                            {messages.map((msg, idx) => (
                                <ChatMessage
                                    key={idx}
                                    message={msg.text}
                                    isUser={msg.isUser}
                                    isTyping={false}
                                />
                            ))}
                            {isTyping && <ChatMessage isTyping={true} />}

                            {/* Suggested Questions */}
                            {messages.length <= 1 && !isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-2"
                                >
                                    <p className="text-xs text-neutral-500 mb-2 px-2">
                                        {currentLang === 'es' ? 'Preguntas sugeridas:' : 'Suggested questions:'}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedQuestions.slice(0, 3).map((question, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSuggestedQuestion(question)}
                                                className="text-xs bg-white border border-purple-200 text-purple-600 px-3 py-1.5 rounded-full hover:bg-purple-50 transition-colors"
                                            >
                                                {question}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-neutral-200 p-4 bg-white">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={currentLang === 'es' ? 'Escribe tu pregunta...' : 'Type your question...'}
                                    className="flex-1 px-4 py-2 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                    disabled={isTyping}
                                />
                                <button
                                    onClick={() => handleSendMessage(inputValue)}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Send message"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
