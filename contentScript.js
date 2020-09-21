tabUrl = window.location.href;
if(tabUrl.includes("www.facebook.com")) {
  removeFbStoriesNow();
}
else {
  alert('Facebook site not found, do nothing');
}

function removeFbStoriesNow() {
  // console.log("storiesContainer", storiesContainer);
  //storiesContainer.querySelector("#stories_tray").style.display = "none"
  //storiesContainer.querySelector("span").innerText = "Historias (OCULTAS)"
  storiesSelector = "[data-pagelet=\'Stories\']";
  storiesDiv = document.querySelector(storiesSelector);
  if (storiesDiv == null) {
    console.log(storiesSelector + " not found")
  } else {
    console.log(storiesSelector + " was removed");
    storiesDiv.remove();
  }
  setTimeout( function() {
    removeFbStoriesNow()
  }, 5000)
};