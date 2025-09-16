
const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imageList-wrapper");


runEventListener();
function runEventListener() //Bu fonksiyon çalışınca içindeki eventlar tetiklenir
{
    form.addEventListener("submit",search);
    clearButton.addEventListener("click",clearPage);
}


function clearPage()
{
    //Temizle butonu işlemleri
    searchInput.value = "";
    imageListWrapper.innerHTML = "";
}

function search(e)
{
    const value = searchInput.value.trim();

    fetch(`https://api.unsplash.com/search/photos?query=${value}`,
        {
            method: "GET",
            headers : {
            Authorization: "Client-ID kKxS3FBbeZ0s7Z7QKd1hGxKL83kaRqm9Iqk5N5gsLvU"
            }
        })
        .then((res)=>res.json())
        .then((data)=> //Data içindeki results>urls>small linkine ulaşıyoruz
        {
            Array.from(data.results).forEach((image)=>{
                addImageToUI(image.urls.small);
            })
        })
        .catch((err)=>console.log(err));
    e.preventDefault(); //Submit işleminden sonra sayfanın yenilenmesini engeller
}

function addImageToUI(url)
{
    //Fotoğrafları UI'a ekleme işlemleri burada
    const div = document.createElement("div");
    div.className = "card";
    
    const img = document.createElement("img");
    img.setAttribute("src",url); //img'nin src'sine url'i yaz
    img.height='400';
    img.width='400';

    div.append(img); //Oluşturduğumuz div'in içerisine img'yi koy.
    imageListWrapper.append(div); //imgListwrapper div'inin içerisine oluşturduğumuz div'i koy.
}
