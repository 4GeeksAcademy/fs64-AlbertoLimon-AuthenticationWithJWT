import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/register.css";


import { useNavigate, Link } from "react-router-dom";


export const SignUp = () => {

	const { actions } = useContext(Context);

	const navigate = useNavigate()

	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault(); // Previene que el formulario recargue la página
		console.log("submit");
		try {
			if (await actions.register(inputEmail, inputPassword)) {
				navigate("/private")
			}

		} catch (error) {
			console.error("Error during user creation:", error);
		}

	}


	return (
		<>
			<div className="container">
				<h1 className="">SIGN UP</h1>

				<form className="" onSubmit={handleSubmit}>

					<label htmlFor="emailUser" className="form-label">Email</label>
					<input name="email" type="email" className="form-control mb-3" id="emailInput" placeholder="Enter email" onChange={(event) => setInputEmail(event.target.value)}
						value={inputEmail} />

					<label htmlFor="passwordUser" className="form-label">Password</label>
					<input name="password" type="password" className="form-control mb-3" id="passwordInput" placeholder="Enter password" onChange={(event) => setInputPassword(event.target.value)}
						value={inputPassword} />

					<button type="submit" className="btn-submit btn btn-primary w-100 mb-3" >Sign up</button>

					<Link className="text-primary" to={"/login"}>If you are already registered, login here</Link>

				</form>
			</div>
		</>
	)
}