
class party{
   constructor(partyName,partyDateTime,partyLocation,partyDescription){
    
     this.name = partyName;
     this.description = partyDescription;
     this.date = partyDateTime; 
     this.location = partyLocation;     
   }
}

let partyNameArr = [
    "Strawberry Party",
    "Cakes Party",
    "Family Party",
    "Disco 80's Party",
    "Rock Party",
    "Abba Party",
    "Beer Party",
    "Food Party"
  ];

let monthArr = [5, 6, 7, 8, 9, 10, 11, 12];

let dayArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

let hourArr = [21,22,23];

let minutesArr = [15,20,30,35,40,45]

let locationArr = ["Brooklyn (NY)", "Miami (FL)", "Boston (MA)", "San Francisco (CA)", "Houston (TX)"];

let descriptionArr = ["300-500 people will arrive","250-650 people will arrive","600-1500 people will arrive","1000-2500 people will arrive"]

let ul = document.querySelector("ul");
const formSubmit = document.getElementById("all_parties");
const myForm = document.getElementById("myform");

let numOfParties;
let randomPartyName;
let randomMonth;
let randomDay;
let randomHours;
let randomMinutes;
let randomLocation;
let randomDescription;
let partyObj;
let deleteButton;
let partyArr = [];
let date;
let partyName;
let partyDate;
let partyDescription;
let partyLocation;

function createRandomDataIndexes(){  
    randomPartyName = Math.floor(Math.random() * partyNameArr.length);
    randomMonth = Math.floor(Math.random() * monthArr.length);
    randomDay = Math.floor(Math.random() * dayArr.length);
    randomHours = Math.floor(Math.random() * hourArr.length);
    randomMinutes = Math.floor(Math.random() * minutesArr.length);
    randomLocation = Math.floor(Math.random() * locationArr.length);  
    randomDescription = Math.floor(Math.random() * descriptionArr.length);
}


const createParty = async (party) =>{
    try {
         let response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-ftb-mt-web-pt/events', {
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                cohortId: 118,
                name: party.name,
                date: party.date,
                location: party.location,
                description: party.description
            })
        });

        const data = await response.json();
        console.log ("data: ",data); 

        return true;
        
    } catch (e) {
        console.error('Failed to create a party!');
        console.error(e);
        return false;
    }
};

const getAllParties = async () => {
    try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-ftb-mt-web-pt/events');
        const data = await response.json();
        const dataArr = data.data;
        //ul.innerHTML = "";
        for(let i = 0; i < dataArr.length; i++){
          let li = document.createElement("li");
              li.innerHTML = `Party ID: ${dataArr[i].id} <br />` +
                             `Party Name: ${dataArr[i].name} <br />` + 
                             `Party Date: ${dataArr[i].date} <br />` + 
                             `Party Location: ${dataArr[i].location} <br />` + 
                         `Party Description: ${dataArr[i].description} <br />`;             
           deleteButton = document.createElement("button");
           deleteButton.id = dataArr[i].id;
           deleteButton.textContent = "Delete Party";
           li.id = "li" + dataArr[i].id;
           li.appendChild(deleteButton);                
           ul.appendChild(li);
        } 
        console.log('Data: ', dataArr);

    } catch (e) {
        console.error(`Failed to retrieve all parties.`);
        console.error(e);
    }
};

const deleteParty = async (id) => {
  try{
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-ftb-mt-web-pt/events/' + id,{
        method: 'DELETE'
    });
     
    document.getElementById("li" + id).remove();
    document.getElementById(id).remove();

    console.log("Delete Response: ",response);

   }catch (e) {
        console.error(`Failed to delete item whose id: `, id);
        console.error(e);
    }
}

const startApp = async () => {
    try {
              
        createRandomDataIndexes();
        date = new Date(2024,monthArr[randomMonth],dayArr[randomDay],hourArr[randomHours],minutesArr[randomMinutes]); 
        partyObj = new party(partyNameArr[randomPartyName],date,
                                locationArr[randomLocation],descriptionArr[randomDescription]);
        
        await createParty(partyObj);
        await getAllParties();
 
    }     
        catch (e) {
        console.error('Failed to start application!');
        console.error(e);
       }
};


/*nameInput.addEventListener("change", (e) => {
    if((e.target.value != null) && (e.target.value != "") && (e.target.value!=undefined))
      partyName = e.target.value;
    
}); 

dateInput.addEventListener("change", (e) => {
    if((e.target.value != null) && (e.target.value != "") && (e.target.value!=undefined))
      partyDate = e.target.value;
}); 

locationInput.addEventListener("change", (e) => {
    if((e.target.value != null) && (e.target.value != "") && (e.target.value!=undefined))
      partyLocation = e.target.value;
});

descriptionInput.addEventListener("change", (e) => {
    if((e.target.value != null) && (e.target.value != "") && (e.target.value!=undefined))
      partyDescription = e.target.value;
});*/




formSubmit.addEventListener("submit", (e) => { 
    deleteParty(e.submitter.id); 
    getAllParties(); 
    e.preventDefault();
      
  });


myForm.addEventListener("submit",(e) => { 
     //console.log("In Party"); 
     //console.log("partyName:",partyName)
    //if((partyName != "") && (partyDate != "") && (partyLocation !="") && (partyDescription !="")){
        let nameInput = document.getElementById("name");
        let dateInput = document.getElementById("date");
        let locationInput = document.getElementById("location");
        let descriptionInput = document.getElementById("description");
       let partyObj = new party(nameInput.value,dateInput.value,locationInput.value,descriptionInput.value);
       createParty(partyObj);
       getAllParties();
       //e.preventDefault();
    //}   
      
  }); 

startApp();
