import { contract, signer, checkAddress } from "./script.js";

const send = document.querySelector("#send");

send.addEventListener("click", sendMessage);

async function sendMessage() {
  const to = document.querySelector("#to").value;
  const text = document.querySelector("#text").value;
  console.log(to, text);
  await contract.send(to, text);
  document.querySelector("#to").value = "";
  document.querySelector("#text").value = "";
}
