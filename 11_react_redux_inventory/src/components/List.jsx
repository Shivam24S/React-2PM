import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, setEditValue } from "../features/inventorySlice";

const List = () => {
    const products = useSelector((state) => state.inventory.products);

    const dispatch = useDispatch();

    return (
        <>
            <table border={2}>
                <thead>
                    <tr>
                        <th>sr</th>
                        <th>name</th>
                        <th>qty</th>
                        <th>price</th>
                        <th>category</th>
                        <th colSpan={2}>action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((l, index) => {
                        return (
                            <tr key={l.id}>
                                <td>{index + 1}</td>
                                <td>{l.name}</td>
                                <td>{l.qty}</td>
                                <td>{l.price}</td>
                                <td>{l.category}</td>
                                <td>
                                    <button onClick={() => dispatch(setEditValue(l.id))} >Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => dispatch(deleteProduct(l.id))}>
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default List;
