import { Socket } from "./modules/socket.js";
import { Messages } from "./modules/messages.js";
import { Username } from "./modules/username.js";
import { MessageForm } from "./modules/message-form.js";

document.addEventListener("DOMContentLoaded", () => {
  const socket = new Socket();
  const username = new Username("#username");
  const messages = new Messages("#messages");
  const messageForm = new MessageForm("#messageForm");

  socket.onSetUserName(name => {
    username.render(name);
    messages.renderSystemMessage(`${name} assigned to you.`);
  });
  socket.onUserJoined(name => {
    messages.renderSystemMessage(`${name} joined.`);
  });
  socket.onUserLeft(name => {
    messages.renderSystemMessage(`${name} left.`);
  });
  socket.onChatMessage(({ name, message }) => {
    messages.renderMessage(name, message);
  });
  messageForm.onSubmit(socket.emitChatMessage);
});
