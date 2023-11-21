import React, { useState, useEffect } from 'react';
import '../style/tost.css'; // Import your CSS file for styling the toast

const Toast = ({ message, duration }: any) => {

    console.log(message, duration)

    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    return visible ? (
        <div className="toast">
            <p>{message}</p>
        </div>
    ) : null;
};

export default Toast;