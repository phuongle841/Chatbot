const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatboxToggler = document.querySelector(".chatbox-toggler");
const chatboxCloseBtn = document.querySelector(".close-btn");


let userMessage;
// This is the place to put chatgpt api key, I I HAVE ONE D:
const API_KEY ="";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi=(message,className)=>{
    // create a <chatLi> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>`:`<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}
const GernerateResponse =(incomingChatLI)=>{
    const API_URL ="https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLI.querySelector("p");

    // define the properties and message for the API request 
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
    // send POST request to APR, get response 
    fetch(API_URL,requestOptions).then(res =>res.json()).then(data =>{
        messageElement.chatContent = data.choices[0].message.content;
    }).catch((error)=>{
        messageElement.classList.add("error");
        messageElement.chatContent = "oops, Something went wrong. Please try again .";
    }).finally(()=>chatbox.scrollTo(0, chatbox.scrollHeight));
}
const handleChat =()=>{
    userMessage = chatInput.value.trim();
    if (!userMessage) {
        return;
    }    
    chatInput.value = "";
    // append the user to the chat box
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);

    setTimeout(() => {
        //  display "thinking..." message while waiting for the response 
        const incomingChatLI = createChatLi("thinking...","incoming");
        chatbox.appendChild(incomingChatLI);
        GernerateResponse(incomingChatLI);
        chatbox.scrollTo(0,chatbox.scrollHeight);
    }, 600);
}
chatInput.addEventListener("input",()=>{
    // adjust the height  of the input text area based on it's content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`

});
sendChatBtn.addEventListener("click",handleChat);
chatboxCloseBtn.addEventListener("click",()=>document.body.classList.remove("show-chatbox"))
chatboxToggler.addEventListener("click",()=>document.body.classList.toggle("show-chatbox"))


