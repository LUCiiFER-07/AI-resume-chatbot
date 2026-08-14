import './Header.css'

export default function Header({ isOnline }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">AI Resume Assistant</h1>
        <div className={`status ${isOnline ? 'online' : 'offline'}`}>
          <span className="status-dot"></span>
          <span className="status-text">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
    </header>
  )
}
