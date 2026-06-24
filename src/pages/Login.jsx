import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./../styles/clay.css";


function Login(){


const [username,setUsername] = useState("");

const [password,setPassword] = useState("");

const navigate = useNavigate();

// const API =
// "https://ai-event-agent-gqnk.onrender.com";

async function login(){

try{


const res = await axios.post(

 "https://ai-event-agent-gqnk.onrender.com/api/auth/login",

{

username:username,

password:password

}

);



alert(res.data.message);



if(res.data.message === "Login successful"){



localStorage.setItem(

"userId",

res.data.user.id

);



navigate("/dashboard");



}

else{


alert(res.data.message);


}



}

catch(error){


console.log(error);


alert("Login failed");


}


}





return(


<div className="center-page">


<div className="login-box">


<h1>
Login
</h1>




<input

className="clay-input"

placeholder="Username"

onChange={(e)=>setUsername(e.target.value)}

/>




<input

className="clay-input"

type="password"

placeholder="Password"

onChange={(e)=>setPassword(e.target.value)}

/>




<button

className="clay-button"

onClick={login}

>

Login

</button>





<p className="bottom-text">

Don't have account?

</p>



<Link to="/register">

Create Account

</Link>



</div>


</div>


)


}


export default Login;