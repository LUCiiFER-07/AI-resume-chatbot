import './TypingIndicator.css'

export default function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="typing-avatar">AI</div>
      <div className="typing-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  )
}
