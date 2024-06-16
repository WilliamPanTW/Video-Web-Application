var url= 'https://jsonplaceholder.typicode.com/albums/2/photos';

function updatePhotoCount(count) {
    document.getElementById("photo-count").textContent = count;
}

function fadeOut(element) {
    element.style.transition = "opacity 0.5s ease-out"; 
    element.style.opacity = 0; 
    setTimeout(() => {
      element.parentNode.removeChild(element); 
    updatePhotoCount(document.getElementsByClassName('product-card').length);
    }, 200);
}

async function fetchWithString(){
    try{
        var respone = await fetch(url);
        var data = await respone.json();
        var htmlString = data.reduce(function(prev,product){
            return (
                prev + 
                `<div class="product-card">
                    <img class="product-img" src="${product.thumbnailUrl}"/>
                    <div class="product-info">
                        <p class="product-title">"${product.title}"</p>
                    </div>
                </div>`
            );
        },"");
        document.getElementById("product-list").innerHTML=htmlString
        updatePhotoCount(data.length);
        let card = document.getElementsByClassName('product-card');
        [...card].forEach(function(ele){
            ele.addEventListener('click',function(ev){
                console.log(ev);
                fadeOut(ev.currentTarget);
                updatePhotoCount(card.length);
            })
        });
    }catch (error){
        console.log(error);
    }
}

fetchWithString();
