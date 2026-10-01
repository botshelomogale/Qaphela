import { useState } from 'react'
import MessageChecker from './components/MessageChecker'
import WarningCard from './components/WarningCard'
import ScamLibrary from './components/ScamLibrary'
import './App.css'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('checker')

  const handleDetect = async (message) => {
    setLoading(true)
    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      })
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error detecting scam:', error)
      setResult({
        error: 'Failed to detect scam. Please try again.',
        message_excerpt: message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛡️ Qaphela</h1>
        <p className="tagline">Beware. Scam detection for vulnerable users.</p>
      </header>

      <nav className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'checker' ? 'active' : ''}`}
          onClick={() => setActiveTab('checker')}
        >
          Check Message
        </button>
        <button 
          className={`tab-btn ${activeTab === 'library' ? 'active' : ''}`}
          onClick={() => setActiveTab('library')}
        >
          Learn Scams
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'checker' && (
          <div className="checker-section">
            <MessageChecker 
              onDetect={handleDetect}
              loading={loading}
            />
            
            {result && (
              <WarningCard 
                result={result}
                isError={result.error}
              />
            )}
          </div>
        )}

        {activeTab === 'library' && (
          <ScamLibrary />
        )}
      </main>

      <footer className="app-footer">
        <p>Qaphela helps protect vulnerable users from scams. Use responsibly.</p>
      </footer>
    </div>
  )
}

export default App
