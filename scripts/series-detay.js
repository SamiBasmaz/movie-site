const apiKey = "6a74005175f57eb535a177d343da74ff";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w400"
const creditsUrl = "https://image.tmdb.org/t/p/w200"

const urlParams = new URLSearchParams(window.location.search);
const diziId = urlParams.get("id")
console.log(diziId)

// ! Film detayları URL'i

const seriesUrl = `${baseUrl}/tv/${diziId}?api_key=${apiKey}`

// ! dizi oyuncularını almak için
const seriesCreditsUrl = `${baseUrl}/tv/${diziId}/credits?api_key=${apiKey}`

fetch(seriesUrl)
.then(response=>response.json())
.then((data)=>{
    diziBilgileriniGöster(data);
    console.log(data)
})

const diziBilgileriniGöster = (data) => {
    const seriesDetayWrapper = document.querySelector(".series-detay-wrapper");

    const seriesDate = new Date(data.first_air_date).toLocaleDateString("tr-TR",{
        year : "numeric",
        month : "long",
        day : "numeric"
    });


    const genreNames = data.genres.map((genre)=>genre.name).slice(0,2);


    seriesDetayWrapper.innerHTML= `
                <div class="series-detay">
                <img class="detay-foto" src="${imageUrl}${data.poster_path}" alt="">
                <div class="series-bilgileri">
                    <h2>${data.name}</h2>
                    <p><strong>Kategoriler:</strong>${genreNames}</p>
                    <p><strong>Çıkış Tarihi:</strong>${seriesDate}</p>
                    <p><strong>IMDB Puanı:</strong>${(data.vote_average).toFixed(1)}</p>
                    <p><strong>Özet:</strong>${data.overview}</p>
                </div>
            </div>
    `
}


// !Oyuncu bilgileri için
fetch(seriesCreditsUrl)
.then(response=>response.json())
.then((data)=>{
    console.log(data.cast)
    oyuncuBilgileriniGöster(data.cast);
})


const oyuncuBilgileriniGöster = (cast) => {
    cast.slice(0,8).forEach((oyuncu) => {
        const oyuncularWrapper = document.querySelector(".oyuncular-wrapper");

        

        let castPicture
        if (oyuncu.profile_path) {
            castPicture = `${creditsUrl}${oyuncu.profile_path}`;
        } else {
            castPicture = `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=`;
        }

        oyuncularWrapper.innerHTML += `
        <div class="oyuncu-card">
            <img src="${castPicture}" alt="">
            <h4>${oyuncu.name}</h4>
            <p><strong>Karakter:</strong>${oyuncu.character}</p>
            </div>
        `
    }) 
}






 


















