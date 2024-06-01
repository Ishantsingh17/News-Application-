const API_KEY="bf71928840a949babc1409f4a3ef217c";

const url="https://newsapi.org/v2/everything?q=";


window.addEventListener("load",()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

// Get the input field
var input=document.getElementById("search-text")
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress",function(event){
     // If the user presses the "Enter" key on the keyboard
    if(event.key=="Enter"){
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("search-button").click();
    }
})

async function fetchNews(query){
    
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`); //fetch returns a promise 

    const data=await res.json();  //JSON will make the easy to read and used name/value pair like objects
    console.log("data is",data);
    bindData(data.articles);
} 

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardsContainer.innerHTML= "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;

        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} • ${date} `;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}
let curSelectedNav=null;

function onNavItemClick(id){
    fetchNews(id);
    const NavItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=NavItem;
    curSelectedNav.classList.add('active');

}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');


searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');


})

