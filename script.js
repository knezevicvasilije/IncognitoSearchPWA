
const api_urlBookmarks = 'https://pwa.m-search.me/bookmarks/getAllBookmarks.php'
const api_urlCategories = 'https://pwa.m-search.me/news/getCategories.php'
var api_urlNews = 'https://pwa.m-search.me/news/get.php?category='

const bookmarks = document.getElementsByClassName('bookmarks');

/* const getData = async() =>{
    const response = await fetch(api_url);
    const data = await response.json();
    book = data;
    console.log(data);
}

window.addEventListener('load', () => {
    getData();
})

function show(data){
    console.log(data)
}
show() */

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered")
        console.log(registration)
    }).catch(error => {
        console.log("SW Registration Failed")
    })
}



fetch(api_urlBookmarks).then(response => {
    return response.json();
}).then(data=>{
    //console.log(data)
   showBookmarks(data)
})

var output ="";
showBookmarks = (data) => {
  for(let i = 0; i < 4; i++){
      //console.log(data[i])
      output += `<div class="bookmark">
      <a class="imgPseudo"href="${data[i].url}" target="_blank"><img class="imageContainer" style=" width: 3rem;"src=${data[i].icon}>
            <p class="gameName">${data[i].title}</p>
            </a>
      </div>`
  }
  document.getElementById("bookmarks").innerHTML = output;
 
}

var outputCategory = '';
fetch(api_urlCategories).then(response => {
    return response.json();
}).then(data => {
    
    showCategories(data)
    pickCategory(data)
    //fetchData(data.query)

})

showCategories = (data) => {
    for(let i = 0; i < data.length; i++){
    console.log(data[i])
       outputCategory += `<button onClick=fetchData("${data[i].query}") class="categoryBtn">${data[i].name}</button>`
    }
    document.getElementById("categories").innerHTML = outputCategory;
}

const btnCt = document.getElementsByClassName("categoryBtn");


var query ='';
 pickCategory = (data) => {
query = data;
console.log(query, "daa")

}
 
var outputNews ='';

fetch(`${api_urlNews}&CATEGORY&c=CID`).then(response => {
    return response.json();
}).then(data => {
    //console.log(data.articles)
    showNews(data.articles)
})

async function fetchData(data){

    let dataString='top';
    if(data === 'top'){
        dataString = 'CATEGORY&c=CID';
    }else{
        dataString=`${data}`
    }
    console.log(dataString)
    


fetch(`${api_urlNews}${dataString}`).then(response => {
    return response.json();
}).then(data => {
    //console.log(data.articles)
    showNews(data.articles)
})
}


showNews = (data)=> {
   
    for(let i = 0; i < data.length; i++){
        //console.log(data[i])
       outputNews += `
       <a class="imgPseudo"href="${data[i].url}" target="_blank">
       <div class="singleNew">
  
        <img class="newsImage"  src=${data[i].urlToImage}
        onerror="this.onerror=null;this.src='https://pwa.m-search.me/media/no-img-available.jpeg';" />
        
              <div class="newsTitle">
            <h1>
                ${data[i].title}
            </h1>
        </div>
       </div>
       </a>
       `
    }
    document.getElementById("news").innerHTML = outputNews;
    outputNews = ""
}




