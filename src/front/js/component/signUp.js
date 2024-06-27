import { useContext } from "react";
import { Context } from "../store/appContext";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const SignUp = () => {
    

	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");

    const navigate = useNavigate();

    return (
        <>
            <div className="container-fluid">
			<h1 className="mb-4">SIGN UP</h1>
				<form className="formulario">
		

					<label htmlFor="emailUser" className="form-label">Email</label>
					<input type="email" className="form-control w-50 mb-3" id="emailInput" placeholder="Enter email" onChange={(event) => setInputEmail(event.target.value)}
							value={inputEmail}/>

					<label htmlFor="passwordUser" className="form-label">Address</label>
					<input type="password" className="form-control w-50 mb-3" id="passwordInput" placeholder="Enter password" onChange={(event) => setInputPassword(event.target.value)}
							value={inputPassword}/>
	
					<button type="submit" className="btn btn-primary w-50 mb-3" onClick>Sign up</button>
					
				</form>
		    </div>
        </>
    )
}