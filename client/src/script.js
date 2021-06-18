//import { ethers } from "ethers";
import abi from "./abi.js";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const ethereum = window.ethereum;
const addressEle = document.querySelector(".address");

export const signer = provider.getSigner();
export const contract = new ethers.Contract(
  "0x77483DDC8a89aFfFF64d774b4239C905de643813",
  abi,
  signer
);

export async function checkAddress() {
  let address;
  try {
    address = await signer.getAddress();
  } catch (err) {
    console.log("not yet connected");
  }

  if (address) {
    addressEle.textContent = address;
  }
  return address;
}

checkAddress();

ethereum.on("accountsChanged", (accounts) => {
  location.reload();
});

addressEle.querySelector("button").addEventListener("click", async () => {
  await ethereum.request({ method: "eth_requestAccounts" });
  let address = await signer.getAddress();
  addressEle.textContent = address;
});
