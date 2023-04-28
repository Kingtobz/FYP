const Activate = document.getElementById('Activate');
if (Activate) {
Activate.addEventListener( 'onmouseover', function(e) {
  console.log(e.target)
    if (e.target.tagName === 'A') {
      
      var url = e.target.href;
      chrome.runtime.sendMessage({type: 'check_url', url: url}, function(response) {
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = e.clientY + 'px';
        popup.style.left = e.clientX + 'px';
        popup.style.background = response.safe ? 'green' : 'red';
        popup.style.color = 'white';
        popup.style.padding = '5px';
        popup.style.zIndex = '999999';
        popup.textContent = response.safe ? 'Safe' : 'Dangerous';
        Activate.body.appendChild(popup);
        setTimeout(function() {
          Activate.body.removeChild(popup);
        }, 2000);
      });
    }
  });
}

