const apikey="d91a0afa79e64ba7ba542dc28832cc96";
const url ="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${apikey}`); 
    const data = await res.json();
    console.log(data); 
    bindData(data.articles);
}

function bindData(articles){
    const cardscontainer = document.getElementById('cards-container');
    const newscardtemplate = document.getElementById('template-news-card');

    cardscontainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage)
        return;
    const cardclone = newscardtemplate.content.cloneNode(true);
    fillDataincard(cardclone,article);
    cardscontainer.appendChild(cardclone);
    });
}

function fillDataincard(cardclone,article){
    const newsimg = cardclone.querySelector('#news-img');
    const newstitle = cardclone.querySelector('#news-title');
    const newssource= cardclone.querySelector('#news-source');
    const newsdesc = cardclone.querySelector('#news-desc');

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone:"Asia/Jakarta"
    });

    newssource.innerHTML = `${article.source.name} . ${date}`;

    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    });
}


let currselectednav = null;
function onnavitemclick(id){
    fetchNews(id);
    const navitem = document.getElementById(id);
    currselectednav?.classList.remove('active');
    currselectednav = navitem;
    currselectednav.classList.add('active');
}

const searchbutton = document.getElementById('search-button');
const searchtext = document.getElementById('search-text');
searchtext.addEventListener('keydown',function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        searchbutton.click();
    }
});
searchbutton.addEventListener('click',()=>{
    const query = searchtext.value;
    if(!query)return;
    fetchNews(query);
    currselectednav?.classList.remove('active');
    currselectednav = null;
})

var icon = document.getElementById("icon");

icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.src = "images/sun.png";
    }
    else{
        icon.src = "images/moon.png";
    }

}