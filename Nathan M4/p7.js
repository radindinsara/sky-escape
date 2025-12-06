function loadP7() {
  // keys used in the workflow doc: assume endGame saved 'finalRole','finalScore','finalMessage','playerName'
  const player = localStorage.getItem('playerName') || 'Player';
  const role   = localStorage.getItem('finalRole')   || localStorage.getItem('playerRole') || '—';
  const score  = localStorage.getItem('finalScore')  || '—';
  const message = localStorage.getItem('finalMessage') || '—';

  document.getElementById('p7-player').textContent = player;
  document.getElementById('p7-role').textContent   = role;
  document.getElementById('p7-score').textContent  = score;
  document.getElementById('p7-message').textContent= message;
}

document.addEventListener('click', function (e) {
  if (!e.target) return;


