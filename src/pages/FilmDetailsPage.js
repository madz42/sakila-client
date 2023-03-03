import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListActorBlock from "../components/ListActorBlock";
import LoadingBlock from "../components/LoadingBlock";
import { apiUrl } from "../config/constants";
import ActorsListPage from "./ActorsListPage";

const FilmDetailsPage = (props) => {
  const params = useParams();
  const [film, setFilm] = useState(null);
  const [addShow, setAddShow] = useState(false);

  const fetchFilmById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/films/${id}`);
      setFilm(response.data);
    } catch (error) {
      console.log(error);
      props.msg({ type: "error", duration: 5, text: "Some error" });
    }
  };

  const addNewActor = async (aId, fId) => {
    try {
      const response = await axios.post(`${apiUrl}/other/`, {
        ActorId: aId,
        FilmId: fId,
      });
      console.log(response.data);
      props.msg({ type: "success", duration: 5, text: "Actor added!" });
    } catch (error) {
      console.log(error);
      props.msg({ type: "error", duration: 5, text: "Some error" });
    }
    fetchFilmById(params.id);
  };

  const deleteActor = async (aId, fId) => {
    try {
      const response = await axios.delete(`${apiUrl}/other/${aId}-${fId}`);
      console.log(response.data);
      props.msg({ type: "success", duration: 5, text: "Actor deleted!" });
    } catch (error) {
      console.log(error);
      props.msg({ type: "error", duration: 5, text: "Some error" });
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
      Description: description,
      Actors: actors,
      Rating: rating,
      Length: length,
      RentalRate: rentrate,
      ReplacementCost: replcost,
      RentalDuration: rentdur,
    } = film;
    return (
      <Box sx={{ maxWidth: 800, p: 2 }}>
        <div>
          <div>
            <Typography variant="h3" sx={{ m: 3 }}>
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ width: "33%" }}>
                <b>Length: </b>
                {length} min
              </Typography>
              <Typography sx={{ width: "33%" }}>
                <b>Year released: </b>
                {year}
              </Typography>
              <Typography sx={{ width: "33%" }}>
                <b>Rating: </b>
                {rating}
              </Typography>
            </Box>
            <Box sx={{ m: 2 }}>
              <Typography variant="h5">Description:</Typography>
              <Typography sx={{ p: 1 }}>{description}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ width: "33%" }}>
                <b>Language: </b>English
              </Typography>
              <Typography sx={{ width: "33%" }}>
                <b>Original Language: </b>English
              </Typography>
              <Typography sx={{ width: "33%" }}>
                <b>Film ID: </b>
                {id}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ width: "33%" }}>
                <b>Rental Rate:</b> {rentrate} $
              </Typography>
              <Typography sx={{ width: "33%" }}>
                <b>Rental Duration:</b> {rentdur} d
              </Typography>
              <Typography sx={{ width: "33%" }}>
                <b>Replacement Cost:</b> {replcost} $
              </Typography>
            </Box>
            <Box sx={{ m: 2 }}>
              <Typography variant="h5">Actors:</Typography>
            </Box>
          </div>
        </div>
        <Box>
          {actors.map((x) => (
            <ListActorBlock
              actor={x}
              key={x.ActorId}
              delete={() => deleteActor(x.ActorId, id)}
            />
          ))}
        </Box>
        <Button
          sx={{ m: 1 }}
          variant="contained"
          onClick={() => setAddShow(!addShow)}
        >
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
    return <LoadingBlock />;
  }
};

export default FilmDetailsPage;
