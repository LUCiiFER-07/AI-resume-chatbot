import './WelcomeScreen.css'

export default function WelcomeScreen({ onSuggestedQuestion }) {
  const suggestedQuestions = [
    'What are your technical skills?',
    'Tell me about your projects',
    'What is your educational background?',
    'Do you have internship experience?',
    'What programming languages do you know?',
    'Tell me about your work experience',
  ]

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h2 className="welcome-title">Welcome to my AI Assistant</h2>
        <p className="welcome-subtitle">
          Ask me anything about my professional background, experience, skills, projects, or
          education.
        </p>

        <div className="welcome-topics">
          <div className="topic-item">
            <span className="topic-icon">💼</span>
            <span>Experience</span>
          </div>
          <div className="topic-item">
            <span className="topic-icon">🛠️</span>
            <span>Skills</span>
          </div>
          <div className="topic-item">
            <span className="topic-icon">🎓</span>
            <span>Education</span>
          </div>
          <div className="topic-item">
            <span className="topic-icon">🚀</span>
            <span>Projects</span>
          </div>
        </div>

        <div className="suggested-questions">
          <p className="suggested-label">Suggested questions:</p>
          <div className="questions-grid">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="suggestion-button"
                onClick={() => onSuggestedQuestion(question)}
                aria-label={`Ask: ${question}`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
