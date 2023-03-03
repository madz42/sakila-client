import axios from "axios";
import { apiUrl } from "../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListFilmBlock from "../components/ListFilmBlock";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilmsListPage from "./FilmsListPage";
import LoadingBlock from "../components/LoadingBlock";

const ActorProfilePage = (props) => {
  const params = useParams();
  const [actor, setActor] = useState(null);
  const [addShow, setAddShow] = useState(false);
  const navigate = useNavigate();

  const fetchActorById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/actors/${id}`);
      setActor(response.data);
    } catch (error) {
      console.log(error);
      props.msg({ type: "error", duration: 5, text: "Some error." });
    }
  };

  const addNewMovie = async (aId, fId) => {
    try {
      const response = await axios.post(`${apiUrl}/other/`, {
        ActorId: aId,
        FilmId: fId,
      });
      console.log(response.data);
      props.msg({ type: "success", duration: 5, text: "Film added!" });
    } catch (error) {
      console.log(error);
      props.msg({ type: "error", duration: 5, text: "Some error." });
    }
    fetchActorById(params.id);
  };

  const deleteMovie = async (aId, fId) => {
    try {
      const response = await axios.delete(`${apiUrl}/other/${aId}-${fId}`);
      console.log(response.data);
      props.msg({ type: "success", duration: 5, text: "Film deleted!" });
    } catch (error) {
      console.log(error);
      props.msg({ type: "error", duration: 5, text: "Some error." });
    }
    fetchActorById(params.id);
  };

  const allowActorDelete = (len) => {
    if (len === 0) {
      return (
        <Button
          sx={{ m: 1 }}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => deleteActor(params.id)}
        >
          Delete actor
        </Button>
      );
    }
    return;
  };

  const deleteActor = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/actors/${id}`);
      console.log(response.data);
      // navigate(`/actors/${response.data.ActorId}`);
      props.msg({ type: "success", duration: 5, text: "Actor deleted!" });
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.error);
      props.msg({ type: "error", duration: 5, text: "Some error." });
    }
    navigate("/actors/");
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
      <Box sx={{ m: 2 }}>
        <Typography variant="h5">Actor: {id}</Typography>
        <Typography variant="h4">
          {fName} {lName}
        </Typography>
        <Typography variant="h6">Films:</Typography>
        <Box>
          {films.map((x) => (
            <ListFilmBlock
              film={x}
              key={x.FilmId}
              delete={() => deleteMovie(id, x.FilmId)}
            />
          ))}
        </Box>
        <Button
          sx={{ m: 1 }}
          variant="contained"
          onClick={() => setAddShow(!addShow)}
        >
          Add new film
        </Button>
        {allowActorDelete(films.length)}
        {addShow ? <FilmsListPage add={(addF) => addNewMovie(id, addF)} /> : ""}
      </Box>
    );
  } else {
    return <LoadingBlock />;
  }
};

export default ActorProfilePage;
