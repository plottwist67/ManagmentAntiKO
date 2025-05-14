(function verifyIP() {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const userIP = data.ip;

      fetch('ips.txt')
        .then(response => response.text())
        .then(text => {
          const ipList = text.split('\n').map(ip => ip.trim());

          if (!ipList.includes(userIP)) {
            console.log('Ваш IP не найден в списке.');
            setTimeout(() => {
              document.body.style.userSelect = 'none';
              document.body.style.pointerEvents = 'none';
              window.location.href = 'dontmatchIP.html';
            }, 0);
          } else {
            console.log('Ваш IP найден в списке.');
            detecter();
          }
        })
        .catch(err => console.error('Error IP:', err));
    })
    .catch(err => console.error('Error getting IP:', err));
})();

function detecter(){
  let back = false;
  document.addEventListener('keydown', function(e) {
    if ((e.key === 'PrintScreen' || e.code === 'PrintScreen') && !back) {
      window.location.href = 'anotherPage.html';
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Shift' && !back) {
      window.location.href = 'anotherPage.html';
    }
  });

  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden' && !back) {
      window.location.href = 'anotherPage.html';
    }
  });

  window.addEventListener('blur', function() {
    if(!back)
    window.location.href = 'anotherPage.html';
  });

  document.addEventListener('mouseup', function() {
    const selection = window.getSelection().toString();
    if (selection && !back) {
      window.location.href = 'anotherPage.html';
    }
  });

  document.addEventListener('copy', function(e) {
    if(!back)
    e.preventDefault();
    window.location.href = 'anotherPage.html';
  });

  document.addEventListener('click', function(e) {
    const target = e.target;

    const isBadType = target.nodeType === Node.TEXT_NODE || target.tagName == 'IMG';
    const isBackButton = target.tagName == 'A' && target.classList.contains('back-to-home');

    if (isBadType && !back) {
      window.location.href = 'anotherPage.html';
    } else if (isBackButton) {
      back = true;
    }
  });

  document.addEventListener('selectionchange', function() {
    const selection = window.getSelection().toString();
    if (selection && !back) {
      window.location.href = 'anotherPage.html';
    }
  });
}