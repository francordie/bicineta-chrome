// TODOO: https://www.facebook.com/events/837766916598087/
const extensionId = chrome.runtime.id;
var host = 'https://www.bicineta.cl';
		// host = 'http://localhost:3000';

let title = document.getElementById('title');
let addLink = document.getElementById('add-link');
let addEventFacebook = document.getElementById('add-event-facebook');
let addEventStrava = document.getElementById('add-event-strava');
let addEventInstagram = document.getElementById('add-event-instagram');

let linkRedirectUrl 	= host + '/noticias/ingresar?extensionId=' + extensionId + '&url=';
let eventRedirectUrl 	= host + '/eventos/ingresar?extensionId='  + extensionId + '&event=';

// SCRAPING LOGIC
function facebookScrapingCode(redirectUrl) {
	return 'isFacebookEvent = window.location.href.startsWith("https://www.facebook.com/events/");' + 
				 'if (!isFacebookEvent) {' +
				 '	alert("Not a Facebook event URL [https://www.facebook.com/events/...]");' +
				 '} else {' +				 
				 '	try { ' +
				 '		title 			= document.getElementById("seo_h1_tag").innerHTML;' +
				 //	 '// Sábado, 13 de julio de 2019' +
				 '		date 				= document.getElementById("title_subtitle").childNodes[0].getAttribute("title");' +
				 //	 '// 2019-07-13T06:00:00-07:00 to 2019-07-14T18:00:00-07:00' +
				 '		full_date 	= document.querySelector("._2ycp._5xhk").getAttribute("content");' +
				 '		description = document.querySelectorAll("[data-testid=event-permalink-details]");' +
				 '		if (description.length > 0) {' +
				 '			description = description[0].childNodes[0].innerText;' +
				 '			if (description.length > 1500)' +
				 '				description = description.substring(0, 1500) + " ...";' +
				 '			}' +
				 //	
				 '		cover 			= document.querySelector("._3kwh");' +
				 '		if (cover) {' +
				 '			cover = cover.querySelector("img");' +
				 '			if (cover) ' +
				 '				cover = cover.getAttribute("src");' +
				 '		}' +
				 //	 '//' +
				 '		place = document.querySelector("a#u_0_19._5xhk");' +
				 '		if (!place)' +
				 '				place = document.querySelector("#u_0_1a._5xhk");' +
				 '		if (!place)' +
				 '				place = document.querySelector("#u_0_16._5xhk");' +
				 '		if (place)' +
				 '			place = place.innerHTML;' +
				 '		if (!place)' +
				 '		 if (document.querySelectorAll("._5xhk").length > 2)' +
				 '				place = document.querySelectorAll("._5xhk")[2].textContent;' +
				 '			else' +
				 '				if (document.querySelectorAll("._5xhk")[1] != undefined)' +
				 '					place = document.querySelectorAll("._5xhk")[1].textContent;' +
				 //'//' +
				 '		org = document.querySelectorAll("[data-testid=event_permalink_feature_line]")[0].querySelector("a");' +
				 '		if (org) {' +
				 '		org_name = org.innerHTML;' +
				 '		org_external_link = org.getAttribute("href");' +
				 '		};' +
				 '		full_date_array = full_date.split(" to ");' +
				 '		start_at = full_date_array[0];' +
				 '		if (full_date_array.length > 1)' +
				 '			end_at = full_date_array[1];' +
				 '		else' +
				 '			end_at = "";' +
				 '		event = {' +
				 '			from: "facebook",' +
				 '			title: title,' +
				 '			start_at: start_at,' +
				 '			end_at: end_at,' +
				 '			full_date: full_date,' +
				 '			description: description,' +
				 '			cover: cover,' +
				 '			place: place,' +
				 '			external_url: window.location.href,' +
				 '			organization: { "name": org_name, "external_link": org_external_link }' +
				 '		};' +
				 '		console.log(event);' +
				 '		event_json = JSON.stringify(event);' +
				 '		event_encoded = encodeURIComponent(event_json);' +
				 '		bicinetaUrl = "' + redirectUrl + '" + event_encoded;' +
				 '		location.href=bicinetaUrl;' +
				 '	}' +
				 '	catch(error) {' +
				 '	  console.error("JS EXCEPTION");' +
				 '	  console.error(error);' +
				 '	} ' +
				 '};'
}

