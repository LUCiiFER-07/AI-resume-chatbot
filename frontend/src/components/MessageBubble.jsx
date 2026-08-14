import './MessageBubble.css'

export default function MessageBubble({ role, content, message }) {
  // Support both possible data formats:
  // 1. { role, content }
  // 2. { message: { role, content } }

  const actualRole = message?.role ?? role
  const actualContent = message?.content ?? content ?? ''

  const isUser = actualRole === 'user'

  // Simple markdown-like rendering
  const formatContent = (text) => {
    return text.split('\n').map((line, i) => {
      const trimmedLine = line.trim()

      if (trimmedLine === '') {
        return <div key={i} className="message-spacer" />
      }

      // Bullet points
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        return (
          <li key={i} className="message-list-item">
            {trimmedLine.replace(/^[•\-]\s*/, '')}
          </li>
        )
      }

      // Numbered points
      if (/^\d+\./.test(trimmedLine)) {
        return (
          <li key={i} className="message-list-item">
            {trimmedLine.replace(/^\d+\.\s*/, '')}
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

  const hasLists =
    actualContent.includes('•') ||
    actualContent.includes('-')

  return (
    <div className={`message-bubble message-${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <div className="message-label">
          AI Assistant
        </div>
      )}

      <div
        className={
          hasLists && !isUser
            ? 'message-content-with-lists'
            : 'message-content'
        }
      >
        {formatContent(actualContent)}
      </div>
    </div>
  )
}