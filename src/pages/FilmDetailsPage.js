import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListActorBlock from "../components/ListActorBlock";
import { apiUrl } from "../config/constants";
import ActorsListPage from "./ActorsListPage";

const FilmDetailsPage = () => {
  const params = useParams();
  const [film, setFilm] = useState(null);
  const [addShow, setAddShow] = useState(false);

  const fetchFilmById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/films/${id}`);
      setFilm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewActor = async (aId, fId) => {
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
    fetchFilmById(params.id);
  };

  const deleteActor = async (aId, fId) => {
    try {
      const response = await axios.delete(`${apiUrl}/other/${aId}-${fId}`);
      console.log(response.data);
      // navigate(`/actors/${response.data.ActorId}`);
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.error);
    }
    fetchFilmById(params.id);
  };

  useEffect(() => {
    fetchFilmById(params.id);
  }, [params]);

  console.log(film);

  if (film) {
    const {
      FilmId: id,
      Title: title,
      ReleaseYear: year,
      Actors: actors,
    } = film;
    return (
      <Box>
        <Typography>
          {title} {year}
        </Typography>
        <Box>
          {actors.map((x) => (
            <ListActorBlock
              actor={x}
              key={x.ActorId}
              delete={() => deleteActor(x.ActorId, id)}
            />
          ))}
        </Box>
        <Button variant="contained" onClick={() => setAddShow(!addShow)}>
          Add new actor
        </Button>
        {addShow ? (
          <ActorsListPage add={(addA) => addNewActor(addA, id)} />
        ) : (
          ""
        )}
      </Box>
    );
  } else {
    return <div>LOADING</div>;
  }
};

export default FilmDetailsPage;
