import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import "../styles/modalForm.scss";
const Modal = ({ children, handleChange, displayBasic, method }: any) => {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(displayBasic);
  }, [displayBasic]);
  return (
    <Dialog
      header={method}
      visible={display}
      onHide={() => {
        handleChange(false);
      }}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
