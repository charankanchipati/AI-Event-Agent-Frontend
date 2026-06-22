const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");

let lastPlan = "";


// ===============================
// USER + CHAT ID
// ===============================

let userId = localStorage.getItem("userId");

let chatId = localStorage.getItem("chatId");



if(!userId){

    userId = "user_" + Date.now();

    localStorage.setItem(
        "userId",
        userId
    );

}



if(!chatId){

    chatId = "chat_" + Date.now();

    localStorage.setItem(
        "chatId",
        chatId
    );

}




// ===============================
// PAGE LOAD
// ===============================


window.onload = ()=>{

    loadHistory();

    loadChat();

};




// ===============================
// LOAD SIDEBAR HISTORY
// ===============================


async function loadHistory(){


try{


const response = await fetch(

`http://localhost:5002/api/history/${userId}`

);



const chats = await response.json();



const historyBox =
document.getElementById("history");



historyBox.innerHTML="";



chats.forEach(chat=>{


// hide current chat

if(chat.chatId === chatId){

return;

}



const div =
document.createElement("div");



div.className =
"history-item";



div.innerText =
chat.title || "Old Chat";




div.onclick = ()=>{


chatId = chat.chatId;



localStorage.setItem(

"chatId",

chatId

);



loadChat();



};



historyBox.appendChild(div);



});



}

catch(error){

console.log(
"History Error:",
error
);


}


}




// ===============================
// LOAD SELECTED CHAT
// ===============================


async function loadChat(){



try{


const response = await fetch(

`http://localhost:5002/api/chats/${userId}/${chatId}`

);



const chats =
await response.json();



chatBox.innerHTML="";



chats.forEach(chat=>{


addMessage(

chat.text,


chat.role === "assistant"

?

"bot"

:

"user"


);



});



}


catch(error){


console.log(

"Load Chat Error:",
error

);


}


}







// ===============================
// ADD MESSAGE
// ===============================


function addMessage(text,type){



const div =
document.createElement("div");



div.className = type;



div.innerText = text;



chatBox.appendChild(div);



chatBox.scrollTop =
chatBox.scrollHeight;


}







// ===============================
// EVENT BUTTONS
// ===============================


function selectEvent(eventType){


addMessage(

eventType,

"user"

);


sendMessage(eventType);


}







// ===============================
// SEND MESSAGE
// ===============================


async function sendMessage(initialMessage=null){



let message;



if(initialMessage){


message = initialMessage;


}

else{


message =
input.value.trim();


if(!message)

return;



addMessage(

message,

"user"

);


input.value="";


}




try{


const typing =
document.createElement("div");



typing.className="bot";


typing.id="typing";


typing.innerText="🤖 Typing...";



chatBox.appendChild(typing);





const response =
await fetch(

"http://localhost:5002/api/chat",

{

method:"POST",


headers:{

"Content-Type":

"application/json"

},


body:JSON.stringify({

userId,

chatId,

message

})


}

);





const data =
await response.json();





document
.getElementById("typing")
?.remove();





addMessage(

data.reply,

"bot"

);



lastPlan=data.reply;




// update sidebar

loadHistory();



}


catch(error){



console.log(error);



document
.getElementById("typing")
?.remove();



addMessage(

"Unable to connect backend",

"bot"

);



}


}








// ===============================
// NEW CHAT
// ===============================


function newChat(){



chatId =
"chat_" + Date.now();



localStorage.setItem(

"chatId",

chatId

);



chatBox.innerHTML="";



}








// ===============================
// CLEAR CHAT
// ===============================


function clearChat(){



chatBox.innerHTML="";


}







// ===============================
// DOWNLOAD
// ===============================


function downloadPlan(){



if(!lastPlan){


alert(
"No plan available"
);


return;


}



const file =
new Blob(

[lastPlan],

{

type:"text/plain"

}

);



const link =
document.createElement("a");



link.href =
URL.createObjectURL(file);



link.download =
"AI_Event_Plan.txt";



link.click();



}







