function checkUrl(url, callback) {
    var apiKey = 'AIzaSyBaU9s5uH0tL-wWY1vBpOwIBW_OIxthwkA'; 
    var apiUrl = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=' + apiKey;
  
    var requestData = {
      client: {
        clientVersion: '1.0'
      },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{url: url}]
      }
    };
  
    var request = new XMLHttpRequest();
    request.open('POST', apiUrl, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var response = JSON.parse(request.responseText);
        var safe = response.matches.length === 0;
        callback(safe);
      }
    };
    request.send(JSON.stringify(requestData));
  }
  

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'check_url') {
         sendResponse({safe: safe});
    }
  });
  