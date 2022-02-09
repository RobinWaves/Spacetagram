const api_url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&count=6`;

async function getData() {
    // Making an API call (request) and get the response back
    const response = await fetch(api_url);
    // Parsing it to JSON format
    const apodData = await response.json();
    
    // check for an image
    const type = apodData.map(type => type.media_type);
    console.log(type);
    if (type.includes("video") || type.includes("other")) {
        getData();
    } else {
        console.log(apodData);
        loadImages(apodData);
    }
} // close function getData

function loadImages(apodData) {
    // clear images
    for (let i = 0; i < apodData.length; i++) {
        $("#img" +[i] + "").empty();
    }  
    // load images
    for (let i = 0; i < apodData.length; i++) {
        $("#img" +[i] + "").prepend('<img src=" ' + apodData[i].url + '" alt="" class="w-100 card-img-top"/>')
                            .append('<a href="#" class="like"> <i class="fas fa-heart"></i> </a>')
                            .append('<h2>' + apodData[i].title + '</h2>')
                            .append('<h3>' + apodData[i].date + '</h3>')
                            .append('<p>' + apodData[i].explanation + '</p>')
    }
    $(document).ready(function() {
        $(".like").click(function() {
            $(this).toggleClass("heart")
        return false;
        });
    });
} // close function loadImages

getData();