document.addEventListener('DOMContentLoaded', () => {
    let allCars = document.querySelector("#allCars");
    let select = document.querySelector("select");
    let carsForOneUser = document.querySelector("#carsForOneuser");

    
    const fetchData = async (url, cb, domEl) => {
        try {
            let res = await axios.get(url)
            cb(res.data, domEl)
        } catch (error) {
            console.log(error, " something went wrong")
        }
    }
    
    
    const fillUlWithCars = (data, domEl) => {
        domEl.innerHTML = "";
        debugger
        data.cars.forEach(el => {
            let li = document.createElement("li");
            li.innerText = `Brand: ${el.brand}, Model: ${el.model}, Year: ${el.year}`;
            domEl.appendChild(li)
        })
    }
    
    
    const fillSelectBar =  (data, domEl) => {
        let users = data.users
        users.forEach(user => {
            let option = document.createElement("option");
            option.innerHTML = user.username;
            option.value = user.id;
            domEl.appendChild(option)
        })
    }
    
    
    
    
    
    fetchData("http://localhost:3000/users", fillSelectBar, select);
    fetchData("http:/localhost:3000/cars", fillUlWithCars, allCars)

    select.addEventListener("change", (e) => {
        e.preventDefault();
        fetchData(`http://localhost:3000/users/${e.target.value}/cars`, fillUlWithCars, carsForOneUser)
    })
})
