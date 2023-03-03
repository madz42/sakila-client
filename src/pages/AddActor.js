import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/constants";

const AddActorPage = () => {
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
      navigate(`/actors/${response.data.ActorId}`);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);
    }
  };

  const newActorHandler = (e) => {
    e.preventDefault();
    sendNewActor();
  };

  useEffect(() => {
    //check login
  }, []);

  return (
    <div>
      <form onSubmit={newActorHandler}>
        <input
          placeholder="First Name"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
        />
        <br />
        <input
          placeholder="Last Name"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
        />
        <br />
        <button type="submit">Add New Actor</button>
      </form>
    </div>
  );
};

export default AddActorPage;
