let allCars = document.querySelector("#allCars");
let select = document.querySelector("select");
let carsForOneUser = document.querySelector("#carsForOneUser");



const fetchData = async(url, cb, domEl) => {
    try {
        let res =   await axios.get(url)
        cb(res.data, domEl)
    } catch (error) {
        console.log(error, " something went wrong")
    }
}


const fillUlWithCars = (data, domEl) => {
    domEl.innerHTML = "";
    data.cars.forEach(el => {
        let li = document.createElement("li");
        li.innerText = `Brand: ${el.brand}, Model: ${el.model}, Year: ${el.year}`;
        domEl.appendChild(li)
    })
}


const fillSelectBar =  (data, domEl) => {
    let res = data.users
    res.forEach(user => {
        let option = document.createElement("option");
        option.innerText = user.username;
        option.value = user.id;
        domEl.appendChild(option)
    })
}
    select.addEventListener("change", (e) => {

        fetchData(`http://localhost:3000/users/cars/${e.target.value}`, fillUlWithCars, carsForOneUser)
    })
    
    
    fetchData("http://localhost:3000/cars", fillUlWithCars, allCars)
    fetchData("http://localhost:3000/users", fillSelectBar, select);

