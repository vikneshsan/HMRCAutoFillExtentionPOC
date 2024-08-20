//live time ---------------------------------------------------------------------------------------------------------------------
var span = document.getElementById("span");
function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  span.textContent =
    ("0" + h).substr(-2) +
    ":" +
    ("0" + m).substr(-2) +
    ":" +
    ("0" + s).substr(-2);
}
//live time ---------------------------------------------------------------------------------------------------------------------
setInterval(time, 1000);
let finalData = {
  irctc_credentials: {},
  journey_details: {},
  extension_data: {
    book_at_tatkal_time: true,
  },
  passenger_details: [],
  infant_details: [],
  contact_details: {},
  gst_details: {},
  payment_preferences: {},
  travel_preferences: {},
  other_preferences: {},
};

const defaultValue = {
  gender: "M",
  nationality: "IN",
};

const errors = [];
let port;

window.addEventListener("load", () => {
  

  document
    .querySelector("#irctc-login")
    .addEventListener("change", setIRCTCUsername);
  document
    .querySelector("#irctc-password")
    .addEventListener("change", setIRCTCPassword);
  
//================================================================================================================================
  document.querySelector("#submit-btn-top").addEventListener("click", saveForm);
  document
    .querySelector("#load-btn-1-top")
    .addEventListener("click", () => loadUserData());
  document
    .querySelector("#clear-btn-top")
    .addEventListener("click", () => clearData());
  document
    .querySelector("#connect-btn-top")
    .addEventListener("click", connectWithBg);
  //================================================================================================================================
  document.querySelector("#submit-btn").addEventListener("click", saveForm);
  document
    .querySelector("#load-btn-1")
    .addEventListener("click", () => loadUserData());
  document
    .querySelector("#clear-btn")
    .addEventListener("click", () => clearData());
  document
    .querySelector("#connect-btn")
    .addEventListener("click", connectWithBg);
});

function setIRCTCUsername(e) {
  if (!finalData["irctc_credentials"]) finalData["irctc_credentials"] = {};
  finalData["irctc_credentials"]["user_name"] = e.target.value;
  console.log("data-update", finalData);
}

function setIRCTCPassword(e) {
  finalData["irctc_credentials"]["password"] = e.target.value;
  console.log("data-update", finalData);
}

function modifyUserData() {
  // finalData["irctc_credentials"]
  // finalData["journey_details"]
  finalData["irctc_credentials"] =
    finalData["irctc_credentials"]
      
}

function loadUserData() {
  chrome.storage.local.get(null, (loadData) => {
    debugger;
    if (Object.keys(loadData).length === 0) return;
    document.querySelector("#irctc-login").value =
      loadData.irctc_credentials.user_name;
    document.querySelector("#irctc-password").value =
      loadData.irctc_credentials.password;

    finalData = loadData;
  });
}

function getMsg(msg_type, msg_body) {
  return {
    msg: {
      type: msg_type,
      data: msg_body,
    },
    sender: "popup",
    id: "irctc",
  };
}

function saveForm() {
  modifyUserData();
  debugger;
  chrome.storage.local.set(finalData);
}
function clearData() {
  chrome.storage.local.clear();
}

function connectWithBg() {
  startScript();
}

function startScript() {
  chrome.runtime.sendMessage(
    getMsg("activate_script", finalData),
    (response) => {
      console.log(response, "activate_script response");
    }
  );
}

// EA, FC, VC, VS  - no berth preference available
