// classifier.js - simple keyword-based classifier
const urgentWords = [/\bhelp\b/i, /\bchase\b/i, /\bfollow(ed)?\b/i, /\battack\b/i, /\bbreak\s?in\b/i, /\bcall\s+911\b/i, /\bgun\b/i, /\bknife\b/i];
const elevatedWords = [/route/i, /driver/i, /scared/i, /stalking/i, /creep/i, /noise/i, /door/i];

function classify(text){
  if (!text || typeof text !== 'string') return 'normal';
  for (const r of urgentWords) if (r.test(text)) return 'urgent';
  let elevCount = 0;
  for (const r of elevatedWords) if (r.test(text)) elevCount++;
  if (elevCount >= 1) return 'elevated';
  return 'normal';
}

module.exports = { classify };
