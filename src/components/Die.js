import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";

export default function Die(props) {
    return (
        <div className="die-face">
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}