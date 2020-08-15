import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import "./Login.css";

const Login = (props) => {

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const loginHandler = async () => {
        let response;
        try {
            response = await fetch("http://localhost:5000/api/users/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput
                })
            })

            const responseData = await response.json();
            if (!response.ok) {
                console.log("The entered credential's are not correct")
            }

            setWarningMessage(responseData.message);
            const uid = responseData.user._id;
            props.setUserID(uid);
            setLoggedIn(true);
        } catch (err) {
            console.log(err.message || "Something went wrong, please try again");
        }
    }

    const signupHandler = async () => {
        let response;
        try {
            response = await fetch("http://localhost:5000/api/users/createUser", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput
                })
            })

            const responseData = await response.json();
            if (!response.ok) {
                console.log("The entered credential's are not correct")
            }

            setWarningMessage(responseData.message);
            const uid = responseData.user._id;
            props.setUserID(uid);
            setLoggedIn(true);
        } catch (err) {
            console.log(err.message || "Something went wrong, please try again");
        }
    }


    return(
        <div className="login">
            {loggedIn && <Redirect to="/home" />}
            <div>
                <h3>Login</h3>
            </div>
            <div>
                <input onChange={(e) => setEmailInput(e.target.value)} name="Email" />
            </div>
            <div className="password-input">
            <input onChange={(e) => setPasswordInput(e.target.value)} name="Password" />
            </div>
            <div className="buttons">
                <button className="login-button" onClick={loginHandler}>Login</button>
                <button className="signup-button" onClick={signupHandler}>Signup</button>
            </div>
            <div>
                {warningMessage}
            </div>
        </div>
    );    
}

export default Login;