// ENTER BUTTON


input.addEventListener(

"keypress",

(e)=>{


if(e.key==="Enter"){


sendMessage();


}


}

);
// const chatBox = document.getElementById("chatBox");

// const input = document.getElementById("messageInput");

// let lastPlan = "";
// // const userId = "user1";

// // Create / keep user id

// let userId = localStorage.getItem("userId");
// let chatId =
// localStorage.getItem("chatId");

// // let chatId = localStorage.getItem("chatId");


// if(!chatId){

//     chatId = Date.now().toString();

//     localStorage.setItem(
//         "chatId",
//         chatId
//     );

// }
// if(!chatId){

// chatId =
// "chat_" + Date.now();


// localStorage.setItem(
// "chatId",
// chatId
// );

// }

// if (!userId) {
//   userId = "user_" + Date.now();

//   localStorage.setItem("userId", userId);
// }

// // Load old chat when page opens

// window.addEventListener("load", () => {
//   loadChatHistory();
// });

// // Load chat from MongoDB

// async function loadChatHistory() {
//   try {
//     const response = await fetch(
//     "http://localhost:5002/api/chat",
//     {
//         method:"POST",

//         headers:{
//             "Content-Type":
//             "application/json"
//         },

//         body:JSON.stringify({

//             userId,

//             chatId,

//             message

//         })
//     }
// );

//     const chats = await response.json();

//     chats.forEach((chat) => {
//       addMessage(
//         chat.text,

//         chat.role === "assistant" ? "bot" : "user",
//       );
//     });
//   } catch (error) {
//     console.log("History Error:", error);
//   }
// }

// function addMessage(text, type) {
//   const div = document.createElement("div");

//   div.className = type;

//   div.innerText = text;

//   chatBox.appendChild(div);

//   chatBox.scrollTop = chatBox.scrollHeight;
// }

// function selectEvent(eventType) {
//   addMessage(
//     eventType,

//     "user",
//   );

//   sendMessage(eventType);
// }

// async function sendMessage(initialMessage = null) {
//   let message;

//   if (initialMessage) {
//     message = initialMessage;
//   } else {
//     message = input.value.trim();

//     if (!message) return;

//     addMessage(
//       message,

//       "user",
//     );

//     input.value = "";
//   }

//   try {
//     const typingDiv = document.createElement("div");

//     typingDiv.className = "bot";

//     typingDiv.id = "typing";

//     typingDiv.innerText = "🤖 Typing...";

//     chatBox.appendChild(typingDiv);

//     const response = await fetch(
//       "http://localhost:5002/api/chat",

//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           userId: userId,

//           message: message,
//         }),
//       },
//     );

//     const data = await response.json();

//     document.getElementById("typing")?.remove();

//     addMessage(
//       data.reply,

//       "bot",
//     );

//     lastPlan = data.reply;
//   } catch (error) {
//     console.log(error);

//     document.getElementById("typing")?.remove();

//     addMessage(
//       "Unable to connect to backend.",

//       "bot",
//     );
//   }
// }

// function downloadPlan() {
//   if (!lastPlan) {
//     alert("No event plan available yet.");

//     return;
//   }

//   const file = new Blob(
//     [lastPlan],

//     {
//       type: "text/plain",
//     },
//   );

//   const link = document.createElement("a");

//   link.href = URL.createObjectURL(file);

//   link.download = "AI_Event_Plan.txt";

//   link.click();
// }

// function clearChat() {
//   chatBox.innerHTML = "";

//   localStorage.removeItem("userId");

//   userId = "user_" + Date.now();

//   localStorage.setItem(
//     "userId",

//     userId,
//   );
// }

// input.addEventListener(
//   "keypress",

//   function (e) {
//     if (e.key === "Enter") {
//       sendMessage();
//     }
//   },
// );
