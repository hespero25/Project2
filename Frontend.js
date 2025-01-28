const Base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";  //this api code is not working that's why this code could'nt convert currency //
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;                                               //here i change the src of the img as per the country code// 
};

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();                //this funcition use to handle evt control by own hand <after click form button page does'nt reload without my code permission>//
    let amount = document.querySelector(".amount input");
    let amount_val=amount.value;
    if(amount_val==="" || amount_val<1){
        amount_val=1;
        amount.value="1";
    }
    
    
const url=`${Base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
 let response= await fetch(url);
 let data = await response.json();
 let rate=data[tocurr.value.toLowerCase()];
 console.log(rate);

 let totalamount=amount_val*rate;
 msg.innerText=`${amount_val} ${fromcurr.value} = ${totalamount} ${tocurr.value}`;
});
















