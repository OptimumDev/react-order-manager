import React from "react";
import './ColorPicker.css';
import {TwitterPicker} from "react-color";
import {colors} from "../../Constants/Colors";

export default function ColorPicker({onChange, triangle = 'top-right'}) {
    return (
        <div className='color-picker-container'>
            <TwitterPicker
                colors={colors}
                triangle={triangle}
                width={168}
                onChangeComplete={c => c.hex.toUpperCase()}
            />
        </div>
    );
}
