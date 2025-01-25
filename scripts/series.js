const apikey = "def95e063c28b4c1f0b98de2c46f88a8";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w200";
const popularSeries = `${baseUrl}/tv/popular?api_key=${apikey}`;

// Kategorileri listelemek için URL;
const seriesList = `${baseUrl}/genre/tv/list?api_key=${apikey}`;

// Kategorileri saklamak için obje;
const genresMap = {};

// Dizi kategorileri için istek atalım;
const diziKategoriliniListele = () => {
    fetch(seriesList)
    .then(response => response.json())
    .then((data)=>{
        data.genres.forEach((genre)=>{
            genresMap[genre.id] = genre.name;
        })
    })
}

diziKategoriliniListele();

// Sayfa Açıldığında Populer filmler karşıma gelsin istiyorum.
fetch(popularSeries)
.then(response=>response.json())
.then((data)=>{
    diziBilgileriniGoster(data);
})

const seriesWrapper = document.querySelector(".series-wrapper");
const diziBilgileriniGoster = (data) => {
    console.log(data)
    data.results.forEach((veri)=>{
        const serieCard = document.createElement("div");
        serieCard.classList.add("serie-card");
        serieCard.id = veri.id;

        serieCard.addEventListener("click", function(){
            window.location.href = `series-detay.html?id=${serieCard.id}`
        })

        const date = new Date(veri.first_air_date)
        const formattedDate = date.toLocaleDateString("tr-TR", {
            day:"numeric",
            month:"long",
            year:"numeric"
        })

        let posterPath;

        if(veri.poster_path){
            posterPath=`${imageUrl}${veri.poster_path}`
        }else if(veri.poster_path == null || veri.poster_path == ""){
            posterPath = "https://www.reelviews.net/resources/img/default_poster.jpg"
        }
        const genreNames = veri.genre_ids.map((id)=>genresMap[id]).slice(0,2)

        serieCard.innerHTML = `
        <img src="${posterPath}" alt="">
        <div class="serie-info">
            <h4>${veri.name}</h4>
            <p>${genreNames}</p>
            <p>${formattedDate}</p>
            <h6><span>IMDB</span><i class="fa-solid fa-star"></i>${(veri.vote_average).toFixed(1)}</h6>
        </div>
        `
        seriesWrapper.append(serieCard);
    })
}


// !İnput içerisinden dizi arama

// const searchInput = document.querySelector("#searchInput")

// const dizileriFiltrele = () => {
//     searchInput.addEventListener("input", function(){
//         const searchTerm = searchInput.value.trim();

//         if(!searchTerm){
//             fetch(popularSeries)
//             .then(response=>response.json())
//             .then((data)=>{
//                 console.log(data)
//                 diziBilgileriniGoster(data)
//             });
//             return
//         }
//         fetch(`https://api.themoviedb.org/3/search/tv?query=${searchTerm}&api_key=${apikey}`)
// .then(response=>response.json())
// .then((data)=>{
//     console.log(data)
//     seriesWrapper.innerHTML ="";
//     diziBilgileriniGoster(data)
// })
//     })
// }


const searchInput = document.querySelector("#searchInput");

const dizileriFiltrele = () =>{

    searchInput.addEventListener("input", function(){
        const searchTerm = searchInput.value.trim();

        if(!searchTerm){
            fetch(popularSeries)
            .then(response=>response.json())
            .then((data)=>{
                diziBilgileriniGoster(data);
            })
            return;
        }
    
        fetch(`https://api.themoviedb.org/3/search/tv?query=${searchTerm}&api_key=${apikey}`)
        .then(response=>response.json())
        .then((data)=>{
            seriesWrapper.innerHTML = "";
            diziBilgileriniGoster(data)
        })
    })
    

}

dizileriFiltrele();

