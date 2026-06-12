const API_KEY = "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";

function toggleChat(){
  const box = document.getElementById("chatBox");
  box.style.display = (box.style.display === "flex") ? "none" : "flex";
}

/* FIX: always use flex */
document.getElementById("chatBox").style.flexDirection = "column";

async function send(){
  const input = document.getElementById("input");
  const text = input.value.trim();
  if(!text) return;

  add(text,"user");
  input.value="";

  add("Thinking...","bot");

  try{
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
            content:"You are Asha Bogorian Assistant. Friendly, short, helpful shopping assistant."
          },
          {role:"user",content:text}
        ]
      })
    });

    const data = await res.json();

    document.querySelector(".bot:last-child").remove();
    add(data.choices[0].message.content,"bot");

  } catch(err){
    document.querySelector(".bot:last-child").remove();
    add("Error connecting to AI","bot");
  }
}

function add(text,type){
  const box = document.getElementById("messages");

  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
