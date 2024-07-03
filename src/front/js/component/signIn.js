import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";

import { Link, useNavigate } from "react-router-dom";


export const SignIn = () => {

	const { actions } = useContext(Context)

	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log("submit");
		try {
			if (actions.loginUser(inputEmail, inputPassword)) {
				navigate("/private")
			}else{
				
			}

		} catch (error) {
			console.error("Error during user login:", error);
		}

	}

	return (
		<>
			<div className="container">
				<h1 className="mb-4">LOGIN</h1>

				<form className="" onSubmit={handleSubmit}>


					<label htmlFor="emailUser" className="form-label">Email</label>
					<input type="email" className="form-control mb-3" id="emailInput" placeholder="Enter email" onChange={(event) => setInputEmail(event.target.value)}
						value={inputEmail} />

					<label htmlFor="passwordUser" className="form-label">Password</label>
					<input type="password" className="form-control mb-3" id="passwordInput" placeholder="Enter password" onChange={(event) => setInputPassword(event.target.value)}
						value={inputPassword} />

					<button type="submit" className="btn-submit btn btn-success w-100 mb-3" >Sign in</button>

					<Link className="text-primary" to={"/register"}>Click here if you are not registered</Link>

					<button type="button" className=" btn btn-warning w-50 mb-3 mt-4" onClick={() => navigate("/private")}>Go to private</button>
				</form>
			</div>
		</>
	)
}