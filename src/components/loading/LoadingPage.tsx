import { Spin } from "antd";

const LoadingPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spin size={"large"}></Spin>
    </div>
  );
};

export default LoadingPage;
