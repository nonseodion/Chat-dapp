import { contract, signer, checkAddress } from "./script.js";

const template = `
  <div class="message">
    <h3 id="sender">From: </h3>
    <div id="text">Text:</div>
  </div>
`;

//fetch inbox
(async () => {
  const address = await checkAddress();
  if (!address) return;
  const inbox = await contract.getInbox(address);
  inbox.length && fillInbox(inbox);
})();

function fillInbox(inbox) {
  const messagesEle = document.querySelector(".messages");
  messagesEle.innerHTML = "";
  inbox.forEach((message) => {
    const messageCont = document.createElement("div");
    messageCont.innerHTML = template;
    messageCont.querySelector("#sender").innerHTML += message[0];
    messageCont.querySelector("#text").innerHTML += message[1];
    console.log(messageCont);
    messagesEle.innerHTML += messageCont.innerHTML;
  });
}
