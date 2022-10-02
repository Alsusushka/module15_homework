const wsUri = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
  
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  const glBtn = document.querySelector(".btn_gl");
  let check = true;
  
  let socket = new WebSocket(wsUri);
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }
  
  socket.onmessage = (event) => {
    if (check) {
      writeToChat(event.data, true);
    } else {
      check = true;
    }
  }
  
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
  
  sendBtn.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    writeToChat(input.value, false);
    socket.send(input.value);
    input.value = "";
  }
  
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }

  glBtn.addEventListener("click", sendGl);

  function sendGl() {
    if (!navigator.geolocation) {
      let value = 'Geolocation не поддерживается вашим браузером';
      socket.send(value);
      writeToChat(value, false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  const error = () => {
    let value = 'Невозможно получить ваше местоположение';
    writeToChat(value, false);
    socket.send(value);
  }
  
  const success = (position) => {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;
  
    let value = '<a href="https://www.openstreetmap.org/#map=18/' + latitude + '/' + longitude + '" >Геолокация</a>';
    writeToChat(value, false);
    check = false;
    socket.send(value);
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);