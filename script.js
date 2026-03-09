
let allIssues =[];
const cardsContainer=document.getElementById("cardsContainer");
const loadingSpinner=document.getElementById("loadingSpinner");
const issues_modal=document.getElementById("issues_modal");
const issueTitle=document.getElementById("issueTitle");
const issueStatus=document.getElementById("issueStatus");
const issueAuthor=document.getElementById("issueAuthor");
const issueDate=document.getElementById("issueDate");
const issueDescription=document.getElementById("issueDescription");
const issueAssignee=document.getElementById("issueAssignee");
const issuePriority=document.getElementById("issuePriority");
const issueName=document.getElementById("issueName");

async function loadIssues(){
   loadingSpinner.classList.remove("hidden");
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
        <h3 class="text-[14px] font-semibold"onclick="openIssueModal(${data.id})">${data.title}</h3>
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
    card.onclick = () => (data.id);
    cardsContainer.appendChild(card);
  });
}

async function openIssueModal(dataid){
   console.log(dataid,"dataid");
   const res= await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${dataid}`);
   const data = await res.json();
   const issueDetails=data.data;
   console.log(data,"data");
   console.log(issueDetails,"data")
   issues_modal.showModal();
   
   issueTitle.textContent=issueDetails.title;
   issueStatus.textContent=issueDetails.status;
   issueAuthor.textContent=issueDetails.aurhor;
   issueDate.textContent=issueDetails.date;
   issueDescription.textContent=issueDetails.description;
   issueAssignee.textContent=issueDetails.assignee;
   issueName.textContent=issueDetails.Name;
   issuePriority.textContent=issueDetails.priority;

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