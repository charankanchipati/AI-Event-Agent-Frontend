import { useEffect, useState , useCallback} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Sidebar(){


const navigate = useNavigate();

const userId = localStorage.getItem("userId");


const [chats,setChats] = useState([]);




// load chats

const fetchChats = useCallback(async()=>{


try{


const res = await axios.get(

`https://ai-event-agent-gqnk.onrender.com//api/chats/${userId}`

);



setChats(res.data);



}

catch(error){


console.log(

"History error",

error

);


}



},[userId]);





useEffect(()=>{


const timer = setTimeout(()=>{


fetchChats();


},500);




const updateHistory = ()=>{


fetchChats();


};




window.addEventListener(

"chatUpdated",

updateHistory

);





return()=>{


clearTimeout(timer);


window.removeEventListener(

"chatUpdated",

updateHistory

);



};


},[fetchChats]);





function newChat(){


const id =

"chat_"+Date.now();



localStorage.setItem(

"chatId",

id

);



window.dispatchEvent(

new Event("newChat")

);


}








function openChat(id){


localStorage.setItem(

"chatId",

id

);



window.dispatchEvent(

new Event("loadChat")

);



}







function logout(){


localStorage.clear();


navigate("/login");


}








return(


<div className="sidebar">



<div className="sidebar-top">


<h2>
🤖 AI Planner
</h2>


<button onClick={newChat}>

+ New Chat

</button>


</div>






<div className="history-container">


<h3>

Chats

</h3>



{

chats.length===0 ?

<p>No chats yet</p>


:

chats.map((chat)=>(


<div


key={chat.chatId}


className="chat-item"


onClick={()=>openChat(chat.chatId)}


>


{chat.title || "New Chat"}



</div>



))


}



</div>








<div className="logout-container">


<button onClick={logout}>

Logout

</button>


</div>





</div>


)



}


export default Sidebar;
// import { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// function Sidebar(){


// const navigate = useNavigate();


// const userId = localStorage.getItem("userId");


// const [chats,setChats] = useState([]);


// const historyRef = useRef();





// // LOAD CHATS

// const loadChats = useCallback(async()=>{


// try{


// const response = await axios.get(

// `http://localhost:5002/api/chats/${userId}`

// );




// const data = response.data || [];



// // remove duplicate chats

// const unique = [];


// const ids = new Set();



// data.forEach(chat=>{


// if(!ids.has(chat.chatId)){


// unique.push({

// chatId:chat.chatId,

// title:
// chat.title ||
// chat.text?.slice(0,30) ||
// "New Chat"


// });


// ids.add(chat.chatId);


// }


// });



// setChats(unique);



// }

// catch(error){


// console.log(
// "History error:",
// error
// );


// }



// },[userId]);









// // FIRST LOAD

// useEffect(()=>{


// const timer = setTimeout(()=>{


// loadChats();


// },0);



// window.addEventListener(

// "chatUpdated",

// loadChats

// );



// return()=>{


// clearTimeout(timer);


// window.removeEventListener(

// "chatUpdated",

// loadChats

// );


// };



// },[loadChats]);










// // AUTO SCROLL HISTORY

// useEffect(()=>{


// setTimeout(()=>{


// if(historyRef.current){


// historyRef.current.scrollTop =

// historyRef.current.scrollHeight;


// }


// },100);



// },[chats]);











// // NEW CHAT

// // function newChat(){


// // const id =

// // "chat_" + Date.now();



// // localStorage.setItem(

// // "chatId",

// // id

// // );



// // setChats(prev=>[

// // {

// // chatId:id,

// // title:"New Chat"

// // },

// // ...prev

// // ]);



// // window.dispatchEvent(

// // new Event("newChat")

// // );



// // }
// setChats(prev=>[
// {
// chatId:id,
// title:"New Chat"
// },
// ...prev
// ]);











// // OPEN CHAT


// function openChat(id){


// localStorage.setItem(

// "chatId",

// id

// );



// window.dispatchEvent(

// new Event("loadChat")

// );



// }









// // LOGOUT

// function logout(){


// localStorage.clear();


// navigate("/login");


// }











// return(


// <div className="sidebar">





// <div className="sidebar-top">


// <h2>

// 🤖 AI Planner

// </h2>




// <button onClick={newChat}>

// + New Chat

// </button>


// </div>









// <div

// className="history-container"

// ref={historyRef}

// >


// <h3>

// Chats

// </h3>




// {


// chats.length === 0 ?


// <p>

// No chats yet

// </p>



// :

// chats.map(chat=>(



// <div


// key={chat.chatId}


// className="chat-item"


// onClick={()=>openChat(chat.chatId)}


// >


// {chat.title}


// </div>



// ))


// }





// </div>









// <div className="logout-container">


// <button onClick={logout}>

// Logout

// </button>



// </div>





// </div>


// )


// }


// export default Sidebar;
// import { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// function Sidebar(){


// const navigate = useNavigate();


// const userId =
// localStorage.getItem("userId");



// const [chats,setChats] =
// useState([]);




// const historyRef =
// useRef();





// // DARK MODE







// // LOAD CHATS

// const loadChats = useCallback(()=>{


// return axios.get(

// `http://localhost:5002/api/chats/${userId}`

// )

// .then((response)=>{


// setChats(response.data);


// })

// .catch((error)=>{


// console.log(
// "History error:",
// error
// );


// });


// },[userId]);







// // LOAD FIRST TIME

// useEffect(()=>{


// const run = async()=>{

// await loadChats();

// };


// run();



// window.addEventListener(
// "chatUpdated",
// loadChats
// );



// return()=>{


// window.removeEventListener(
// "chatUpdated",
// loadChats
// );


// };


// },[loadChats]);









// // AUTO SCROLL HISTORY

// useEffect(()=>{


// if(historyRef.current){


// historyRef.current.scrollTop =

// historyRef.current.scrollHeight;


// }


// },[chats]);









// // NEW CHAT

// function newChat(){


// const newId =
// "chat_" + Date.now();



// localStorage.setItem(
// "chatId",
// newId
// );


// setChats(prev=>[
// {
// chatId:newId,
// title:"New Chat"
// },
// ...prev
// ]);


// window.dispatchEvent(
// new Event("newChat")
// );


// }








// // OPEN CHAT

// function openChat(id,title){


// localStorage.setItem(
// "chatId",
// id
// );


// window.dispatchEvent(
// new CustomEvent(
// "loadChat",
// {
// detail:{
// chatId:id
// }
// }
// )
// );


// }







// // LOGOUT

// function logout(){


// localStorage.clear();


// navigate("/login");


// }









// return(



// <div className= "sidebar">





// <div className="sidebar-top">



// <h2>

// 🤖 AI Planner

// </h2>





// <button onClick={newChat}>

// + New Chat

// </button>


// </div>

// <div

// className="history-container"

// ref={historyRef}

// >



// <h3>

// Chats

// </h3>





// {

// chats.length === 0 ?


// <p>

// No chats yet

// </p>



// :


// chats.map((chat,index)=>(


// <div


// key={index}


// className="chat-item"


// onClick={()=>openChat(chat.chatId,chat.title)}


// >



// {

// chat.title ||

// "AI Event Planner Help"

// }




// </div>


// ))


// }





// </div>









// <div className="logout-container">



// <button onClick={logout}>


// Logout


// </button>




// </div>





// </div>


// )


// }



// export default Sidebar;