function stravaScrapingCode(redirectUrl) {
	//'isStravaEvent = window.location.href.match(/"https:\/\/www.strava.com\/clubs\/\d{6}\/group_events\/\d{6}"/);' +
	return 'isStravaEvent = window.location.href.startsWith("https://www.strava.com/clubs/");' +
				 'if (!isStravaEvent) {' +
				 '	alert("Not a Strava event URL");' +
				 '} else {' +
				 '	try { ' +
				 '		container = document.querySelector(".group-event-container");' +
				 '		title 		= container.querySelector("h1").innerText;' +
				 '		dateDay 	= container.querySelector(".date-box .date").innerText;' +
				 '		dateMonth = container.querySelector(".date-box .month").innerText;' +
				 '		dateTime 	= container.querySelector(".group-event-time strong").innerText;' +
				 '		startAt 	= dateMonth + "/" + dateDay + " " + dateTime;' +
				 '		place 		= container.querySelectorAll(".group-event-address span")[1].innerText;' +
				 '		event 		= {' +
				 '			from: "strava",' +
				 '			title: title,' +
				 '			start_at: startAt,' +
				 '			place: place,' +
				 '			external_url: window.location.href,' +
				 '			organization: { "name": "", "external_link": "" }' +
				 '		};' +
				 '		console.log(event);' +
				 '		event_json = JSON.stringify(event);' +
				 '		event_encoded = encodeURIComponent(event_json);' +
				 '		bicinetaUrl = "' + redirectUrl + '" + event_encoded;' +
				 '		location.href=bicinetaUrl;' +
				 '	} ' +
				 '	catch(error) {' +
				 '	  console.error("JS EXCEPTION");' +
				 '	  console.error(error);' +
				 '	}' +
				 '};'
};

function instagramScrapingCode(redirectUrl) {
	//'isInstagramPost = window.location.href.match(/"https:\/\/www.instagram.com\/p\"/);' +
	return 'isInstagramPost = window.location.href.startsWith("https://www.instagram.com/p/");' +
				 'if (!isInstagramPost) {' +
				 '	alert("Not a Instagram event URL");' +
				 '} else {' +
				 '	try { ' +
				 '		cover = document.querySelector(".FFVAD").getAttribute("srcset").split(" ")[0];' +
				 '		org_name = document.querySelector(".FPmhX");' + 
				 '		org_name = org_name ? org_name.innerText : "" ;' + 
				 '  	description = document.querySelector(".C4VMK span");' +
				 '  	description = description ? description.innerText : "";' +
				 '		event 		= {' +
				 '			from: "instagram",' +
				 '			cover: cover,' +
				 '			description: description,' +
				 '			external_url: window.location.href,' +
				 '			organization: { "name": org_name, "external_link": "" }' +
				 '		};' +
				 '		console.log(event);' +
				 '		event_json = JSON.stringify(event);' +
				 '		event_encoded = encodeURIComponent(event_json);' +
				 '		bicinetaUrl = "' + redirectUrl + '" + event_encoded;' +
				 '		location.href=bicinetaUrl;' +
				 '	}' +
				 '	catch(error) {' +
				 '	  console.error("JS EXCEPTION");' +
				 '	  console.error(error);' +
				 '	}' +
				 '};'
};

// BUTTONS EVENT HANDLERS

title.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
			code: 'location.href="https://www.bicineta.cl";'
		});
  });
};

addLink.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
			code: 'location.href="' + linkRedirectUrl + tabs[0].url + '";'
		});
  });
};

addEventStrava.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
			code: stravaScrapingCode(eventRedirectUrl)
		});
	});
};

addEventFacebook.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
			code: facebookScrapingCode(eventRedirectUrl)
		});
  });
};

addEventInstagram.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
			code: instagramScrapingCode(eventRedirectUrl)
		});
  });
};