import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";

const ErrorBlock = (props) => {
  const [open, setOpen] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    if (props.msg.type) {
      setOpen(true);
    }
  }, [props]);

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={props.msg.duration * 1000}
        onClose={handleClose}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity={props.msg.type}
          sx={{ width: "100%" }}
        >
          {props.msg.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorBlock;
