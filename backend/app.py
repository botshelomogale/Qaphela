from flask import Flask, request, jsonify
from flask_cors import CORS
from scam_detector import ScamDetector
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

detector = ScamDetector()

@app.route('/api/detect', methods=['POST'])
def detect_scam():
    """Main detection endpoint"""
    try:
        data = request.json
        message = data.get('message', '').strip()
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        
        result = detector.detect(message)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'service': 'qaphela-detector'}), 200

@app.route('/api/scam-types', methods=['GET'])
def scam_types():
    """Return available scam types"""
    return jsonify({
        'types': [
            'job_scam',
            'phishing',
            'romance_scam',
            'fake_offer',
            'money_request'
        ]
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, port=port)
