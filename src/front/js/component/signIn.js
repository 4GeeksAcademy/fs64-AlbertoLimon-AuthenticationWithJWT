import { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";

import React, { useEffect, useState } from "react";


export const SignIn = () => {
    

	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");

    

    return (
        <>
            <div className="container">
			<h1 className="mb-4">LOGIN</h1>
				<form className="">
		

					<label htmlFor="emailUser" className="form-label">Email</label>
					<input type="email" className="form-control mb-3" id="emailInput" placeholder="Enter email" onChange={(event) => setInputEmail(event.target.value)}
							value={inputEmail}/>

					<label htmlFor="passwordUser" className="form-label">Password</label>
					<input type="password" className="form-control mb-3" id="passwordInput" placeholder="Enter password" onChange={(event) => setInputPassword(event.target.value)}
							value={inputPassword}/>
	
					<button type="submit" className="btn-submit btn btn-success w-100 mb-3" onClick>Sign in</button>
					
				</form>
		    </div>
        </>
    )
}