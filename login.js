document.getElementById("btn-signin").addEventListener("click",function(){
    const userInput=document.getElementById("input-user");
    const username=userInput.value;
    console.log(username);

const inputpassword=document.getElementById("input-password");
const password=inputpassword.value;
console.log(password);

if (username=="admin" && password=="admin123"){
    window.location.assign("home.html")
}

});

