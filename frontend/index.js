

const fetchData = (url, cb, domEl) => {
    try {
        let res =  axios.get(url)
        cb(res.data, domEl)
    } catch (error) {
        console.log(error, " something went wrong")
    }
}


const fillUlWithCars = (data, domEl) => {
    domEl.innerHTML = "";
    data.cars.forEach(el => {
        const li = document.createElement("li");
        li.innerText = `Brand: ${el.brand}, Model: ${el.model}, Year: ${el.year}`;
    })
    domEl.appendChild(li)
}


const fillSelectBar =  (data, domEl) => {
    data.forEach(user => {
        const option = document.createElement("option");
        option.innerHTML = user.name;
        option.value = user.id;
        domEl.appendChild(option)
    })
}


document.addEventListener('DOMContentloaded', () => {
    let allCars = document.querySelector(".allCars");
    let select = document.querySelector("select");
    let carsForOneUser = document.querySelector("#carsForOneUser");
    select.addEventListener("change", async (e) => {
        e.preventDefault()
        try{
          let res =  await axios.get(`http://localhost:6000/users/${e.target.id}/cars`, fillUlWithCars, carsForOneUser)
          debugger
        }catch(err){
            console.log(err)
        }
    })
    
    
    fetchData("http:/localhost:6000/cars", fillUlWithCars, allCars)
    fetchData("http://localhost:6000/users", fillselectBar, select);
})
