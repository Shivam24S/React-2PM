import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../features/inventorySlice";

const Add = () => {
    const [input, setInput] = useState({
        name: "",
        qty: "",
        price: "",
        category: "",
    });


    const dispatch = useDispatch()

    const handleChange = (field, e) => {
        setInput((prev) => {
            return {
                ...prev,
                [field]: e.target.value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(add(input))

        setInput({
            name: "",
            qty: "",
            price: "",
            category: "",
        });
    };
    console.log("input", input);
    return (
        <>
            <h1>inventory form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    value={input.name}
                    onChange={(e) => handleChange("name", e)}
                />
                <br />
                <br />
                <label htmlFor="qty">Qty</label>
                <input
                    type="number"
                    value={input.qty}
                    onChange={(e) => handleChange("qty", e)}
                />
                <br />
                <br />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    value={input.price}
                    onChange={(e) => handleChange("price", e)}
                />
                <br />
                <br />
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    value={input.category}
                    onChange={(e) => handleChange("category", e)}
                />
                <br />
                <br />
                <button onClick={handleSubmit}>Add</button>
            </form>
        </>
    );
};

export default Add;
