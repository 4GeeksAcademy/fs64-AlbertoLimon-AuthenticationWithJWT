import { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/register.css";

import React, { useEffect, useState } from "react";


export const SignUp = () => {
    

	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const handleSubmit = () => {
		console.log("submit")
		
	}

    return (
        <>
            <div className="container">
			<h1 className="">SIGN UP</h1>
				<form className="">

					<label htmlFor="emailUser" className="form-label">Email</label>
					<input type="email" className="form-control mb-3" id="emailInput" placeholder="Enter email" onChange={(event) => setInputEmail(event.target.value)}
							value={inputEmail}/>

					<label htmlFor="passwordUser" className="form-label">Password</label>
					<input type="password" className="form-control mb-3" id="passwordInput" placeholder="Enter password" onChange={(event) => setInputPassword(event.target.value)}
							value={inputPassword}/>
	
					<button type="submit" className="btn-submit btn btn-primary w-100 mb-3" onSubmit={handleSubmit()}>Sign up</button>
					
				</form>
		    </div>
        </>
    )
}