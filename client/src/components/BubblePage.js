import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";
import { Link } from "react-router-dom";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
    const [colorList, setColorList] = useState([]);

    // fetch your colors data from the server when the component mounts
    // set that data to the colorList state property
    useEffect(() => {
        axiosWithAuth()
            .get("/colors")
            .then((res) => {
                setColorList(res.data);
            })
            .catch((err) => {
                console.log("Err is: ", err);
            });
    }, []);

    return (
        <>
            <nav>
                <Link
                    to="/logout"
                    onClick={() => {
                        localStorage.removeItem("token");
                    }}
                >
                    Logout
                </Link>
            </nav>
            <div className="row">
                <div className="col-md-3">
                    <ColorList colors={colorList} updateColors={setColorList} />
                </div>
                <div className="col-md-9">
                    <Bubbles colors={colorList} />
                </div>
            </div>
        </>
    );
};

export default BubblePage;
