import {useState} from "react";
import axios from "axios";
import "./../styles/clay.css";


function Register(){


const [name,setName]=useState("");

const [username,setUsername]=useState("");

const [phone,setPhone]=useState("");

const [password,setPassword]=useState("");

const [confirmPassword,setConfirmPassword]=useState("");
const API =
"https://ai-event-agent-gqnk.onrender.com";



async function register(){


if(password !== confirmPassword){

alert("Password not matching");

return;

}


try{


const res = await axios.post(

`${API}/api/auth/register`,

{


name:name,

username:username,
phone:phone,

password:password


}


);



alert(res.data.message);



}

catch(error){


console.log(error);


alert("Register failed");


}



}




return(


<div className="center-page">


<div className="login-box">


<h1>
Register
</h1>



<input

className="clay-input"

placeholder="Name"

onChange={(e)=>setName(e.target.value)}

/>



<input

className="clay-input"

placeholder="Username"

onChange={(e)=>setUsername(e.target.value)}

/>



<input

className="clay-input"

placeholder="Phone Number"

onChange={(e)=>setPhone(e.target.value)}

/>



<input

className="clay-input"

type="password"

placeholder="Password"

onChange={(e)=>setPassword(e.target.value)}

/>



<input

className="clay-input"

type="password"

placeholder="Confirm Password"

onChange={(e)=>setConfirmPassword(e.target.value)}

/>



<button

className="clay-button"

onClick={register}

>

Register

</button>



</div>


</div>


)



}


export default Register;