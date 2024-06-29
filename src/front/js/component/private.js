import { useContext } from "react";
import { Context } from "../store/appContext";

import React, { useEffect, useState } from "react";

export const Private = () => {

    return (
        <>
            <div>
                <h1>HELLO, only authenticated users can enter and renders this component</h1>
                <button className="btn btn-danger">Log Out</button>
            </div>
        
        
        </>
    )
}