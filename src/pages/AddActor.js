import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/constants";

const AddActorPage = (props) => {
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  const sendNewActor = async () => {
    try {
      const response = await axios.post(`${apiUrl}/actors/`, {
        FirstName: fName,
        LastName: lName,
      });
      console.log(response.data);
      props.msg({ type: "success", duration: 5, text: "New actor created!" });
      navigate(`/actors/${response.data.ActorId}`);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);
      props.msg({ type: "error", duration: 5, text: "Some error ocured" });
    }
  };

  const newActorHandler = (e) => {
    e.preventDefault();
    if (fName.trim().length && lName.trim().length) {
      sendNewActor();
    } else {
      props.msg({ type: "warning", duration: 5, text: "Check input data" });
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h5">Add new actor:</Typography>
      <form onSubmit={newActorHandler}>
        <TextField
          sx={{ m: 1 }}
          label="First Name"
          id="outlined-size-small"
          size="small"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
        />
        <br />
        <TextField
          sx={{ m: 1 }}
          label="Last Name"
          id="outlined-size-small"
          size="small"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
        />
        <br />
        <Button sx={{ m: 1 }} variant="contained" size="large" type="submit">
          Add New Actor
        </Button>
      </form>
    </Box>
  );
};

export default AddActorPage;
