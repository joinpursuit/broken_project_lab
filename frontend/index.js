
    console.log("hello")
    let allCars = document.querySelector("#allCars");
    let select = document.querySelector("select");
    let carsForOneUser = document.querySelector("#carsForOneUser");
    
    
    const test = async () => {
        let res = await axios.get("http://localhost:3000/cars/test")
        debugger
    }
    test()
    
    // const fetchData = async (url) => {
    //     try {
    //         let res =  await axios.get("http://localhost:3000/cars")
    //         debugger
    //         // cb(res.data, domEl)
            
    //     } catch (error) {
    //         console.log(error, " something went wrong")
    //     }
    // }
    
    // const fillUlWithCars = (data, domEl) => {
    //     domEl.innerHTML = "";
    //     data.cars.forEach(el => {
    //         const li = document.createElement("li");
    //         li.innerText = `Brand: ${el.brand}, Model: ${el.model}, Year: ${el.year}`;
    //     })
    //     domEl.appendChild(li)
    // }
    // fetchData("http://localhost:3000/cars")
    
    
    // const fillSelectBar =  (data, domEl) => {
    //     data.forEach(user => {
    //         const option = document.createElement("option");
    //         option.innerHTLM = user.name;
    //         option.value = user.id;
    //         domEl.appendChild(option)
    //     })
    // }
    // fetchData("http://localhost:3000/users", fillselectBar(), select);
    
    // select.addEventListener("change", (e) => {
    //     fetchData(`http://localhost:3000/users/${e.target.id}/cars`, fillUlWithCars, carsForOneUser)
    // })
    
    
    
    