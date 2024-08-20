let user_data = {};

function getMsg(msg_type, msg_body) {
  return {
    msg: {
      type: msg_type,
      data: msg_body,
    },
    sender: "content_script",
    id: "irctc",
  };
}
function statusUpdate(status) {
  chrome.runtime.sendMessage(
    getMsg("status_update", { status, time: Date.now() })
  );
}

function addDelay(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function loadLoginDetails() {
  statusUpdate("login_started");
  const loginModal = document.querySelector("#divMain");

  const userNameInput = loginModal.querySelector(
    "input[type='text'][formcontrolname='userid']"
  );
  const passwordInput = loginModal.querySelector(
    "input[type='password'][formcontrolname='password']"
  );

  userNameInput.value = user_data["irctc_credentials"]["user_name"] ?? "";
  userNameInput.dispatchEvent(new Event("input"));
  userNameInput.dispatchEvent(new Event("change"));

  passwordInput.value = user_data["irctc_credentials"]["password"] ?? "";
  passwordInput.dispatchEvent(new Event("input"));
  passwordInput.dispatchEvent(new Event("change"));

  statusUpdate("login_pending");
}

function SubmitClick(){
  document.getElementById('submit').click();

}


window.onload = function (e) {
  chrome.storage.local.get(null, (result) => {
    user_data = result;
    console.log(user_data)
    loadLoginDetails();
    SubmitClick();//comment this line if you want to manual submit on main app.
  });
};
