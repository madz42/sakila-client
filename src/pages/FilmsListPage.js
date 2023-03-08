import { apiUrl } from "../config/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import ListFilmBlock from "../components/ListFilmBlock";
import { Box, TextField, Typography } from "@mui/material";
import LoadingBlock from "../components/LoadingBlock";

const FilmsListPage = (props) => {
  const [films, setFilms] = useState(null);
  const [filter, setFilter] = useState("");

  const fetchFilmsList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/films`);
      console.log(response.data);
      setFilms(response.data);
    } catch (error) {
      console.log(error);
      props.msg({ type: "error", duration: 5, text: "Some error" });
    }
  };

  const filteredFilms = () => {
    return films.filter((x) => x.Title.includes(filter.toUpperCase()));
  };

  useEffect(() => {
    fetchFilmsList();
  }, []);

  if (films) {
    const filtered = filteredFilms();
    return (
      <Box
        sx={{
          p: 2,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Films list: {filtered.length}</Typography>
        <TextField
          sx={{ m: 1 }}
          label="Type to filter"
          id="outlined-size-small"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Box sx={{ m: "auto", maxWidth: 400 }}>
          {filtered.map((x) => (
            <ListFilmBlock film={x} key={x.FilmId} add={props.add} />
          ))}
        </Box>
      </Box>
    );
  } else {
    return <LoadingBlock />;
  }
};

export default FilmsListPage;
