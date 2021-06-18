import { contract, signer, checkAddress } from "./script.js";

const template = `
  <div class="message">
    <h3 id="receiver">To: </h3>
    <div id="text">Text:</div>
  </div>
`;

//fetch outbox
(async () => {
  const address = await checkAddress();
  if (!address) return;
  const outbox = document.querySelector(".messages");

  const event = contract.filters.messageSent(address);
  const Events = await contract.queryFilter(event);
  if (!Events.length) return;

  outbox.innerHTML = "";
  Events.forEach((event) => {
    const div = document.createElement("div");
    div.innerHTML = template;
    div.querySelector("#receiver").innerHTML += event.args.receiver;
    div.querySelector("#text").innerHTML += event.args.text;
    outbox.innerHTML += div.innerHTML;
  });
})();
