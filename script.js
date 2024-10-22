const API_KEY = "b6226738b13f4bbcb1327f11562f9b80";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchData("India"));

function reload(){
    window.location.reload();
}

async function fetchData(query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById("card-container");
    const newsCardTemplate= document.getElementById("template-news-card");

    cardsContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone= newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg= cardClone.querySelector("#news-img");
    const newsTitle= cardClone.querySelector("#news-title");
    const newsSource= cardClone.querySelector("#news-source");
    const newsDescription= cardClone.querySelector("#news-desc");






    newsImg.src= article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsDescription.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML=`${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
    
}


let curSelectedNav= null;
function onNavItemClick(id){
    fetchData(id);
    const navItem= document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav?.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText= document.getElementById("search-text")


searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
    fetchData(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;
});


