

const fetchData = async (url, cb, domEl) => {
    try {
        let res =  await axios.get(url)
        cb(res.data, domEl)
    } catch (error) {
        console.log(error, " something went wrong")
    }
}


const fillUlWithCars = (data, domEl) => {
    domEl.innerHTML = "";
    data.payload.forEach(el => {
        const li = document.createElement("li");
        li.innerText = `Brand: ${el.brand}, Model: ${el.model}, Year: ${el.year}`;
        domEl.appendChild(li)
    })
}


const fillSelectBar =  (data, domEl) => {
    data.users.forEach(user => {
        const option = document.createElement("option");
        option.innerHTML = user.username;
        option.value = user.id;
        domEl.appendChild(option)
    })
}


    let allCars = document.querySelector("#allCars");
    let select = document.querySelector("select");
    let carsForOneUser = document.querySelector("#carsForOneUser");
    select.addEventListener("change", (e) => {
        fetchData(`http://localhost:3000/users/${e.target.value}/cars`, fillUlWithCars, carsForOneuser)
    })
    
    
    fetchData("http:/localhost:3000/cars", fillUlWithCars, allCars)
    fetchData("http://localhost:3000/users", fillSelectBar, select);
