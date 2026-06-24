import { useState,useEffect,useRef } from "react";
import axios from "axios";


function ChatBox(){


const [message,setMessage]=useState("");

const [messages,setMessages]=useState([]);


const chatEndRef = useRef(null);



const userId =
localStorage.getItem("userId");



// const chatId =
// localStorage.getItem("chatId");






// AUTO SCROLL

useEffect(()=>{


chatEndRef.current?.scrollIntoView({

behavior:"smooth"

});


},[messages]);






// CLEAR NEW CHAT

useEffect(()=>{


function clearChat(){


setMessages([]);


}



window.addEventListener(

"newChat",

clearChat

);



return()=>{


window.removeEventListener(

"newChat",

clearChat

);


}



},[]);









// LOAD OLD CHAT

useEffect(()=>{


async function loadOldChat(){


const id =
localStorage.getItem("chatId");



if(!id)
return;



try{


const res = await axios.get(

`https://ai-event-agent-frontend.onrender.com/api/chats/${userId}/${id}`

);



setMessages(res.data);



}

catch(err){


console.log(
"Load chat error",
err
);


}



}




window.addEventListener(

"loadChat",

loadOldChat

);



loadOldChat();




return()=>{


window.removeEventListener(

"loadChat",

loadOldChat

);


}



},[userId]);











async function sendMessage(){


if(!message.trim())
return;



const text = message;


setMessage("");



setMessages(prev=>[

...prev,

{

role:"user",

text:text

}

]);




try{


const res = await axios.post(

"https://ai-event-agent-frontend.onrender.com/api/chat",

{


userId:userId,


chatId:
localStorage.getItem("chatId"),


message:text


}


);





setMessages(prev=>[

...prev,

{


role:"assistant",

text:res.data.reply


}

]);





window.dispatchEvent(

new Event("chatUpdated")

);




}

catch(error){


console.log(error);


}



}









return(



<div className="chat-container">





<h3>

Agent Status:
<span>🟢 Ready</span>

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


msg.text.split("\n").map((line,i)=>(


<p key={i}>

{line}

</p>



))


}



</div>



))


}




<div ref={chatEndRef}/>



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
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";


// function ChatBox(){


// const [message,setMessage] = useState("");

// const [messages,setMessages] = useState([]);

// const [status,setStatus] = useState("Ready 🟢");


// const chatEndRef = useRef(null);



// const userId =
// localStorage.getItem("userId");



// const [chatId] = useState(()=>{


// let id =
// localStorage.getItem("chatId");


// if(!id){


// id =
// "chat_" + Date.now();


// localStorage.setItem(
// "chatId",
// id
// );


// }


// return id;


// });
// useEffect(()=>{


// async function loadOldChat(){


// const chatId =
// localStorage.getItem("chatId");


// const res = await axios.get(

// `http://localhost:5002/api/chats/${userId}/${chatId}`

// );



// setMessages(res.data);


// }




// window.addEventListener(

// "loadChat",

// loadOldChat

// );



// return()=>{


// window.removeEventListener(

// "loadChat",

// loadOldChat

// );



// }



// },[]);


// useEffect(()=>{


// function clearChat(){


// setMessages([]);


// }



// window.addEventListener(

// "newChat",

// clearChat

// );



// return()=>{


// window.removeEventListener(

// "newChat",

// clearChat

// );


// }



// },[]);

// // AUTO SCROLL

// useEffect(()=>{


// chatEndRef.current?.scrollIntoView({

// behavior:"smooth"

// });


// },[messages]);





// // SEND MESSAGE

// async function sendMessage(){


// if(!message.trim()) return;



// const userMessage = message;



// // show user message immediately

// setMessages(prev=>[

// ...prev,

// {

// role:"user",

// text:userMessage

// }

// ]);



// setMessage("");



// try{


// setStatus("Thinking 🤖");



// const response = await axios.post(

// "http://localhost:5002/api/chat",

// {

// userId:userId,

// chatId:chatId,

// message:userMessage

// }

// );





// setMessages(prev=>[

// ...prev,

// {

// role:"assistant",

// text:
// response.data.reply || "No response"

// }

// ]);



// setStatus("Ready 🟢");



// }

// catch(error){


// console.log(

// "Chat Error:",

// error

// );



// setMessages(prev=>[

// ...prev,

// {

// role:"assistant",

// text:"AI service unavailable"

// }

// ]);



// setStatus("Error 🔴");


// }



// }





// return(


// <div className="chat-container">



// <h3>

// Agent Status:

// <span>

// {status}

// </span>


// </h3>





// <div className="messages">


// {

// messages.map((msg,index)=>(


// <div

// key={index}

// className={

// msg.role==="user"

// ?

// "user-msg"

// :

// "bot-msg"

// }


// >


// {

// (msg.text || "")

// .split("\n")

// .map((line,i)=>(


// <p key={i}>

// {line}

// </p>


// ))

// }



// </div>


// ))


// }



// <div ref={chatEndRef}></div>



// </div>







// <div className="input-area">


// <input


// value={message}


// onChange={(e)=>

// setMessage(e.target.value)

// }


// onKeyDown={(e)=>{


// if(e.key==="Enter"){

// sendMessage();

// }


// }}


// placeholder="Ask your event plan..."

// />




// <button onClick={sendMessage}>


// Send


// </button>



// </div>





// </div>


// )


// }



// export default ChatBox;