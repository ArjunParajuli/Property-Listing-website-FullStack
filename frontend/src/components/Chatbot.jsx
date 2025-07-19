import React, { useState, useRef, useEffect } from "react";
import './Chatbot.css';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you with RentMe today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/v1/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.response || "Sorry, I couldn't get a response." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-widget">
      {open ? (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>RentMe Chatbot</span>
            <button className="chatbot-close" onClick={() => setOpen(false)}>&times;</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg chatbot-msg-${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-send" disabled={loading || !input.trim()}>
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      ) : (
        <button className="chatbot-fab" onClick={() => setOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
