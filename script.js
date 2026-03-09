
let allIssues =[];
const cardsContainer=document.getElementById("cardsContainer");

async function loadIssues(){
   const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
   const issue = await res.json();

   allIssues =issue.data;
   displayIssues(allIssues);
}
function displayIssues(datas){
   cardsContainer.innerHTML="";
   document.getElementById("issueCount").innerText=datas.length+" Issues"
     datas.forEach((data)=>{
      const card=document.createElement("div");
     const borderColor =
      data.status === "open"?"border-green-500" : "border-purple-500";

    card.innerHTML = `
    <div class="border-t-4 ${borderColor} rounded-md shadow-md">
    
      <div class="flex justify-between items-center p-5">
        <img src="assets/Open-Status.png">
        <div class="badge badge-soft badge-error">${data.priority}</div>
      </div>

      <div class="p-5">
        <h3 class="text-[14px] font-semibold">${data.title}</h3>
        <p class="text-[12px]">${data.description}</p>

        ${data.labels.map((label) =>`<div class="badge badge-soft badge-warning">${label}</div>`)
          .join("")}

        <br><br><hr>
      </div>

      <div class="p-5">
        <p>${data.author}</p>
        <p>${data.createdAt}</p>
      </div>

    </div>
    `;

    cardsContainer.appendChild(card);
  });
}

loadIssues();

document.getElementById("allTab").addEventListener("click",()=>{
   displayIssues(allIssues);
});

document.getElementById("openTab").addEventListener("click",()=> {
   const openIssues=allIssues.filter(issue=>issue.status==="open");
   displayIssues(openIssues);
});

document.getElementById("closeTab").addEventListener("click",()=> {
   const closeIssues=allIssues.filter(issue=>issue.status==="closed");
   displayIssues(closeIssues);
});