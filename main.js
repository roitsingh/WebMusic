/*
  Here is a guide for the steps you could take:
*/
//console.log("talking");
// 1. First select and store the elements you'll be working with
let searchIn = document.getElementById("search_field");
let button = document.getElementById('submit_button');
let searchform = document.getElementById("search-form");
let searchResults;

let player = document.getElementById('music-player');
//console.log("what's in search?:", search);


// 2. Create your `onSubmit` event for getting the user's search term

button.addEventListener('click', goSearch);
//
async function goSearch() {
  let searchQuery = searchIn.value;
  console.log(searchQuery);

  // 3. Create your `fetch` request that is called after a submission

    await fetch('https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=' + searchQuery )
    .then(
      function (response) {

        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        } else {
          response.json().then(function (data) {
            //console.log(searchResults);
            for (let i = 0; i < data.length; i++) {
              console.log("show each title:", data[i].title);
              let markup = `
                <div class="artist_container">
                  <div class="avatar_container">
                    <img class="${data[i].stream_url}?client_id=8538a1744a7fdaa59981232897501e04" src=${data[i].artwork_url} alt=${data[i].title}>
                  </div>
                  <div class="title_artist">
                   <ul>
                     <li id="title">${data[i].title}</li>
                     <li id="artist">${data[i].user.username}</li>
                   </ul>
                 </div>
                </div>
               `
              document.getElementById("results").innerHTML += markup;
            }
          });
        }

      })
  document.getElementById("results").innerHTML = "" //this clears the page for the next search
}

document.getElementById("results").addEventListener("click", function(e) {
  if (e.target && e.target.nodeName == "IMG") {
    let url = e.target.className;
    player.music-player.removeAttribute("src");
    player.music-player.setAttribute("src", url);
    player.play();
    let playerSource = player.src;
    //player.img.setAttribute("src",e.target.src);
    document.getElementById("playing").innerHTML = `<p>Now Playing:</p><br><img src=${e.target.src}><br><marquee direction="left" width="100px">${e.target.alt}</marquee>`;
    console.log(e.target.src);
    console.log(e.target.title);
  }
})
// 4. Create a way to append the fetch results to your page


// 5. Create a way to listen for a click that will play the song in the audio play
// ?? data[i].stream_url  ??
