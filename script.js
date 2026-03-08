
const cardsContainer=document.getElementById("cardsContainer");

async function loadIssues(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const issue= await res.json();
    displayIssues(issue.data);
    
}

function displayIssues(datas){
       console.log(datas);
       datas.forEach((data) => {
        console.log(data);
        const card=document.createElement("div")
        card.className="card bg-white card bg-white container max-auto grid grid-cols-1 sm:grid-cols-4 gap-4"
        
        if (data.status==="open"){
            card.innerHTML=`<div class="border-t-4 border-green-500  rounded-md  shadow-md w-61">
            <div class="flex justify-between items-center p-5 ">
             <img src="assets/Open-Status.png">
             <div class="badge badge-soft badge-error">${data.priority}</div>
             
            </div>
            <div class=" p-5">
             <h3 class="text-[14px] font-semibold">${data.title}</h3>
             <p class="text-[12px]">${data.description}</p>
            
             <div class="badge badge-soft badge-error badge badge-soft badge-warning">${data.labels[0]}</div>
             <div class="badge badge-soft badge-warning">${data.labels[1]}</div><br><br><hr>
            </div> 
            
            <div class="p-5">
               <p>${data.author}</p>
               <p>${data.createdAt}</p>
            </div>
         </div>
            `;
        }

        else { 
            card.innerHTML=
            `<div class="border-t-4 border-purple-500  rounded-md  shadow-md w-61">
            <div class="flex justify-between items-center p-5 ">
             <img src="assets/Open-Status.png">
             <div class="badge badge-soft badge-error">${data.priority}</div>
             
            </div>
            <div class=" p-5">
             <h3 class="text-[14px] font-semibold">${data.title}</h3>
             <p class="text-[12px]">${data.description}</p>
             <div class="badge badge-soft badge-warning">${data.labels[0]}</div><br><br><hr>
            </div> 
            
            <div class="p-5">
               <p>${data.author}</p>
               <p>${data.createdAt}</p>
            </div>
         </div>
            `
        }
       
       cardsContainer.append(card);
       });
}
loadIssues();


