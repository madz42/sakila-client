import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListFilmBlock = (props) => {
  const navigate = useNavigate();
  const { FilmId: id, Title: title, ReleaseYear: year } = props.film;

  const insDelete = () => {
    if (props.delete) {
      return (
        <IconButton aria-label="delete" size="small" onClick={props.delete}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      );
    }
    return;
  };

  const insAdd = () => {
    if (props.add) {
      return (
        <Button variant="outlined" size="small" onClick={() => props.add(id)}>
          Add
        </Button>
      );
    }
    return;
  };

  return (
    <Box
      sx={{
        m: 1,
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        maxWidth: 350,
        "&:hover": { backgroundColor: "#a8bdff", boxShadow: 1 },
      }}
      style={{ cursor: "pointer" }}
    >
      <Typography onClick={() => navigate(`/films/${id}`)}>{title}</Typography>
      {insDelete()}
      {insAdd()}
    </Box>
  );
};

export default ListFilmBlock;
