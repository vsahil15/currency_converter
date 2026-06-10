const BASE_URL = "https://open.er-api.com/v6/latest";
const btn = document.querySelector(".btn");
const convertarea=document.querySelectorAll(".convert-area select");




for(code in countryList){
    console.log(code);
}

for(let select of convertarea)
{
    for(currcode in countryList)
    {
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        select.append(newoption);

    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;

};




btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const amtInput = document.querySelector('.input');
  const amount = parseFloat(amtInput.value);

  const fromCurr = document.querySelector(".from-container select").value.toUpperCase();
  const toCurr = document.querySelector(".to-container select").value.toUpperCase();

  // Build URL using open.er-api.com (free, no API key needed)
  const url = `${BASE_URL}/${fromCurr}`;
  console.log("Request URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("API response:", data);

    const rate = data.rates[toCurr];
    console.log("Rate:", rate);

    // Calculate conversion
    const converted = amount * rate;

    // Show result in message div
    const messageDiv = document.querySelector(".mess");
    messageDiv.innerText = `${amount} ${fromCurr} = ${converted.toFixed(4)} ${toCurr}`;
  }
  catch (err) {
    console.error("Error fetching or parsing:", err);
  }
});
