import axios from "axios";
import { apiUrl } from "../config/constants";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListFilmBlock from "../components/ListFilmBlock";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import FilmsListPage from "./FilmsListPage";

const ActorProfilePage = () => {
  const params = useParams();
  const [actor, setActor] = useState(null);
  const [addShow, setAddShow] = useState(false);

  const fetchActorById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/actors/${id}`);
      setActor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewMovie = async (aId, fId) => {
    try {
      const response = await axios.post(`${apiUrl}/other/`, {
        ActorId: aId,
        FilmId: fId,
      });
      console.log(response.data);
      // navigate(`/actors/${response.data.ActorId}`);
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.error);
    }
    fetchActorById(params.id);
  };

  const deleteMovie = async (aId, fId) => {
    try {
      const response = await axios.delete(`${apiUrl}/other/${aId}-${fId}`);
      console.log(response.data);
      // navigate(`/actors/${response.data.ActorId}`);
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.error);
    }
    fetchActorById(params.id);
  };

  useEffect(() => {
    fetchActorById(params.id);
  }, [params]);

  console.log(actor);

  if (actor) {
    const {
      ActorId: id,
      FirstName: fName,
      LastName: lName,
      Films: films,
    } = actor;
    return (
      <Box>
        <Typography>
          {fName} {lName}
        </Typography>
        <Button onClick={addNewMovie}>EDIT - add mov</Button>
        <Box>
          {films.map((x) => (
            <ListFilmBlock
              film={x}
              key={x.FilmId}
              delete={() => deleteMovie(id, x.FilmId)}
            />
          ))}
        </Box>
        <Button variant="contained" onClick={() => setAddShow(!addShow)}>
          Add new film
        </Button>
        {addShow ? <FilmsListPage add={(addF) => addNewMovie(id, addF)} /> : ""}
      </Box>
    );
  } else {
    return <LinearProgress />;
  }
};

export default ActorProfilePage;
