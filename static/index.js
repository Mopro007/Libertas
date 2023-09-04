var i = 0;
var slogan = 'For a Free New World';
function typeWriter() {
  if (i < slogan.length) {
    document.getElementById('slogan').innerHTML += slogan.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter()

const form = document.getElementById("connect_form")
const sbmt_btn_1 = document.getElementById("sbmt_btn_1")
sbmt_btn_1.addEventListener("click",SubmitForm)
//the function that sends the data to the server side after checking them
function SubmitForm(event){
    //stopping the form from refreshing the page
    event.preventDefault();
    //taking the inputs and storing them in variables
    let name = document.getElementById("UserName").value.trim();
    let email = document.getElementById("Email").value.trim();
    let message = document.getElementById("Message").value.trim();
    //checking the inputs using RegEx
    const nameRegex = /^[a-zA-Z\s]+$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!nameRegex.test(name) || !emailRegex.test(email)){
        document.getElementById("Error_Message").innerHTML = "Please input valid Name and Email"
        form.reset();
    }
    else{
        //converting the data to JSON format before sending it to the server side
        const Object_Message = {"name":name,"email":email,"message":message}
        const Json_message = JSON.stringify(Object_Message)
        //sending the JSON formatted data to the server side
        fetch('/SubmitForm', {method: 'POST',headers: {'Content-Type': 'application/json'},body: Json_message,credentials:"include"})
        .then(response => {if (!response.ok) {throw new Error('Network response was not ok');}return response.json();})
        .then(data => {console.log('Response data:', data);})
        .catch(error => {console.error('There was a problem with the fetch operation:', error);});
    }    
}

const interested_btn_1 = document.getElementById("interested_btn_1")
const interested_btn_2 = document.getElementById("interested_btn_2")
interested_btn_1.addEventListener("click",temp => {window.which_commodity = "Odyssey",Interested_Func()})
interested_btn_2.addEventListener("click",temp => {window.which_commodity = "Nomad Space",Interested_Func()})
function Interested_Func(){
  const interest_screen = document.getElementById("interest_screen")
  interest_screen.style.display = "flex";
  interest_screen.style.flexFlow = "column nowrap";
  interest_screen.style.alignItems = "center";
  interest_screen.style.justifyContent = "center";
}
const exit_btn = document.getElementById("exit_btn")
exit_btn.addEventListener("click",exit)
function exit(event){
  event.preventDefault()
  const interest_screen = document.getElementById("interest_screen")
  interest_screen.style.display = "none";
}

const sbmt_btn_2 = document.getElementById("sbmt_btn_2")
sbmt_btn_2.addEventListener("click",sbmt_intrst_form)
function sbmt_intrst_form(event){
  event.preventDefault()
  const email = document.getElementById("Email_2").value.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!emailRegex.test(email)){
      document.getElementById("Error_Message_2").innerHTML = "Please input valid Email"
      form.reset();
    }
  const Interest_options = document.getElementsByName("option")
  for(i = 0 ; i < 3 ; i++){
    if(Interest_options[i].checked){
        const Object_Message = {"email":email,"interest_lvl":Interest_options[i].value,"commodity":window.which_commodity}
        const Json_message = JSON.stringify(Object_Message)
        fetch('/sbmt_intrst_from', {method: 'POST',headers: {'Content-Type': 'application/json'},body: Json_message,credentials:"include"})
        .then(response => {if (!response.ok) {throw new Error('Network response was not ok');}return response.json();})
        .then(data => {console.log('Response data:', data);})
        .catch(error => {console.error('There was a problem with the fetch operation:', error);});
    }
  }
  const interest_screen = document.getElementById("interest_screen")
  interest_screen.style.display = "none";
}