import { ReactNode } from "react";
import { Modal } from "antd";
interface prop {
  title?: ReactNode;
  modelContent?: ReactNode;
  isModalOpen: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
}

const ShowModel = ({
  title,
  modelContent,
  isModalOpen,
  handleOk,
  handleCancel,
}: prop) => {
  return (
    <Modal
      title={title}
      zIndex={9000}
      width={400}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {modelContent}
    </Modal>
  );
};

export default ShowModel;
