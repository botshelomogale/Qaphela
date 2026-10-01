import './WarningCard.css'

function WarningCard({ result, isError }) {
  if (isError) {
    return (
      <div className="warning-card error-card">
        <div className="card-header">
          <h3>⚠️ Error</h3>
        </div>
        <p className="error-message">{result.error}</p>
      </div>
    )
  }

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'high':
        return '🚨'
      case 'medium':
        return '⚠️'
      case 'low':
        return '✅'
      default:
        return '❓'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high':
        return 'risk-high'
      case 'medium':
        return 'risk-medium'
      case 'low':
        return 'risk-low'
      default:
        return ''
    }
  }

  const getScamTypeLabel = (type) => {
    const labels = {
      'job_scam': 'Job Scam',
      'phishing': 'Phishing',
      'romance_scam': 'Romance Scam',
      'fake_offer': 'Fake Offer',
      'money_request': 'Money Request Scam'
    }
    return labels[type] || type
  }

  return (
    <div className={`warning-card ${getRiskColor(result.risk)}`}>
      <div className="card-header">
        <h3>
          {getRiskIcon(result.risk)} {result.risk.toUpperCase()} RISK
        </h3>
        <span className="type-badge">{getScamTypeLabel(result.type)}</span>
      </div>

      <div className="card-content">
        <div className="reason-section">
          <h4>Why Qaphela flagged this:</h4>
          <p className="reason">{result.reason}</p>
        </div>

        {result.red_flags && result.red_flags.length > 0 && (
          <div className="flags-section">
            <h4>Red flags detected:</h4>
            <ul className="flags-list">
              {result.red_flags.map((flag, idx) => (
                <li key={idx}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="confidence-section">
          <p className="confidence-label">Confidence:</p>
          <div className="confidence-bar">
            <div 
              className="confidence-fill"
              style={{ 
                width: `${result.confidence * 100}%`,
                backgroundColor: 
                  result.confidence >= 0.7 ? 'var(--primary)' :
                  result.confidence >= 0.4 ? 'var(--warning)' :
                  'var(--success)'
              }}
            />
          </div>
          <p className="confidence-value">{Math.round(result.confidence * 100)}%</p>
        </div>
      </div>

      <div className="card-actions">
        <div className={`action-box action-${result.risk}`}>
          <h4>What should you do?</h4>
          {result.risk === 'high' && (
            <ul>
              <li>❌ Do NOT click any links</li>
              <li>❌ Do NOT share personal information</li>
              <li>❌ Do NOT send money</li>
              <li>✅ Block the sender immediately</li>
              <li>✅ Report to relevant authorities</li>
              <li>✅ Delete the message</li>
            </ul>
          )}
          {result.risk === 'medium' && (
            <ul>
              <li>⏱️ Be cautious and verify independently</li>
              <li>🔍 Check official websites or phone numbers</li>
              <li>❓ Ask someone you trust</li>
              <li>❌ Don't click suspicious links</li>
              <li>❌ Don't share sensitive info via message</li>
            </ul>
          )}
          {result.risk === 'low' && (
            <ul>
              <li>✅ This message appears safe</li>
              <li>ℹ️ But always verify important requests</li>
              <li>🔒 Protect your personal information</li>
            </ul>
          )}
        </div>
      </div>

      {result.message_excerpt && (
        <div className="card-footer">
          <p className="excerpt-label">Message analyzed:</p>
          <p className="excerpt">{result.message_excerpt}</p>
        </div>
      )}
    </div>
  )
}

export default WarningCard
