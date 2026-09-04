console.log("Running the script");
const date = document.getElementById("date");
const timeStart=document.getElementById("time-start");
const timeEnd = document.getElementById("time-end");
const activity=document.getElementById("activity");
const place = document.getElementById("place");
const type= document.getElementById("type");
const notes=document.getElementById("notes");
const flag = document.getElementById("flag");
const free = document.getElementById("free");
const busy= document.getElementById("busy");
const submitButton= document.getElementById("submitButton");




const tableBody= document.getElementById("tableBody");


const createRow=()=>{
    
    let data=getData();

    if(data===undefined) return;

    const tr=document.createElement("tr");
    
    tr.innerHTML=`
        <td>${data[0]}</td>
        <td>${data[1]}</td>
        <td>${data[2]}</td>
        <td>${data[3]}</td>
        <td>${data[4]}</td>
        <td>${data[5]}</td>
        <td>${data[6]}</td>
        <td><img src="./images/${data[8]}.png" alt="${data[8]}" width="20" height="20"></td>
    `;

    tr.lastElementChild.style.backgroundColor=`${data[7]}`;
    
    return tr;
};


const getData=()=>{
     
    let data=[];
    data.push(date.value);
    data.push(timeStart.value);
    data.push(timeEnd.value);
    data.push(activity.value);
    data.push(place.value);
    data.push(type.value);
    data.push(notes.value);
    data.push(flag.value);

    // if the user didn't enter all the data
    for (let n of data){        
        if (!n) return undefined;
    }

    // if the user double checked 
    if(free.checked && busy.checked){
        return undefined;
    }

    
    if(free.checked){
        data.push(free.value);
        return data;
    }

    if(busy.checked){
        data.push(busy.value);
        return data;
    }
    return undefined;
    

};


submitButton.addEventListener("click",(e)=>{
    e.preventDefault();
    let row = createRow();
    tableBody.appendChild(row);

});
