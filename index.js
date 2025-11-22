// Enhanced Express server for Women's Safety Agent MVP
const express = require('express');
const fs = require('fs');
const path = require('path');
const templatesPath = path.join(__dirname, 'templates.json');
const templates = () => JSON.parse(fs.readFileSync(templatesPath));
const saveTemplates = (data) => fs.writeFileSync(templatesPath, JSON.stringify(data, null, 2));
const { classify } = require('./classifier');
// Twilio scaffolding (requires TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER in env)
const twilioAvailable = !!(process.env.TWILIO_SID && process.env.TWILIO_TOKEN && process.env.TWILIO_NUMBER);
let twilioClient = null;
if (twilioAvailable) {
  const twilio = require('twilio');
  twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
}

const app = express();
app.use(express.json());

// Simple CORS for local demo
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  next();
});

// Public endpoints
app.get('/templates', (req,res) => {
  res.json(templates());
});

app.post('/templates', (req,res) => {
  // Admin endpoint to overwrite templates (in prod require auth)
  const data = req.body;
  try {
    saveTemplates(data);
    res.json({ok:true, count: data.length});
  } catch (e) {
    res.status(500).json({ok:false, error: e.message});
  }
});

app.post('/message', (req, res) => {
  const { text } = req.body;
  const level = classify(text || '');
  const lower = (text || '').toLowerCase();
  let match = templates().find(t => t.level === level && t.keywords && t.keywords.some(k => lower.includes(k)));
  if (!match) match = templates().find(t => t.level === level);
  const response = match ? match.template : templates()[0].template;
  res.json({ level, response, id: match ? match.id : null });
});

app.post('/panic', (req, res) => {
  const panic = {
    title: "Panic Mode Activated",
    steps:[
      "I\'m here with you. Take a slow breath: in 4, out 4.",
      "If possible, move to a public or well-lit area.",
      "Call or message a trusted contact now. If you feel in immediate danger, contact local emergency services."
    ]
  };
  res.json({panic});
});

// Twilio: send draft SOS (only if user provides 'to' phone number and consents)
app.post('/send_sos', async (req, res) => {
  const { to, message } = req.body;
  if (!to || !message) return res.status(400).json({ok:false, error:'missing to or message'});
  if (!twilioAvailable) return res.status(500).json({ok:false, error:'Twilio not configured. Set TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER.'});
  try {
    const msg = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_NUMBER,
      to
    });
    res.json({ok:true, sid: msg.sid});
  } catch (e) {
    res.status(500).json({ok:false, error: e.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server listening on', PORT));
