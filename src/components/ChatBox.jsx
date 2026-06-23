import { useState, useEffect, useRef } from "react";
import axios from "axios";


function ChatBox({setMemory}){


const [message,setMessage] = useState("");

const [messages,setMessages] = useState([]);

const [status,setStatus] = useState("Ready 🟢");

const chatEndRef = useRef(null);
useEffect(()=>{


chatEndRef.current?.scrollIntoView({

behavior:"smooth"

});


},[messages]);

const userId =
localStorage.getItem("userId");



const [chatId] = useState(()=>{


let id =
localStorage.getItem("chatId");


if(!id){


id =
"chat_" + Date.now();


localStorage.setItem(
"chatId",
id
);


}


return id;


});





async function sendMessage(){


if(!message.trim())
return;



const userText = message;
setMessages(prev=>[

...prev,

{

role:"user",

text:userText

}

]); 



const lower =
userText.toLowerCase();



setMemory(prev=>({


event:
lower.includes("birthday")
?
"Birthday"
:
prev.event,


guests:
lower.includes("50")
?
"50"
:
prev.guests,


budget:
lower.includes("50000")
?
"₹50000"
:
prev.budget,


location:
lower.includes("hyderabad")
?
"Hyderabad"
:
prev.location



}));



setMessage("");



try{


setStatus("Thinking 🤔");



await new Promise(
resolve=>setTimeout(resolve,800)
);



setStatus("Planning 📋");



const response =
await axios.post(

"https://ai-event-agent-gqnk.onrender.com/api/chat",
// "http://localhost:5002/api/chat",


{

userId:userId,

chatId:chatId,

message:userText

}

);



setMessages(prev=>[

...prev,

{

role:"assistant",

text:response.data.reply

}

]);



setStatus("Completed ✅");



setTimeout(()=>{

setStatus("Ready 🟢");

},2000);



}

catch(error){


console.log(error);



setStatus("Error ❌");



setMessages(prev=>[

...prev,

{

role:"assistant",

text:"AI service unavailable"

}

]);


}



}







return(


<div className="chat-container">


<h3>

Agent Status:

<span>

{status}

</span>


</h3>



<div className="messages">


{

messages.map((msg,index)=>(


<div

key={index}

className={
msg.role==="user"
?
"user-msg"
:
"bot-msg"
}

>

{msg.text.split("\n").map((line,index)=>(

<p key={index}>

{line}

</p>
))}

</div>


))


}
<div ref={chatEndRef}></div>



</div>




<div className="input-area">


<input


value={message}


onChange={(e)=>
setMessage(e.target.value)
}


placeholder="Ask your event plan..."

/>



<button onClick={sendMessage}>

Send

</button>


</div>



</div>


)


}


export default ChatBox; 