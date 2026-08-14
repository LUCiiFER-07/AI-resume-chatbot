const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const apiService = {
  /**
   * Send a question to the chatbot
   * @param {string} question - The question to ask
   * @returns {Promise<{answer: string}>} - The AI response
   */
  async sendMessage(question) {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(
        error instanceof TypeError
          ? 'Unable to connect to the AI assistant. Please make sure the backend is running.'
          : error.message
      )
    }
  },

  /**
   * Check if backend is available
   * @returns {Promise<boolean>}
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
      })
      return response.ok
    } catch {
      return false
    }
  },
}
