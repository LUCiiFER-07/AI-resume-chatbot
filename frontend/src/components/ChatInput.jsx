import { useState, useRef, useEffect } from 'react'
import './ChatInput.css'

export default function ChatInput({ onSendMessage, isLoading, isDisabled }) {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  // Auto-expand textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const handleSend = () => {
    const trimmedInput = input.trim()
    if (!trimmedInput || isLoading || isDisabled) return

    onSendMessage(trimmedInput)
    setInput('')

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    // Send on Enter, new line on Shift+Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isInputEmpty = !input.trim()

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about my experience, skills, projects..."
          disabled={isLoading || isDisabled}
          className="chat-textarea"
          rows="1"
          aria-label="Message input"
        />
        <button
          onClick={handleSend}
          disabled={isInputEmpty || isLoading || isDisabled}
          className="send-button"
          title={isLoading ? 'Processing...' : isInputEmpty ? 'Enter a message' : 'Send message'}
          aria-label="Send message"
        >
          {isLoading ? (
            <span className="send-icon loading">⟳</span>
          ) : (
            <span className="send-icon">→</span>
          )}
        </button>
      </div>
      {isDisabled && (
        <div className="input-notice">
          Backend is not available. Please start the server.
        </div>
      )}
    </div>
  )
}
