const root = document.getElementById('root');
root.innerHTML = `
  <div class="app">
    <h2>Women's Safety Agent — React-style Demo</h2>
    <div class="chat" id="messages"><em>Try: "Driver changed route" or "I think someone is following me"</em></div>
    <div class="controls">
      <input id="text" placeholder="Describe your situation..." />
      <button id="send">Send</button>
      <button id="panic" class="panic">Panic</button>
    </div>
    <div style="margin-top:10px;color:#475569;font-size:13px">This is a lightweight static demo (no build). For full React, run a proper CRA/Vite setup.</div>
  </div>
`;
document.getElementById('send').onclick = async ()=>{
  const text = document.getElementById('text').value;
  if(!text) return;
  const m = document.getElementById('messages');
  m.innerHTML = '<div><strong>You:</strong> '+text+'</div>' + m.innerHTML;
  const resp = await fetch('/message',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})});
  const j = await resp.json();
  m.innerHTML = '<div><strong>Agent ('+j.level+'):</strong> '+j.response+'</div>' + m.innerHTML;
}
document.getElementById('panic').onclick = async ()=>{
  const m = document.getElementById('messages');
  m.innerHTML = '<div><strong>You pressed Panic</strong></div>'+m.innerHTML;
  const resp = await fetch('/panic',{method:'POST'});
  const j = await resp.json();
  m.innerHTML = '<div><strong>Panic:</strong> '+j.panic.steps.join(' | ')+'</div>' + m.innerHTML;
}
