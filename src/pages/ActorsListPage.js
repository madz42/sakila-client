import { apiUrl } from "../config/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import ListActorBlock from "../components/ListActorBlock";
import { Box, TextField, Typography } from "@mui/material";
import LoadingBlock from "../components/LoadingBlock";

const ActorsListPage = (props) => {
  const [actors, setActors] = useState(null);
  const [filter, setFilter] = useState("");

  const fetchActorsList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/actors`);
      setActors(response.data);
    } catch (error) {
      console.log(error);
      props.msg({ type: "error", duration: 5, text: "Some error" });
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
      <Box
        sx={{
          p: 2,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Actors list: {filtered.length}</Typography>
        <TextField
          sx={{ m: 1 }}
          label="Type to filter"
          id="outlined-size-small"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Box sx={{ m: "auto" }}>
          {filtered.map((x) => (
            <ListActorBlock actor={x} key={x.ActorId} add={props.add} />
          ))}
        </Box>
      </Box>
    );
  } else {
    return <LoadingBlock />;
  }
};

export default ActorsListPage;
