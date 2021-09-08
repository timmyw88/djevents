import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { IconButton } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  modal: {
    background: "#fff",
    width: 500,
    height: 600,
    borderRadius: theme.shape.borderRadius,
    padding: 20,
    zIndex: 100,
    boxShadow: theme.shadows[2],
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: 25,
  },
  body: {
    paddingTop: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: alpha(theme.palette.common.black, 0.7),
  },
}));

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <IconButton onClick={() => onClose()}>
            <CancelIcon />
          </IconButton>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
