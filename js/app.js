// Country URL som kommer hämta information från ett API
const url = `https://restcountries.eu/rest/v2/all`



fetch(url)
    .then(
        function(response){
            //Returnerar data i json-format
            return response.json();
        }
    ).then(
        function(data){
            
            //För att få ut tre random land, så gångar jag ett random matte-tal med längden av datan vi får ut, alltså antalet länder.
            for(let i=0; i<3; i++){
                let random = Math.floor(Math.random()* data.length);
                
                //Definerar country variabeln med data från vårt API, hämtar ut namn, tidszon och flagga. Lägger "random" som index till data för att få it random lands data.
                let country = new Country(data[random].name,data[random].timezones[0],data[random].flag);

            
            //Kallar på funktionerna som finns i prototyp inom konstruktorn Country som ska lägga namn, tid och flagga i HTML
            country.displayName();
            country.displayTime();
            country.displayFlag();
            }

            
        }
    )




//Country-mall som tar emot datan från vårt fetch

function Country(name, timeZone, url){
    this.name = name;
    this.timeZone = timeZone;
    this.flagUrl = url;
}

//En prototyp-metod som visar namnet på vårt random land i vår h1:a
Country.prototype.displayName = function(){
    let body = document.body;
    let name = document.querySelector('h1'); 
    name.textContent = this.name;
    body.appendChild(name);
}

//En prototyp-metod som först visar tidszon på vårt random land i vår h3:a men som sedan byts ut mot tiden i landet.
Country.prototype.displayTime = function(){
    let body = document.body;
    let timeZone = document.querySelector('h3'); 
    timeZone.textContent = this.timeZone;
    body.appendChild(timeZone);


    
    /*Det var krångligt att veta vad som behövdes och inte behövdes men jag provade använda allt och kom till slut fram till något som fungerade.
    Här sparar jag min UTC tidzon från mitt random land i en variabel. Jag tar sedan siffran från tidszonen och och sparar den i en variabel. Jag tar också operatören och sparar i en variabel. Efter det så ändrar jag min string till ett nummer.
    Jag skapar en variabel för min date-metod.
    I min if-statement vill jag fånga upp de som har + eller - i sin UTC och använda det för att beräkna tiden.
    */

    let UTC = this.timeZone;
    console.log(typeof UTC);
    let subStringUTC = UTC.substr(4,2);
    let operatorUTC = UTC.substr(3,1);
    let UTCnumber = parseInt(subStringUTC);
    
    let time = new Date();

    if(operatorUTC === '+'){
        timeZone.textContent = `${time.getUTCHours()+(UTCnumber)} : ${time.getUTCMinutes()} `;
    } else if(operatorUTC === '-'){
        timeZone.textContent = `${time.getUTCHours()-(UTCnumber)} : ${time.getUTCMinutes()} `;
    } else{
        timeZone.textContent = `${time.getUTCHours()} : ${time.getUTCMinutes()} `;
    }



}

//En prototyp-metod som visar flaggan på vårt random land i vår img

Country.prototype.displayFlag = function(){
    let body = document.body;
    let img = document.querySelector('img'); 
    img.src = this.flagUrl;
    body.appendChild(img);
}

