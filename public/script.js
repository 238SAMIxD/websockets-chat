const socket = io.connect("http://10.66.90.60:1234");

const nickname = document.querySelector("#nickname");
const message = document.querySelector("#message");
const button = document.querySelector(".send");
const online = document.querySelector(".online");
const output = document.querySelector(".output");
const feedback = document.querySelector(".feedback");

let typing = false;

button.addEventListener("click", e => {
    e.preventDefault();
    if(message.value.trim() == "") return;

    socket.emit("chat", { nickname: nickname.value, message: message.value });
    typing = false;
    message.value = "";
});

message.addEventListener("keyup", e => {
    if(e.key === "Enter") button.click();
    if(e.key === "Backspace") if(message.value.length <= 0) {
        socket.emit("stopTyping", { nickname: nickname.value });
        typing = false;
        return;
    }

    if(typing) return;
    
    socket.emit("typing", { nickname: nickname.value });
    typing = true;
});

socket.on("chat", chat => {
    output.innerHTML += `<p><strong>${chat.nickname}: </strong>${chat.message}</p>`;
    if(feedback.querySelector(`.n${chat.nickname}`) !== null) feedback.querySelector(`.n${chat.nickname}`).remove();
});

socket.on("typing", chat => {
    feedback.innerHTML += `<p class="n${chat.nickname}"><em>${chat.nickname}</em> is typing...</p>`;
});

socket.on("stopTyping", chat => {
    feedback.querySelector(`.n${chat.nickname}`).remove();
});

socket.on("online", number => {
    online.innerHTML = `Online: ${number}`;
});