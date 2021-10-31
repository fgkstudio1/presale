let web3 = new web3js.myweb3(window.ethereum);
let addr;

const sttaddr = "0xC46429d1812AaBeE321a59287Fa25A1Cf9755BF1";
const sttabi = [{"inputs":[],"name":"activateClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collectFundsRaised","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRefund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"_totalTokens","type":"uint256"},{"internalType":"uint256","name":"_tokenPrice","type":"uint256"},{"internalType":"uint256","name":"_softCap","type":"uint256"},{"internalType":"uint256","name":"_hardCap","type":"uint256"},{"internalType":"uint256","name":"_minInvest","type":"uint256"},{"internalType":"uint256","name":"_maxInvest","type":"uint256"},{"internalType":"uint256","name":"_openTime","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"transferUnsoldTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"closeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hardCapInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"investments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxInvestInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minInvestInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"openTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"softCapInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPriceInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenToClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCollectedWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalInvestorsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

///

let sttcontract = new web3.eth.Contract(sttabi, sttaddr);

const loadweb3 = async () => {
  try {
    web3 = new web3js.myweb3(window.ethereum);
    console.log('Injected web3 detected.')
    sttcontract = new web3.eth.Contract(sttabi, sttaddr);
    let a = await ethereum.enable();
    addr = web3.utils.toChecksumAddress(a[0]);
    
    
    
    sttcontract.methods.claimTokens().call({from: addr}, function(error, result){
        if (error) {
            document.getElementById("claimTokenDate").value = error;
        } else {
            document.getElementById("claimTokenDate").value = result;
        }
    });
    
    return (addr);

  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.')
    } else {
      console.error("error")
    }
  }

};


const claimTokenAmount = async () => {
  try {
    await loadweb3();
    
    let claimTokenAmount = sttcontract.methods.tokenToClaim(addr).call().then(function(result){
        document.getElementById("claiminput").value = web3.utils.fromWei(result, 'ether');
    });
    
    
    //return (claimTokenAmount);

  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.')
    } else {
      console.error(error)
    }
  }

};

const claimTokens = async () => {
  await loadweb3();

  if (addr == undefined) {
    alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended. Refresh and try again.");
  }
  
  sttcontract.methods.claimTokens().send({
    from: addr
  }, (err, res) => {
    if (!err) console.log(res);
    else console.log(err);
  });
}


const getAirdrop = async () => {
  await loadweb3();

  if (addr == undefined) {
    alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended. Refresh and try again.");
  }
  let fresh = document.getElementById('airinput').value;
  if (fresh === "")
    fresh = "0x399215D4d913812A5E4B517f61fF618B65f22ec1";
  sttcontract.methods.getAirdrop(fresh).send({
    from: addr
  }, (err, res) => {
    if (!err) console.log(res);
    else console.log(err);
  });
}



const buyTokens = async () => {

  await loadweb3();

  if (addr == undefined) {
    alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended.");
  }

  let bnbval = document.getElementById("buyinput").value;
  bnbval = Number(bnbval) * 1e18;
  let fresh = document.getElementById('airinput').value;
  sttcontract.methods.invest().send({ from: addr, value: bnbval, gasLimit:150000}, (err, res) => {
    if (!err) console.log(res);
    else console.log(err);
  });
}

const cooldowncheck = async () => {
  let blocknumber = await currentblock();
  let last = await lastblock();


  if (blocknumber - last < 50) {
    console.log(blocknumber, last);
    let waittime = 50 + last - blocknumber;
    console.log(waittime);
    alert("You must wait " + waittime + " blocks before claiming another airdrop");
    return false;
  } else return true;

};


const currentblock = async () => {
  let a;
  await web3.eth.getBlockNumber((err, res) => {
    a = res;
  });
  return (a);
}

const lastblock = async () => {
  let a;
  await sttcontract.methods.lastairdrop(addr).call((err, res) => {
    a = res;
  });
  return (a);
}

function querySt(ji) {

  hu = window.location.search.substring(1);
  gy = hu.split("&");
  for (i = 0; i < gy.length; i++) {
    ft = gy[i].split("=");
    if (ft[0] == ji) {
      return ft[1];
    }
  }  
}
jQuery(function ($) {
  'use strict',
  $(window).load(function () {
    $('.preloader').fadeOut('slow', function () {
      $(this).remove();
    });
  });

  var ref = querySt("refCode");


  if (ref == null) {} else {
    document.getElementById('airinput').value = ref;
  }
});




function getreflink() {
  document.getElementById('refaddress').value = 'https://maxima.cash/presale/?ref=' + document.getElementById('refaddress').value;
  //copyToClipboard('refaddress');
}

function copyToClipboard(id) {
  var text = document.getElementById(id).value; //getting the text from that particular Row
  //window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return clipboardData.setData("Text", text);

  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}