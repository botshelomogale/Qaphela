import { useState } from 'react'
import './ScamLibrary.css'

function ScamLibrary() {
  const [expandedScam, setExpandedScam] = useState(null)

  const scams = [
    {
      id: 'job_scam_1',
      type: 'Job Scam',
      icon: '💼',
      title: 'Fake IT Job Offer',
      example: 'Hi, we need you for urgent IT work. Click here to apply and get R5000. Fast process. Pm your details.',
      redFlags: [
        'No company name mentioned',
        'Urgency language ("urgent")',
        'Asks for personal details upfront',
        'Too good to be true salary'
      ],
      whatToDo: [
        'Real companies have websites and official applications',
        'Never pay upfront processing fees',
        'Research the company independently',
        'Ask for official contact details'
      ]
    },
    {
      id: 'phishing_1',
      type: 'Phishing',
      icon: '🎣',
      title: 'Bank Account Verification',
      example: 'URGENT: Your Capitec account has been locked. Click here to verify your identity immediately.',
      redFlags: [
        'Urgency and threats',
        'Asking to verify account/password',
        'Suspicious links',
        'Impersonating legitimate bank'
      ],
      whatToDo: [
        'Banks never ask for passwords via SMS/email',
        'Go directly to the official website',
        'Call the bank using official number',
        'Report suspicious messages to the bank'
      ]
    },
    {
      id: 'romance_1',
      type: 'Romance Scam',
      icon: '💔',
      title: 'Stranger in Need',
      example: 'Sweetheart, I\'m stuck abroad and need R2000 for a ticket home. Please help, I love you.',
      redFlags: [
        'Quick emotional attachment',
        'Money request after short time',
        'Isolation tactics (can\'t meet)',
        'Cryptocurrency or wire transfer requests'
      ],
      whatToDo: [
        'Be suspicious of strangers asking for money',
        'Never send money to people you haven\'t met',
        'Verify through video call (not just chat)',
        'Ask family/friends for advice'
      ]
    },
    {
      id: 'fake_offer_1',
      type: 'Fake Offer',
      icon: '🎁',
      title: 'Prize Scam',
      example: 'Congratulations! You\'ve won R100,000! Click to claim your prize today.',
      redFlags: [
        'You never entered any contest',
        'Urgency to claim',
        'Asks for personal/payment information',
        'Too good to be true'
      ],
      whatToDo: [
        'If you didn\'t enter, it\'s probably fake',
        'Real prizes don\'t need upfront payments',
        'Check official sources',
        'Don\'t click links from unknown senders'
      ]
    },
    {
      id: 'money_request_1',
      type: 'Money Request',
      icon: '💰',
      title: 'Emergency Cash Request',
      example: 'Hi cuz, emergency at home. Need you to deposit R1000 to this account immediately.',
      redFlags: [
        'Urgency and panic',
        'Unusual payment method (Western Union, Bitcoin)',
        'From unknown or spoofed number',
        'Asking to keep it secret'
      ],
      whatToDo: [
        'Call the person directly (use known number)',
        'Verify the emergency through other means',
        'Don\'t rush into sending money',
        'Ask specific questions about the situation'
      ]
    },
    {
      id: 'job_scam_2',
      type: 'Job Scam',
      icon: '💼',
      title: 'Work From Home Scheme',
      example: 'Work from home, no experience needed. R3000 per week guaranteed. Click to start immediately.',
      redFlags: [
        'No experience needed for high pay',
        'Too flexible and easy',
        'Guaranteed income claims',
        'Asks for money upfront'
      ],
      whatToDo: [
        'Research the company thoroughly',
        'Real jobs require interviews',
        'Beware of upfront processing fees',
        'Check employment websites (LinkedIn, Indeed)'
      ]
    }
  ]

  const toggleScam = (id) => {
    setExpandedScam(expandedScam === id ? null : id)
  }

  return (
    <div className="scam-library">
      <div className="library-intro">
        <h2>Learn the Scams</h2>
        <p>Understanding common scam patterns helps you protect yourself. Here are real examples of scams Blessing and others face.</p>
      </div>

      <div className="scam-grid">
        {scams.map((scam) => (
          <div 
            key={scam.id}
            className={`scam-card ${expandedScam === scam.id ? 'expanded' : ''}`}
          >
            <button
              className="scam-header-btn"
              onClick={() => toggleScam(scam.id)}
            >
              <div className="scam-header">
                <span className="scam-icon">{scam.icon}</span>
                <div className="scam-title-area">
                  <span className="scam-type">{scam.type}</span>
                  <h3>{scam.title}</h3>
                </div>
              </div>
              <span className="expand-icon">{expandedScam === scam.id ? '−' : '+'}</span>
            </button>

            {expandedScam === scam.id && (
              <div className="scam-details">
                <div className="example-section">
                  <h4>Real example:</h4>
                  <div className="example-text">"{scam.example}"</div>
                </div>

                <div className="flags-section">
                  <h4>🚩 Red flags to watch for:</h4>
                  <ul>
                    {scam.redFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>

                <div className="action-section">
                  <h4>✅ What you should do:</h4>
                  <ul>
                    {scam.whatToDo.map((action, idx) => (
                      <li key={idx}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="library-footer">
        <div className="protection-tips">
          <h3>General Protection Tips</h3>
          <div className="tips-grid">
            <div className="tip">
              <div className="tip-icon">🔒</div>
              <h4>Protect Your Information</h4>
              <p>Never share passwords, PINs, or personal details via SMS or email.</p>
            </div>
            <div className="tip">
              <div className="tip-icon">🤔</div>
              <h4>Think Before You Click</h4>
              <p>Scammers use urgency. Take time to verify through official channels.</p>
            </div>
            <div className="tip">
              <div className="tip-icon">👥</div>
              <h4>Ask Someone You Trust</h4>
              <p>If something feels wrong, ask a friend, family, or official authority.</p>
            </div>
            <div className="tip">
              <div className="tip-icon">📞</div>
              <h4>Verify Independently</h4>
              <p>Call companies using official numbers, not numbers in suspicious messages.</p>
            </div>
          </div>
        </div>

        <div className="report-section">
          <h3>Report Scams</h3>
          <p>If you've been targeted by a scam, report it:</p>
          <ul className="report-links">
            <li><strong>South Africa:</strong> SMS FRAUD to 32833 or contact your bank</li>
            <li><strong>Email/Phishing:</strong> Report to ReportPhishing@fnb.co.za</li>
            <li><strong>WhatsApp/Messaging:</strong> Block sender and report through app</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ScamLibrary
