const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies"

const dropdowns =document.querySelectorAll(".dropdown select")
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");



for (let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from"&&currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to"&& currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate=async()=>{
    let amt=document.querySelector(".amount input");
    let amtValue=amt.value;
    if(amtValue===""||amtValue<1){
        amtValue=1;
        amt.value="1";
    }
    //console.log(fromCurr.value,toCurr.value);

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;
    let response=await fetch(URL);
    let data=await response.json();
    console.log(data);

    if (data[fromCurr.value.toLowerCase()] && data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]) {
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        let finalAmt = amtValue * rate;
        msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
    } else {
        msg.innerText = `Exchange rate not found for ${fromCurr.value} to ${toCurr.value}`;
    }


}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img =element.parentElement.querySelector("img");
    img.src=newSrc;
};


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});

window.addEventListener("load",()=>{
    updateExchangeRate();

})

