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

    if (e.target.id === 'p7-play-again') {
    // reset or keep name/role, but start game path again
    // if you prefer to preserve role: call showPage(3) so player can Start Game again
    showPage(3);
  }

  if (e.target.id === 'p7-back-home') {
    // go back to start screen
    showPage(1);
  }

  if (e.target.id === 'p7-download-readme') {
    // generate a small README summary on the fly and trigger download
    const player = localStorage.getItem('playerName') || 'Player';
    const role   = localStorage.getItem('finalRole') || localStorage.getItem('playerRole') || '—';
    const score  = localStorage.getItem('finalScore') || '—';
    const message = localStorage.getItem('finalMessage') || '—';


