import React, { useState } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";

const initialColor = {
    color: "",
    code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
    //console.log(colors);
    const [editing, setEditing] = useState(false);
    const [newColor, setNewColor] = useState(initialColor);
    const [colorToEdit, setColorToEdit] = useState(initialColor);

    const editColor = (color) => {
        setEditing(true);
        setColorToEdit(color);
    };

    const saveColor = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post(`/colors/`, newColor)
            .then((res) => {
                window.location.reload(true);
            })
            .catch((err) => {
                console.log("Err is: ", err);
            });
    };

    const saveEdit = (e) => {
        e.preventDefault();
        // Make a put request to save your updated color
        // think about where will you get the id from...
        // where is is saved right now?
        axiosWithAuth()
            .put(`/colors/${colorToEdit.id}`, colorToEdit)
            .then((res) => {
                setEditing(false);
                window.location.reload(true);
            })
            .catch((err) => {
                console.log("Err is: ", err);
            });
    };

    const deleteColor = (color) => {
        // make a delete request to delete this color
        axiosWithAuth()
            .delete(`/colors/${color.id}`)
            .then((res) => {
                window.location.reload(true);
            })
            .catch((err) => {
                console.log("Err is: ", err);
            });
    };

    return (
        <div className="colors-wrap">
            <ul>
                {colors.map((color) => (
                    <li key={color.color} onClick={() => editColor(color)}>
                        <span>
                            <span
                                className="delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteColor(color);
                                }}
                            >
                                x
                            </span>{" "}
                            {color.color}
                        </span>
                        <div
                            className="color-box"
                            style={{ backgroundColor: color.code.hex }}
                        />
                    </li>
                ))}
            </ul>
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>edit color</legend>
                    <label>
                        color name:
                        <input
                            className="form-control"
                            onChange={(e) =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    color: e.target.value,
                                })
                            }
                            value={colorToEdit.color}
                        />
                    </label>
                    <label>
                        hex code:
                        <input
                            className="form-control"
                            onChange={(e) =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    code: { hex: e.target.value },
                                })
                            }
                            value={colorToEdit.code.hex}
                        />
                    </label>
                    <div className="button-row">
                        <button type="submit" class="btn btn-info btn-sm">
                            save
                        </button>
                        <button
                            class="btn btn-warning btn-sm"
                            onClick={() => setEditing(false)}
                        >
                            cancel
                        </button>
                    </div>
                </form>
            )}
            {/* <div className="spacer" /> */}
            {/* stretch - build another form here to add a color */}
            <hr />

            <div className="newColor-wrapper">
                <form onSubmit={saveColor}>
                    <legend>add color</legend>
                    <label>
                        color:
                        <input
                            className="form-control"
                            onChange={(e) =>
                                setNewColor({
                                    ...newColor,
                                    color: e.target.value,
                                })
                            }
                            value={newColor.color}
                        />
                    </label>
                    <label>
                        hex:
                        <input
                            className="form-control"
                            onChange={(e) =>
                                setNewColor({
                                    ...newColor,
                                    code: { hex: e.target.value },
                                })
                            }
                            value={newColor.code.hex}
                        />
                    </label>
                    <button type="submit" className="btn btn-info btn-sm">
                        add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ColorList;
