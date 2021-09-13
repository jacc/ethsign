var address;

window.addEventListener("load", async () => {
  window.ethereum.on("chainChanged", (chainId) => {
    location.reload();
  });

  if (window.ethereum != null) {
    web3 = new Web3(window.ethereum);
    try {
      let addresses = await ethereum.request({
        method: "eth_requestAccounts",
      });
      address = addresses[0];
      document.getElementById(
        "wallet"
      ).innerHTML = `wallet connected: ${address}`;
    } catch (error) {
      document.getElementById(
        "wallet"
      ).innerHTML = `wallet connection error, refresh the page and try again`;

      document.getElementById("form").innerHTML = ``;
    }
  }
});

function sign() {
  event.preventDefault();
  var message = document.getElementById("message").value;
  const tx = ethereum
    .request({
      method: "personal_sign",
      params: [address, message.toString()],
    })
    .then((res) => {
      var tip = `<pre>tip me! <button onclick="tip('1000000000000000');">.001 eth</button> <button onclick="tip('10000000000000000');">.01 eth</button> <button onclick="tip('100000000000000000');">.1 eth</button></pre>`;
      var share = `<button onclick="location.href='https://twitter.com/intent/tweet?text=I%20just%20signed%20a%20message%20with%20hash%20${res}%20on%20%40laf0nd%27s%20EthSign%20-%20check%20it%20out%20at%20https%3A%2F%2Fsign.jack.link'">share on twitter</button>`;
      document.getElementById(
        "sig"
      ).innerHTML = `successfully signed!\n\naddress: ${address}\nmsg signature hash: ${res}\nmessage: ${message}\n\nverify your message on <a href="https://etherscan.io/verifySig" target="_blank">etherscan.io</a>\n${tip}${share}`;
    });
}

function tip(amount) {
  ethereum
    .request({
      method: "eth_sendTransaction",
      params: [
        {
          from: address,
          to: "0x0be6dfADB73F3D4Ec89CD1699fc3eD931639290F",
          value: window.web3.utils.numberToHex(amount).toString(),
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
}
