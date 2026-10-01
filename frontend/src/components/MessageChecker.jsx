import { useState } from 'react'
import './MessageChecker.css'

function MessageChecker({ onDetect, loading }) {
  const [message, setMessage] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleChange = (e) => {
    const text = e.target.value
    setMessage(text)
    setCharCount(text.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onDetect(message)
    }
  }

  const handleClear = () => {
    setMessage('')
    setCharCount(0)
  }

  const exampleMessages = [
    "Hi, we need you for urgent IT work. Click here to apply and get R5000. Fast process.",
    "Congratulations! You've won R100,000! Click to claim your prize today.",
    "Sweetheart, I'm stuck abroad and need R2000 for a ticket home. Please help, I love you."
  ]

  return (
    <div className="message-checker">
      <div className="checker-card">
        <h2>Paste a message or SMS</h2>
        <p className="instruction">
          Received a suspicious message? Paste it here and Qaphela will check for scam patterns.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <textarea
              value={message}
              onChange={handleChange}
              placeholder="Paste the message here... (SMS, WhatsApp, email, etc.)"
              className="message-input"
              rows="6"
              disabled={loading}
            />
            <div className="char-counter">
              {charCount} characters
            </div>
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!message.trim() || loading}
            >
              {loading ? 'Checking...' : '🛡️ Check Message'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleClear}
              disabled={!message || loading}
            >
              Clear
            </button>
          </div>
        </form>

        <div className="examples">
          <p className="examples-label">Example scams:</p>
          <div className="example-list">
            {exampleMessages.map((example, idx) => (
              <button
                key={idx}
                className="example-btn"
                onClick={() => {
                  setMessage(example)
                  setCharCount(example.length)
                }}
                disabled={loading}
              >
                <span className="example-preview">{example.substring(0, 50)}...</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageChecker
