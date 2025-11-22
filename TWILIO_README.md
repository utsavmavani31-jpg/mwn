Twilio integration (optional)
- Set these env vars in server/.env or your host:
  TWILIO_SID=your_twilio_sid
  TWILIO_TOKEN=your_twilio_auth_token
  TWILIO_NUMBER=+1234567890
- The endpoint POST /send_sos accepts JSON: { "to": "+911234567890", "message": "Your message" }
- This repo does NOT auto-send SMS without explicit user action.
