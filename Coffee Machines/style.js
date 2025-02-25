//slider
let arr = ["https://ratiocoffee.com/cdn/shop/files/RATIO-Proud-Mary-Nolan-Hirte-09_1080x.jpg?v=1635799124", "https://ratiocoffee.com/cdn/shop/files/Katie-Prinsen-Testimonial_1080x.jpg?v=1652467063", "https://ratiocoffee.com/cdn/shop/files/Thomas-Ratio-Testimonial_1080x.jpg?v=1652466888", "https://ratiocoffee.com/cdn/shop/files/video_still_1080x.jpg?v=1645480433", "https://ratiocoffee.com/cdn/shop/files/Jon-Way-Surfer-Testimonial_1080x.jpg?v=1652390452"]

let currentindex = 1
setInterval(() => {
    currentindex = (currentindex + 1) % arr.length;
    document.querySelector(".slider").src = arr[currentindex]
}, 7000)


// data

let mainSection = document.getElementById("data-list-wrapper");

let productdata = []

function Fetchdata() {
    fetch("http://localhost:3000/pitches").then((res) => res.json())
        .then((data) => {
            Cardlist(data)
            productdata = data
        })
        .catch((err) => console.log(err))
}
Fetchdata()

function Cardlist(data) {
    const store = data.map((el) => Card(el.id, el.image, el.title, el.price, el.description))
    mainSection.innerHTML = store.join("");

}

function Card(id, image, title, price, description) {
    let singlecard = `
    <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}id=${encodeURIComponent(id)}&description=${encodeURIComponent(description)}">
    <div class="card" data-id=${id}>
        <div class="card-img">  
            <img src=${image} alt="">
        </div> 
        <div class="card-body">
            <h4 class="card-title">${title}</h4>
            <p class="card-price">${price}</p>
            
            <button data-id=${id} class="card-button mt-3 p-2">shop Now</button>
        </div>
    </div>
    </a>
    `
    return singlecard
}