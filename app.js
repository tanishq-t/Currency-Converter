// A basic code to fetch data from an API.


/*const URL = "https://cat-fact.herokuapp.com/facts";       //Link of the API from where we are fetching the data

const getFacts= async ()=>{                               //Creating a function where we can use async and await to fetch data
    console.log("Getting data....");                       
    let response = await fetch(URL);                      //fetch() is used to fetch data from the API.
    console.log(response);                                //API - Application Programming Interface.
    let data = await response.json();                     //The .json() function is used to convert the JSON file to JS file.
    console.log(data[0].text);                            //Now we can use the data on the HTML file
}

getFacts();*/


const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";  //URL for currency conversion API

const dropdowns = document.querySelectorAll(".dropdown select");           //Selecting all the dropdown select elements
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");



window.addEventListener("load",()=>{
    updateExchangeRate();
})



for(let select of dropdowns){                                             // Traversing through the dropdowns 
    for(CurrCode in countryList){                                         //Traversing throgh the country codes
        let newOption = document.createElement("option");                 //Creating a new element option
        newOption.innerText = CurrCode;                                   //Adding the currency code to the option
        newOption.value = CurrCode;                                       //Adding the value to the option
        if(select.name === "from" && CurrCode === "USD"){
            newOption.selected="selected";
        }
        else if(select.name === "to" && CurrCode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);                                          //Appending all the codes to the dropdown menu
    }
    select.addEventListener("change",(ev)=>{   //Adding an event listner so that whenever the value of the dropdown changes then we get notified and we can perform a function on it.
        updateFlag(ev.target);                 //Calling a function called updateFlag which will change the image.
    });                                        //.target refers to the targeted element of the html code.
}

const updateFlag = (element)=>{
    let curCode = element.value;             //To get the value which we selected in the dropdown menu.
    let countryCode = countryList[curCode];   //To get the country code of the selected currency.
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;   //Getting the new image wrt the country code
    let img = element.parentElement.querySelector("img");             //Selecting the image element from the html code
    img.src=newsrc;         //Updating the src attribute in the image with the new image source
}


btn.addEventListener("click",(evt)=>{   //Adding an event listner to the exchange button
    evt.preventDefault();               //Stopping all the default functions of the form button like reloading of the website
    updateExchangeRate();
})

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    console.log(amtValue);
    if(amtValue === "" || amtValue<1){
        amtValue=1;
        amount.value="1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalamt = amtValue*rate;
    message.innerText = `${amount.value} ${fromCurr.value} = ${finalamt}${toCurr.value}`;
}
 