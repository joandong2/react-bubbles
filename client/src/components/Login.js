import React, { useState } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";

const Login = (props) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route

    const submitHander = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post("/login", user)
            .then((res) => {
                localStorage.setItem("token", res.data.payload);
                props.history.push("/bubbles");
            })
            .catch((err) => {
                console.log("Err is: ", err);
            });
        setUser({
            username: "",
            password: "",
        });
    };

    return (
        <div className="row login">
            <div className="col-md-4">
                <form onSubmit={submitHander}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-info btn-sm">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
