import json
import re
from typing import Dict, List

class ScamDetector:
    def __init__(self):
        self.patterns = self._load_patterns()
    
    def _load_patterns(self) -> Dict:
        """Load scam patterns from JSON"""
        try:
            with open('scams.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print("Warning: scams.json not found, using defaults")
            return self._get_default_patterns()
    
    def _get_default_patterns(self) -> Dict:
        """Fallback patterns if JSON not found"""
        return {
            "job_scams": [],
            "phishing": [],
            "romance_scams": [],
            "fake_offers": [],
            "money_requests": []
        }
    
    def detect(self, message: str) -> Dict:
        """Detect scam type and return risk assessment"""
        message_lower = message.lower()
        scores = {}
        
        # Run all detectors
        scores['job_scam'] = self._detect_job_scam(message_lower)
        scores['phishing'] = self._detect_phishing(message_lower)
        scores['romance_scam'] = self._detect_romance_scam(message_lower)
        scores['fake_offer'] = self._detect_fake_offer(message_lower)
        scores['money_request'] = self._detect_money_request(message_lower)
        
        # Find highest risk
        risk_type = max(scores, key=scores.get)
        risk_score = scores[risk_type]
        
        # Determine risk level
        if risk_score >= 0.7:
            risk_level = "high"
        elif risk_score >= 0.4:
            risk_level = "medium"
        else:
            risk_level = "low"
        
        reason = self._generate_reason(message_lower, risk_type, risk_score)
        
        return {
            'risk': risk_level,
            'reason': reason,
            'type': risk_type,
            'confidence': round(risk_score, 2),
            'message_excerpt': message[:100] + ('...' if len(message) > 100 else ''),
            'red_flags': self._extract_red_flags(message_lower, risk_type)
        }
    
    def _detect_job_scam(self, msg: str) -> float:
        """Score likelihood of job scam (0-1)"""
        score = 0
        
        red_flags = [
            (r'\b(click here|apply now|urgent|immediate)\b', 0.2),
            (r'\b(no experience|easy money|work from home|flexible hours)\b', 0.2),
            (r'\b(verify|confirm|personal details|bank account|ssn)\b', 0.2),
            (r'\b(upfront|payment|fee|deposit|processing)\b', 0.2),
            (r'\br\d+|usd\d+|€\d+', 0.15),  # Money amounts
        ]
        
        for pattern, points in red_flags:
            if re.search(pattern, msg):
                score += points
        
        # No company name = more suspicious
        if not re.search(r'\b(company|ltd|pty|corp|inc|limited|pvt)\b', msg):
            score += 0.15
        
        return min(score, 1.0)
    
    def _detect_phishing(self, msg: str) -> float:
        """Score likelihood of phishing"""
        score = 0
        
        red_flags = [
            (r'\b(verify|confirm|urgent|click|login|account)\b', 0.2),
            (r'\b(suspended|locked|compromised|confirm identity|urgent action)\b', 0.25),
            (r'(http|https|link|click here|www\.)', 0.2),
            (r'\b(act now|immediately|limited time|24 hours?)\b', 0.2),
        ]
        
        for pattern, points in red_flags:
            if re.search(pattern, msg):
                score += points
        
        # Mention of real banks (context matters)
        banks = r'\b(capitec|fnb|absa|standard bank|access bank|vodacom|airtime)\b'
        if re.search(banks, msg):
            score += 0.1
        
        return min(score, 1.0)
    
    def _detect_romance_scam(self, msg: str) -> float:
        """Score likelihood of romance scam"""
        score = 0
        
        emotional_words = [
            (r'\b(love|miss you|sweetheart|dear|honey|babe|angel)\b', 0.15),
            (r'\b(trust|forever|special|beautiful|darling)\b', 0.1),
        ]
        
        for pattern, points in emotional_words:
            if re.search(pattern, msg):
                score += points
        
        money_indicators = [
            (r'\b(bitcoin|crypto|ethereum|money|send|invest)\b', 0.3),
            (r'\b(emergency|urgent|hospital|accident|money problem)\b', 0.2),
            (r'\b(help me|save me|need money)\b', 0.2),
        ]
        
        for pattern, points in money_indicators:
            if re.search(pattern, msg):
                score += points
        
        return min(score, 1.0)
    
    def _detect_fake_offer(self, msg: str) -> float:
        """Score likelihood of fake offer"""
        score = 0
        
        red_flags = [
            (r'\b(won|congratulations|claim|prize|free|bonus|reward)\b', 0.25),
            (r'\b(click|verify|confirm|submit|claim now)\b', 0.2),
            (r'\b(limited|only today|now|hurry|act fast|expires)\b', 0.2),
            (r'\b(too good|unbelievable|amazing|incredible)\b', 0.15),
        ]
        
        for pattern, points in red_flags:
            if re.search(pattern, msg):
                score += points
        
        return min(score, 1.0)
    
    def _detect_money_request(self, msg: str) -> float:
        """Score likelihood of money request scam"""
        score = 0
        
        red_flags = [
            (r'\b(send|transfer|cash|deposit|pay|wire)\b', 0.2),
            (r'\b(urgent|emergency|help|crisis|now)\b', 0.2),
            (r'\b(loan|borrow|credit|advance)\b', 0.15),
            (r'\b(western union|moneygram|bitcoin|account|card)\b', 0.25),
            (r'\b(please|asap|quickly|immediately)\b', 0.1),
        ]
        
        for pattern, points in red_flags:
            if re.search(pattern, msg):
                score += points
        
        return min(score, 1.0)
    
    def _generate_reason(self, msg: str, risk_type: str, score: float) -> str:
        """Generate human-readable explanation"""
        reasons = {
            'job_scam': "Red flags: No real company name, urgency language, asking for personal details or upfront payment. Real jobs don't recruit this way.",
            'phishing': "Red flags: Fake bank message, asking to verify/confirm account, suspicious links. Real banks never ask for passwords by message.",
            'romance_scam': "Red flags: Quick emotional connection, asking for money or crypto. Be suspicious of strangers asking for money.",
            'fake_offer': "Red flags: 'Too good to be true' offers, urgency tactics, asking for personal info. Most 'free prizes' are scams.",
            'money_request': "Red flags: Stranger asking for money urgently, unusual payment method (Western Union, crypto). Verify through official channels."
        }
        
        return reasons.get(risk_type, "This message has suspicious elements. Be cautious and verify independently.")
    
    def _extract_red_flags(self, msg: str, risk_type: str) -> List[str]:
        """Extract specific red flags found in message"""
        flags = []
        
        general_flags = {
            'urgency': r'\b(urgent|immediately|now|asap|hurry|quickly)\b',
            'personal_request': r'\b(details|password|card|account|bank|verify)\b',
            'money_request': r'\b(send|transfer|pay|deposit|money|cash)\b',
            'suspicious_link': r'(http|click|www\.)',
            'emotional': r'\b(love|dear|sweetheart|trust)\b',
            'fake_offer': r'\b(won|claim|prize|free|bonus)\b',
        }
        
        if re.search(general_flags['urgency'], msg):
            flags.append('Urgency language detected')
        if re.search(general_flags['personal_request'], msg):
            flags.append('Asking for personal information')
        if re.search(general_flags['money_request'], msg):
            flags.append('Requesting money or payment')
        if re.search(general_flags['suspicious_link'], msg):
            flags.append('Contains suspicious link or URL')
        if re.search(general_flags['emotional'], msg):
            flags.append('Emotional manipulation tactics')
        if re.search(general_flags['fake_offer'], msg):
            flags.append('Unrealistic offers or prizes')
        
        return flags if flags else ['Review message carefully']
