import { apiUrl } from "../config/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import ListActorBlock from "../components/ListActorBlock";
import { TextField, Typography } from "@mui/material";

const ActorsListPage = (props) => {
  const [actors, setActors] = useState(null);
  const [filter, setFilter] = useState("");

  const fetchActorsList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/actors`);
      console.log(response.data);
      setActors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredActors = () => {
    return actors.filter(
      (x) =>
        x.FirstName.includes(filter.toUpperCase()) ||
        x.LastName.includes(filter.toUpperCase())
    );
  };

  useEffect(() => {
    fetchActorsList();
  }, []);

  if (actors) {
    const filtered = filteredActors();
    return (
      <div>
        <TextField
          label="Type to filter"
          id="outlined-size-small"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Typography>TOTAL FOUND: {filtered.length}</Typography>
        {filtered.map((x) => (
          <ListActorBlock actor={x} key={x.ActorId} add={props.add} />
        ))}
      </div>
    );
  } else {
    return <div>LOADING</div>;
  }
};

export default ActorsListPage;
