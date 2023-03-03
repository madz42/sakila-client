import axios from "axios";
import { useState } from "react";
import { apiUrl } from "../config/constants";
import ListActorBlock from "../components/ListActorBlock";
import ListFilmBlock from "../components/ListFilmBlock";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [foundFilms, setFoundFilms] = useState([]);
  const [foundActors, setFoundActors] = useState([]);
  const [showWhat, setShowWhat] = useState({ chkActors: true, chkFilms: true });

  const doSearch = async (text) => {
    try {
      const response = await axios.get(`${apiUrl}/actors/search/${text}`);
      console.log(response.data);
      setFoundActors(response.data);
    } catch (error) {
      console.log(error);
      setFoundActors([]);
    }
    try {
      const response = await axios.get(`${apiUrl}/films/search/${text}`);
      console.log(response.data);
      setFoundFilms(response.data);
    } catch (error) {
      console.log(error);
      setFoundFilms([]);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    doSearch(search);
  };

  const chkHandler = (e) => {
    setShowWhat({ ...showWhat, [e.target.name]: !showWhat[e.target.name] });
  };

  const showResults = () => {
    const showActors = () => {
      return (
        <div>
          <Typography variant="h6">Actors:</Typography>
          {foundActors.map((x) => (
            <ListActorBlock actor={x} key={x.ActorId} />
          ))}
        </div>
      );
    };
    const showFilms = () => {
      return (
        <div>
          <Typography variant="h6">Films:</Typography>
          {foundFilms.map((x) => (
            <ListFilmBlock film={x} key={x.FilmId} />
          ))}
        </div>
      );
    };
    return (
      <div>
        {showWhat.chkActors ? showActors() : ""}
        {showWhat.chkFilms ? showFilms() : ""}
      </div>
    );
  };

  //MAIN RENDER
  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4">Search:</Typography>
      <form onSubmit={searchHandler}>
        <TextField
          sx={{ m: 1 }}
          label="Type here to find"
          id="outlined-size-small"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          sx={{ m: 1 }}
          variant="contained"
          type="submit"
          startIcon={<SearchIcon />}
        >
          Find it!
        </Button>
      </form>
      <div>
        <FormControlLabel
          sx={{ m: 1 }}
          control={
            <Checkbox
              name="chkActors"
              checked={showWhat.chkActors}
              onClick={chkHandler}
              readOnly={true}
            />
          }
          label="Actors"
        />
        <FormControlLabel
          sx={{ m: 1 }}
          control={
            <Checkbox
              name="chkFilms"
              checked={showWhat.chkFilms}
              readOnly={true}
              onClick={chkHandler}
            />
          }
          label="Films"
        />
      </div>
      <Typography variant="h6">Actors Found: {foundActors.length}</Typography>
      <Typography variant="h6">Films Found: {foundFilms.length}</Typography>
      {showResults()}
    </Box>
  );
};

export default SearchPage;
