let changeColor = document.getElementById('change-color');
let addLink = document.getElementById('add-link')
let addEvent = document.getElementById('add-event')
let title = document.getElementById('title')

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
			code: 'location.href="' + redirectUrl + tabs[0].url + '";'
		});
  });
}

title.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
			code: 'location.href="https://www.bicineta.cl";'
		});
  });
}

addEvent.onclick = function(element) {
	addLink.innertHTML = 'Sending ...';
	extensionId = chrome.runtime.id;
	eventParams = "" //encodeEventParams();
	redirectUrl = 'https://www.bicineta.cl/eventos/ingresar?extensionId=' + extensionId + '&fb_event=';
	// redirectUrl = 'http://localhost:3000/eventos/ingresar?extensionId=' + extensionId + '&fb_event=';
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
			code: 
			'isFacebookEvent = window.location.href.startsWith("https://www.facebook.com/events/");' + 
			'if (!isFacebookEvent) { alert("Not a Facebook event URL [https://www.facebook.com/events/...]") };' +
			'title 			= document.getElementById("seo_h1_tag").innerHTML;' +
			// '// Sábado, 13 de julio de 2019' +
			'date 				= document.getElementById("title_subtitle").childNodes[0].getAttribute("title");' +
			// '// 2019-07-13T06:00:00-07:00 to 2019-07-14T18:00:00-07:00' +
			'full_date 	= document.querySelector("._2ycp._5xhk").getAttribute("content");' +
			'description = document.querySelectorAll("[data-testid=event-permalink-details]")[0].childNodes[0].innerText;' +
			'cover 			= document.querySelector("._3kwh");' +
			'if (cover)' +
			'	cover = cover.querySelector("img").getAttribute("src");' +
			// '//' +
			'place = document.querySelector("a#u_0_19._5xhk");' +
			'if (place)' +
			'	place = place.innerHTML;' +
			// '//' +
			'org = document.querySelectorAll("[data-testid=event_permalink_feature_line]")[0].querySelector("a");' +
			'if (org) {' +
			'org_name = org.innerHTML;' +
			'org_external_link = org.getAttribute("href");' +
			'};' +
			'full_date_array = full_date.split(" to ");' +
			'start_at = full_date_array[0];' +
			'if (full_date_array.length > 1)' +
			'	end_at = full_date_array[1];' +
			'else' +
			'	end_at = "";' +
			'event = {' +
			'	title: title,' +
			'	start_at: start_at,' +
			'	end_at: end_at,' +
			'	full_date: full_date,' +
			'	description: description,' +
			'	cover: cover,' +
			'	place: place,' +
			'	external_url: window.location.href,' +
			'	organization: { "name": org_name, "external_link": org_external_link }' +
			'};' +
			'console.log(event);' +
			'event_json = JSON.stringify(event);' +
			'event_encoded = encodeURIComponent(event_json);' +
			'bicinetaUrl = "' + redirectUrl + '" + event_encoded;' +
			'location.href=bicinetaUrl;'
		});
  });
}