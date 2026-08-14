import { useEffect, useRef } from 'react'
import './ChatWindow.css'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

export default function ChatWindow({ messages, isLoading, error }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.map((message, index) => (
          <MessageBubble key={index} role={message.role} content={message.content} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <div className="error-content">
              <div className="error-title">Something went wrong</div>
              <div className="error-text">{error}</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
