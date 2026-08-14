import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import WelcomeScreen from './components/WelcomeScreen'
import { apiService } from './services/api'

export default function App() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isOnline, setIsOnline] = useState(false)
  const [backendUnavailable, setBackendUnavailable] = useState(false)

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth()
    const healthCheckInterval = setInterval(checkBackendHealth, 30000) // Check every 30s
    return () => clearInterval(healthCheckInterval)
  }, [])

  const checkBackendHealth = async () => {
    const isHealthy = await apiService.checkHealth()
    setIsOnline(isHealthy)
    setBackendUnavailable(!isHealthy)
  }

  const handleSendMessage = async (question) => {
    if (!question.trim()) return

    // Add user message
    const userMessage = { role: 'user', content: question }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      // Send to backend
      const response = await apiService.sendMessage(question)

      // Add assistant message
      const assistantMessage = { role: 'assistant', content: response.answer }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(err.message)
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setError(null)
  }

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question)
  }

  const hasMessages = messages.length > 0

  return (
    <div className="app">
      <Header isOnline={isOnline} />

      <div className="app-main">
        {!hasMessages ? (
          <WelcomeScreen onSuggestedQuestion={handleSuggestedQuestion} />
        ) : (
          <ChatWindow messages={messages} isLoading={isLoading} error={error} />
        )}

        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isDisabled={backendUnavailable}
        />
      </div>

      {hasMessages && (
        <button className="new-chat-button" onClick={handleNewChat} title="Start a new conversation">
          New Chat
        </button>
      )}
    </div>
  )
}
