import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const AI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');

    const prompt = input;
    try {
      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      setMessages((prev) => [
        ...prev,
        { text: geminiResponse, isUser: false },
      ]);
    } catch (error) {
      console.error('Error with Gemini API:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Error with the Gemini API.', isUser: false },
      ]);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#D6EFD8] via-[#80AF81] to-[#508D4E]">
      {/* Left Decorative Bar */}
      <div className="hidden lg:block lg:w-1/6 bg-gradient-to-b from-[#80AF81] to-[#508D4E]"></div>

      {/* Main Chatbot Area */}
      <div className="flex-1 flex flex-col h-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white"> 
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg p-3 max-w-xs text-sm shadow-md ${
                  message.isUser ? 'bg-[#1A5319] text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-100">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-l-lg p-4 text-lg"
              placeholder="Type a message..."
              style={{
                backgroundColor: '#80AF81', // Medium green
                color: '#ffffff', // White text color
                borderColor: '#1A5319', // Dark green border color
                borderWidth: '2px',
              }}
            />
            <button
              type="submit"
              className="bg-[#1A5319] text-white rounded-r-lg px-6 py-4 text-lg hover:bg-[#2A6B2A] transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Right Decorative Bar */}
      <div className="hidden lg:block lg:w-1/6 bg-gradient-to-b from-[#80AF81] to-[#508D4E]"></div>
    </div>
  );
};

export default AI;
