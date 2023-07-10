import { Dialog } from "primereact/dialog";

const Modal = ({ children, displayBasic }: any) => {
  return (
    <Dialog
      header="Header"
      visible={displayBasic}
      style={{ width: "50vw" }}
      onHide={() => {
        displayBasic = false;
      }}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
