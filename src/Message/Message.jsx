import React from "react";
import { message } from "antd";

export default function MessageAPI() {

    const [messageApi, contextHolder] = message.useMessage();
    const success = (action) => {
        messageApi.open({
            type: 'success',
            content: `${action}`,
        });
    };
    const error = (action) => {
        messageApi.open({
            type: 'error',
            content: `${action}`
        });
    };

    return { success, error, contextHolder }
}