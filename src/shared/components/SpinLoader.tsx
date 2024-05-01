import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import React from "react";

const SpinLoader = () => {

    return (
        <Spin
            style={{ position: 'absolute', top: '50%', left: '50%' }}
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
    );
};

export default SpinLoader;
