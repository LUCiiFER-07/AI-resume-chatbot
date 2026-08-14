import './MessageBubble.css'

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`message-bubble ${role}`}>
      {!isUser && <div className="message-avatar">AI</div>}
      <div className="message-content">
        {!isUser && <div className="message-label">Assistant</div>}
        <p className="message-text">{content}</p>
      </div>
    </div>
  )
}
import './MessageBubble.css'

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  // Simple markdown-like rendering for common patterns
  const formatContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.trim() === '') return null
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <li key={i} className="message-list-item">
            {line.replace(/^[•\-]\s*/, '')}
          </li>
        )
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={i} className="message-list-item">
            {line.replace(/^\d+\.\s*/, '')}
          </li>
        )
      }
      return (
        <p key={i} className="message-paragraph">
          {line}
        </p>
      )
    })
  }

  const hasLists = message.content.includes('•') || message.content.includes('-')

  return (
    <div className={`message-bubble message-${isUser ? 'user' : 'assistant'}`}>
      {!isUser && <div className="message-label">AI Assistant</div>}
      <div className={hasLists && !isUser ? 'message-content-with-lists' : 'message-content'}>
        {formatContent(message.content)}
      </div>
    </div>
  )
}
