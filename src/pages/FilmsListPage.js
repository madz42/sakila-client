import { apiUrl } from "../config/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import ListFilmBlock from "../components/ListFilmBlock";
import { TextField, Typography } from "@mui/material";

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
          <ListFilmBlock film={x} key={x.FilmId} add={props.add} />
        ))}
      </div>
    );
  } else {
    return <div>LOADING</div>;
  }
};

export default FilmsListPage;
