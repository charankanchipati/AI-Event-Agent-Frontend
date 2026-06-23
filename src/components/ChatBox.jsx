import { useState, useEffect, useRef } from "react";
import axios from "axios";


function ChatBox(){


const [message,setMessage] = useState("");

const [messages,setMessages] = useState([]);

const [status,setStatus] = useState("Ready 🟢");


const chatEndRef = useRef(null);



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




// AUTO SCROLL

useEffect(()=>{


chatEndRef.current?.scrollIntoView({

behavior:"smooth"

});


},[messages]);





// SEND MESSAGE

async function sendMessage(){


if(!message.trim()) return;



const userMessage = message;



// show user message immediately

setMessages(prev=>[

...prev,

{

role:"user",

text:userMessage

}

]);



setMessage("");



try{


setStatus("Thinking 🤖");



const response = await axios.post(

"http://localhost:5002/api/chat",

{

userId:userId,

chatId:chatId,

message:userMessage

}

);





setMessages(prev=>[

...prev,

{

role:"assistant",

text:
response.data.reply || "No response"

}

]);



setStatus("Ready 🟢");



}

catch(error){


console.log(

"Chat Error:",

error

);



setMessages(prev=>[

...prev,

{

role:"assistant",

text:"AI service unavailable"

}

]);



setStatus("Error 🔴");


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


{

(msg.text || "")

.split("\n")

.map((line,i)=>(


<p key={i}>

{line}

</p>


))

}



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


onKeyDown={(e)=>{


if(e.key==="Enter"){

sendMessage();

}


}}


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