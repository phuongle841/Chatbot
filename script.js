const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY ="";

const createChatLi=(message,className)=>{
    // create a <chatLi> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p>${message}</p>`:`<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}
const GernerateResponse =()=>{
    const API_URL ="https://api.openai.com/v1/chat/completions";
    const requestOptions ={
        method: "POST",
        Headers: {
            "Content-Type":"application/json",
            "authorization":`Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages":[{role: "user", content: userMessage}]
        })
    }
}
const handleChat =()=>{
    userMessage = chatInput.value.trim();
    if (!userMessage) {
        return;
    }    
    // append the user to the chat box
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));

    setTimeout(() => {
        //  display "thinking..." message while waiting for the response 
        chatbox.appendChild(createChatLi("thinking...","incoming"));

    }, 600);
}
sendChatBtn.addEventListener("click",handleChat);


