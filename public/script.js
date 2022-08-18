const socket = io.connect("http://10.66.90.60:1234");

const nickname = document.querySelector("#nickname");
const message = document.querySelector("#message");
const button = document.querySelector(".send");
const output = document.querySelector(".output");
button.addEventListener("click", e => {
    e.preventDefault();

    socket.emit("chat", { nickname: nickname.value, message: message.value });
});

socket.on("chat", chat => {
    output.innerHTML += `<p><strong>${chat.nickname}: </strong>${chat.message}</p>`;
});