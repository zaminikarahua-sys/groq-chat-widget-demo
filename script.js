const API_KEY = "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";

let userIP = "";
let isNewUser = false;

// GET IP (simple memory key)
async function getIP(){
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  userIP = data.ip;

  checkMemory();
}

// CHECK MEMORY
function checkMemory(){
  const memory = localStorage.getItem("asha_" + userIP);

  if(!memory){
    isNewUser = true;
    localStorage.setItem("asha_" + userIP, "seen");
  }
}

// START CHAT
function startChat(){
  document.getElementById("welcome").style.display="none";
  document.getElementById("chatBox").style.display="block";

  if(isNewUser){
    add("👋 Hi! I'm Asha Bogorian Assistant. Nice to meet you!","bot");
  } else {
    add("👋 Welcome back! Good to see you again.","bot");
  }
}

// TOGGLE CHAT
function toggleChat(){
  document.getElementById("chatBox").style.display="block";
}

// QUICK MESSAGE
function quick(text){
  document.getElementById("input").value = text;
  send();
}

// SEND MESSAGE
async function send(){
  const input = document.getElementById("input");
  const text = input.value;
  if(!text) return;

  add(text,"user");
  input.value="";

  add("Thinking...","bot");

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${API_KEY}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      model:"llama3-8b-8192",
      messages:[
        {
          role:"system",
          content:"You are Asha Bogorian Assistant. Friendly, helpful, short answers for home product shopping."
        },
        {role:"user",content:text}
      ]
    })
  });

  const data = await res.json();

  document.querySelector(".bot:last-child").remove();
  add(data.choices[0].message.content,"bot");
}

// ADD MESSAGE
function add(text,type){
  const box = document.getElementById("messages");
  const div = document.createElement("div");
  div.className="msg "+type;
  div.innerText=text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

// INIT
getIP();
