import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function App(){
  const [messages, setMessages] = React.useState(['Try: "Driver changed route" or "I think someone is following me"']);
  const [text, setText] = React.useState('');
  const [showConsent, setShowConsent] = React.useState(false);
  const [sosNumber, setSosNumber] = React.useState('');

  async function send(){
    if(!text) return;
    setMessages(prev => [`You: ${text}`, ...prev]);
    const resp = await fetch('/message',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})});
    const j = await resp.json();
    setMessages(prev => [`Agent (${j.level}): ${j.response}`, ...prev]);
    setText('');
  }

  async function panic(){
    setMessages(prev => ['You pressed Panic', ...prev]);
    const resp = await fetch('/panic',{method:'POST'});
    const j = await resp.json();
    setMessages(prev => [`Panic: ${j.panic.steps.join(' | ')}`, ...prev]);
  }

  function openSos(){
    setShowConsent(true);
  }

  async function sendSos(){
    // consent modal collects sosNumber and send message
    if(!sosNumber) {
      alert('Enter phone number (E.164) to send SOS.');
      return;
    }
    const message = "I need help. Please call me.";
    const resp = await fetch('/send_sos', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({to: sosNumber, message})});
    const j = await resp.json();
    if(j.ok) alert('SOS sent (sid: '+j.sid+')');
    else alert('Failed to send SOS: '+ (j.error || 'unknown'));
    setShowConsent(false);
  }

  return (
    React.createElement('div', {className:'app'},
      React.createElement('h2', null, "Women's Safety Agent — Full React App"),
      React.createElement('div', {className:'chat', id:'messages'}, messages.map((m,i)=>React.createElement('div',{key:i, style:{marginBottom:8}}, m))),
      React.createElement('div',{className:'controls'},
        React.createElement('input',{value:text, onChange:e=>setText(e.target.value), placeholder:'Describe your situation...'}),
        React.createElement('button',{onClick:send},'Send'),
        React.createElement('button',{onClick:panic, className:'panic'}, 'Panic'),
        React.createElement('button',{onClick:openSos},'Send SOS')
      ),
      showConsent && React.createElement('div',{className:'modal'},
        React.createElement('div',{className:'box'},
          React.createElement('h3',null,'Send SOS — Consent'),
          React.createElement('p',null,'You are about to send an SMS SOS to a trusted contact. Do you consent to send this message now?'),
          React.createElement('input',{placeholder:'+911234567890', value:sosNumber, onChange:e=>setSosNumber(e.target.value), style:{width:'100%', padding:8, marginBottom:8}}),
          React.createElement('div',{style:{display:'flex', gap:8, justifyContent:'flex-end'}},
            React.createElement('button',{onClick:()=>setShowConsent(false)}, 'Cancel'),
            React.createElement('button',{onClick:sendSos}, 'Send SOS')
          )
        )
      )
    )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
