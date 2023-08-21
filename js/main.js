let inputText = document.querySelector('.input')
let pp=document.querySelector('.temp')
let pp1=document.querySelector('.temp1')
let pp2=document.querySelector('.temp2')
let img1 = document.querySelector('.img1')

// Variables
let map = window.localStorage.getItem("Location") || "cairo";
let jsData = null;
let saveLoc =map;
//Filter Side
let regExpArabic = /[^a-z][0-9]/ig
let filterLoc =null
filterLoc = map.replace(regExpArabic,"")
console.log(filterLoc)
//Server Side
let myRequest = new XMLHttpRequest();
myRequest.open("Get",`https://api.weatherapi.com/v1/current.json?key=940d705ebda04be0873213329232008&q=${filterLoc}&aqi=no`,true)
myRequest.send()


//Form Side
document.forms[0].onsubmit = function(e) {
    let condi = false
    if (inputText.value !== "" && inputText.value.length >= 3) {
        condi = true;
        saveLoc = inputText.value;
        window.localStorage.setItem("Location" ,saveLoc)
    }
    if (condi == false) {
        e.preventDefault();
    }
}

//Show Side
myRequest.onreadystatechange = function(){
    if(this.readyState === 4 && this.status ===200){
        jsData = JSON.parse(this.responseText)
        pp1.innerHTML=`${jsData.location.name}, ${jsData.location.country} `
        pp.innerHTML=`${jsData.current.temp_c}&deg;C.`;
        pp2.innerHTML=`${jsData.current.condition.text}`;
        img1.style.display="block"
        img1.setAttribute("src",`${jsData.current.condition.icon}`)
    }else{
        pp1.innerHTML="Error 404";
        pp2.innerHTML="Please Enter Valid City"
        img1.style.display="none"
    }
}