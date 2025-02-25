let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load 3



// ##### Fetch Data #####
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
    const store = data.map((el) => Card(el.id, el.image, el.title, el.founder, el.category, el.price, el.description))
    mainSection.innerHTML = store.join("");

}

function Card(id, image, title, founder, category, price, description) {
    let singlecard = `
    <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&id=${encodeURIComponent(id)}&description=${encodeURIComponent(description)}">
    <div class="card" data-id=${id}>
        <div class="card-img">  
            <img src=${image} alt="">
        </div> 
        <div class="card-body">
            <h4 class="card-title">${title}</h4>
            <p class="card-founder">${founder}</p>
            <p class="card-category">${category}</p>
            <p class="card-price">${price}</p>
            <a href="#" data-id=${id} class="card-link">Edit</a>
            <button data-id=${id} class="card-button">Delete</button>
        </div>
    </div>
    </a>
    `
    return singlecard
}

// ##### Post Part #####

pitchCreateBtn.addEventListener("click", () => {
    let product = {
            title: pitchTitleInput.value,
            price: pitchPriceInput.value,
            category: pitchCategoryInput.value,
            image: pitchImageInput.value,
            founder: pitchfounderInput
        }
        //
    fetch("http://localhost:3000/pitches", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }).then((res) => res.json())
        .then((data) => {
            console.log(data)
            alert("product add...")
        }).catch((err) => {
            console.log(err)
            alert("somethings wrong..")
        })
})

// #####Delete Part ####

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-button")) {
        DeleteProduct(e.target.dataset.id)
    }
});

function DeleteProduct(id) {
    fetch(`http://localhost:3000/pitches/${id}`, {
            method: "DELETE"
        }).then((res) => res.json())
        .then((data) => {
            alert("deleted....")
            console.log(data)
        })
        .catch((err) => console.log(err))
}


// ### Filter ####

filterFood.addEventListener("click", () => {
    let filterData = productdata.filter((el) => el.category === "Food")
    console.log(filterData)
    Cardlist(filterData)
})

filterElectronics.addEventListener("click", () => {
    let filterData = productdata.filter((el) => el.category === "Electronics")
    console.log(filterData)
    Cardlist(filterData)
})

filterPersonalCare.addEventListener("click", () => {
    let filterData = productdata.filter((el) => el.category === "Personal Care")
    console.log(filterData)
    Cardlist(filterData)
})

// ##### Sort Part #####
sortAtoZBtn.addEventListener("click", () => {
    const sortAtoZBtn = productdata.sort((a, b) => a.price - b.price)
    Cardlist(sortAtoZBtn)
})

sortZtoABtn.addEventListener("click", () => {
        const sortZtoABtn = productdata.sort((a, b) => b.price - a.price)
        Cardlist(sortZtoABtn)
    })
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-link")) {
        let id = e.target.dataset.id
        PopulateForm(id)
    }
})

function PopulateForm(id) {
    fetch(`http://localhost:3000/pitches/${id}`).then((res) => res.json())
        .then((data) => {
            console.log(data)
            updatePitchTitleInput.value = data.title
            updatePitchImageInput.value = data.image
            updatePitchfounderInput.value = data.founder
            updatePitchCategoryInput.value = data.category
            updatePitchPriceInput.value = data.price
            updatePitchIdInput.value = data.id


        })
        .catch((err) => console.log(err))
}

updatePitchBtn.addEventListener("click", () => {
    let updateProductData = {
        title: updatePitchTitleInput.value,
        image: updatePitchImageInput.value,
        founder: updatePitchfounderInput.value,
        category: updatePitchCategoryInput.value,
        price: updatePitchPriceInput.value,
        id: updatePitchIdInput.value,
    }
    fetch(`http://localhost:3000/pitches/${updateProductData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateProductData)
        }).then((res) => res.json())
        .then((data) => {
            alert("data Updated....")
        })
        .catch((err) => console.log(err))
})