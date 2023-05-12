import classes from "./Modal.module.css";

import { Fragment } from "react";
import reactDom from "react-dom";

function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClick}> </div>;
}


const portalElement=document.getElementById("overlays")

function Modal(props) {
  return (
    <Fragment>
      {reactDom.createPortal(<Backdrop onClick={props.onClick}></Backdrop>,portalElement)}
      {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)};
    </Fragment>
  );
}

export default Modal;
