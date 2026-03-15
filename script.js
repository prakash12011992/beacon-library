let seatsDiv = document.getElementById("seats");

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

/* Create 38 seats */

for(let i=1;i<=38;i++){

let btn=document.createElement("button");

btn.innerText=i;

btn.classList.add("seat");

/* check reserved seat */

if(bookings.find(b=>b.seat==i)){
btn.classList.add("reserved");
}else{
btn.classList.add("available");
}

/* seat click show seat number */

btn.onclick=function(){
document.getElementById("seatno").value=i;
};

seatsDiv.appendChild(btn);

}

/* seat booking */

function bookSeat(){

let name=document.getElementById("name").value;
let mobile=document.getElementById("mobile").value;
let seat=document.getElementById("seatno").value;

if(!name || !mobile || !seat){
alert("Please fill all fields");
return;
}

/* check seat already booked */

if(bookings.find(b=>b.seat==seat)){
alert("Seat already reserved");
return;
}

let today=new Date().toLocaleDateString();

let due=new Date();
due.setMonth(due.getMonth()+1);
due=due.toLocaleDateString();

/* save data */

bookings.push({
name:name,
mobile:mobile,
seat:seat,
date:today,
due:due,
mode:"offline"
});

localStorage.setItem("bookings",JSON.stringify(bookings));

alert("Seat Reserved Successfully");

location.reload();

}

/* Excel / CSV report download */

function downloadCSV(){

let csv="Seat,Name,Mobile,Fee Date,Due Date,Pay Mode\n";

bookings.forEach(b=>{
csv+=`${b.seat},${b.name},${b.mobile},${b.date},${b.due},${b.mode}\n`;
});

let blob=new Blob([csv],{type:"text/csv"});

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);
a.download="beacon-library-report.csv";

a.click();

}
