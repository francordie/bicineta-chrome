let changeColor = document.getElementById('change-color');
let addLink = document.getElementById('add-link')

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});


changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {
					code: 'document.body.style.backgroundColor = "' + color + '";' +
					'msg = "Current tab title changed from [" + document.title;' +
					'document.title = "Bicineta";' +
					'alert(msg + "] to [" + document.title + "]");'
				});
  });
};

addLink.onclick = function(element) {
	addLink.innertHTML = 'Sending ...';
	extensionId = chrome.runtime.id;
	params = 'extensionId=' + extensionId + '&url=';
	redirectUrl = 'https://www.bicineta.cl/noticias/ingresar?' + params;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
			code: 'alert("Sending link to Bicineta"); location.href="' + redirectUrl + tabs[0].url + '";'
		});
  });
}