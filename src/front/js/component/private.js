import { useContext } from "react";
import { Context } from "../store/appContext";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Private = () => {

    const { actions } = useContext(Context)
    const navigate = useNavigate()


    /*
        const checkAuth = async () => {
            const auth = await actions.verify()
            return await auth
        }
    */

    const handleLogout = async () => {

        try {
            actions.logout()
            navigate("/login")
        } catch (error) {
            console.error("Error during LogOut:", error);
        }
    }

    const fetchToken = async () => {
        try {
            const token = localStorage.getItem("jwt-token");
            console.log("token: ", token);
            if (!token) {
                navigate("/login");
                return;
            }
        } catch (error) {
            console.log("Error fetching token: ", error);
        }
    }

    useEffect(() => {

        fetchToken();


    }, [])

    return (
        <>
            <div>
                <h1>HELLO, only authenticated users can enter and renders this component</h1>

                <div className="d-flex flex-row justify-content-around">
                    <img src="https://www.iebschool.com/blog/wp-content/uploads/2015/03/hacer-venta.gif" />
                    <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                </div>

            </div>

        </>
    )
}