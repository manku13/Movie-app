const navigator = {
    currentPage: window.location.pathname
}

// Highlight Active link
function highlightActiveLink(){
    const links = document.querySelectorAll(".nav-link")
    links.forEach(link => {
        if(link.getAttribute("href") === navigator.currentPage){
            link.classList.add("active")
        }
    })
}

async function fetchAPIData(endpoint) {
    const API_KEY = '4d4dd536f4794961a5e43303ce129155'
    const API_URL = 'https://api.themoviedb.org/3/';
  
    showSpinner()
    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );
  
    const data = await response.json();

    hideSpinner()
  
    return data;
  }

async function displayPopularMovies(){
    const {results} = await fetchAPIData("movie/popular")

    results.forEach((movie) => {
        const div = document.createElement("div");
        div.classList.add("card")
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        ${
            movie.poster_path
            ?`<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
          : `<img
          src = "../images/no-image.jpg"
          class = "card-img-top"
          alt = "s${movie.title}"
          />`
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `
        document.querySelector("#popular-movies").appendChild(div)
    })
}

function showSpinner() {
    document.querySelector(".spinner").classList.add("show")
}

function hideSpinner() {
    document.querySelector(".spinner").classList.remove("show")
}

async function displayPopularTVShows() {
    const {results} = await fetchAPIData("tv/popular")

    results.forEach((show) => {
        const div = document.createElement("div");
        div.classList.add("card")
        div.innerHTML = `
        <a href="movie-details.html?id=${show.id}">
        ${
            show.poster_path
            ?`<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
          : `<img
          src = "../images/no-image.jpg"
          class = "card-img-top"
          alt = "s${show.name}"
          />`
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${show.first_air_date}</small>
          </p>
        </div>
        `
        document.querySelector("#popular-shows").appendChild(div)
    })
}

// Init App
function init() {
    switch(navigator.currentPage) {
        case "/":
        case "/index":
            displayPopularMovies()
            break
        case "/shows.html":
            displayPopularTVShows()
            break
        case "/tv-details.html":
            console.log("TV Details")
            break
        case "/movie-details.html":
            console.log("Movies Details")
            break
        case "/search.html":
            console.log("Search page")
            break
    }

    highlightActiveLink()
}

document.addEventListener("DOMContentLoaded", init)
