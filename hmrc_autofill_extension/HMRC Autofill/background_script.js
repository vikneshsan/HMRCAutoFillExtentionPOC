let scriptActivated = false;
let tabDetails;
let status_updates = {};

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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender, "background_script received a msg");
  if (message.id !== "irctc") {
    sendResponse("Invalid Id");
    return;
  }
  const type = message.msg.type;
  const data = message.msg.data;
  if (type === "activate_script") {
    chrome.tabs.create(
      {
        url: "file:///D:/source/MainSite/index.html",
        // url:"index.html",
      },
      (tab) => {
        tabDetails = tab;
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          // files: ["./content_script.js","./tesseract.js"]
          files: ["./content_script.js"]
        });
      }
    );
    sendResponse("Script activated");
  } else if (type === "status_update") {
    if (!status_updates[sender.id]) status_updates[sender.id] = [];

    status_updates[sender.id].push({
      sender: sender,
      data,
    });
  } else {
    sendResponse("Something went wrong");
  }
});


