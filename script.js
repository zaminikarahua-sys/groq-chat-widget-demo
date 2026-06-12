const API_KEY = "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";

async function send(){
  const input = document.getElementById("msg");
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
        {role:"system",content:"You are Asha Bogorian Assistant, a smart, friendly, modern AI chatbot that helps users with clear and simple answers."},
        {role:"user",content:text}
      ]
    })
  });

  const data = await res.json();

  document.querySelector(".bot:last-child").remove();
  add(data.choices[0].message.content,"bot");
}

function add(text,type){
  const box = document.getElementById("box");
  const div = document.createElement("div");
  div.className = "msg "+type;
  div.innerText = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
