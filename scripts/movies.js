const apikey = "def95e063c28b4c1f0b98de2c46f88a8";
const baseUrl = "https://api.themoviedb.org/3";
const popularFilm = `${baseUrl}/movie/popular?api_key=${apikey}`;
const upcomingFilms = `${baseUrl}/movie/upcoming?api_key=${apikey}`;
const topratedFilms = `${baseUrl}/movie/top_rated?api_key=${apikey}`;
const moviesWrapper = document.querySelector(".movies-wrapper");


// Film görsellerine ulaşmak için kullanacağımız URL;
const imageUrl = "https://image.tmdb.org/t/p/w200";

// Film kategorilerini alabilmek için kullanacağımız URL;
const movieList = `${baseUrl}/genre/movie/list?api_key=${apikey}`;

// Kategori bilgilerini içinde tutacak objemiz;
let genresMap = {};

// Kategoriye göre film listelemek için elemanların seçimi;
const popular = document.querySelector("#popular");
const upcoming = document.querySelector("#upcoming");
const toprated = document.querySelector("#toprated");

const filmKategorileriniListele = () => {
    fetch(movieList)
    .then(response => response.json())
    .then((data)=> {
        console.log(data)
        data.genres.forEach((genre)=>{
            genresMap[genre.id] = genre.name;
        })
    })
};

filmKategorileriniListele();

// ! İlk olarak en çok oy alan filmleri listeleyelim.
fetch(topratedFilms)
.then(response => response.json())
.then((data)=>{
    console.log(data)
    filmBilgileriniYazdir(data);
})

const filmBilgileriniYazdir = (data) => {
    data.results.forEach((veri)=>{

        let posterPath;

        if(veri.poster_path){
            posterPath = `${imageUrl}${veri.poster_path}`
        }else if(veri.poster_path == null || veri.poster_path == ""){
            posterPath = "https://www.reelviews.net/resources/img/default_poster.jpg"
        }

        // const posterPath = veri.poster_path;
        const genreNames = veri.genre_ids.map((id)=> genresMap[id]).slice(0,2);
        const date = new Date(veri.release_date);
        const formattedDate = date.toLocaleDateString("tr-TR", {
            day : "numeric",
            month : "long",
            year : "numeric",
        })

        // Movie-Card oluşturalım
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.id = veri.id;

        movieCard.addEventListener("click", function(){
            window.location.href = `detay.html?id=${veri.id}`;
        })

        // Kart Bilgilerini Ayarlama
        movieCard.innerHTML = `
        <img src="${posterPath}" alt="">
        <div class="movie-info">
            <h4>${veri.title}</h4>
            <p>${genreNames}</p>
            <p>${formattedDate}</p>
            <h6><span>IMDB</span><i class="fa-solid fa-star"></i>${(veri.vote_average).toFixed(1)}</h6>
        </div>
        `;

        moviesWrapper.append(movieCard);
    })
}

// Popüler filmleri getirmek için;
popular.addEventListener("click", function(){
    filmKategorileriniListele();
    popülerFilmleriYazdir();
})

const popülerFilmleriYazdir = () => {
    fetch(popularFilm)
    .then(response => response.json())
    .then((data)=> {
        moviesWrapper.innerHTML = "";
        filmBilgileriniYazdir(data);
    })
}

// Vizyona girecek filmleri getirmek için;
upcoming.addEventListener("click", function(){
    filmKategorileriniListele();
    yakindaVizyonaGirecekFilmleriYazdir();
})

const yakindaVizyonaGirecekFilmleriYazdir = () => {
    fetch(upcomingFilms)
    .then(response => response.json())
    .then((data)=> {
        moviesWrapper.innerHTML = "";
        filmBilgileriniYazdir(data);
    })
}

// En çok oy alan filmler için;
toprated.addEventListener("click", function(){
    filmKategorileriniListele();
    enCokOyAlanFilmleriYazdir();
})

const enCokOyAlanFilmleriYazdir = () => {
    fetch(topratedFilms)
    .then(response => response.json())
    .then((data)=> {
        moviesWrapper.innerHTML = "";
        filmBilgileriniYazdir(data);
    })
}




// ! input içerisinden film aratmak
const searchInput = document.querySelector("#searchInput");

const filmleriFiltrele = () => {
    searchInput.addEventListener("input", function(){
        const searchTerm = searchInput.value.trim();

        if(!searchTerm){
            fetch(topratedFilms)
            .then(response => response.json())
            .then((data)=>{
                console.log(data)
                filmBilgileriniYazdir(data);
            });
            return;
        }
        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apikey}`)
        .then(response=>response.json())
        .then((data)=>{
            console.log(data)
            moviesWrapper.innerHTML = "";
            filmBilgileriniYazdir(data)
        })  
    })
}

filmleriFiltrele();

























