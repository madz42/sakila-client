import { Box, Button } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        maxWidth: 500,
        m: "auto",
      }}
    >
      <Button
        sx={{ m: 1 }}
        variant="contained"
        size="large"
        startIcon={<MovieIcon />}
        onClick={() => navigate("/films")}
      >
        List Films
      </Button>
      <Button
        sx={{ m: 1 }}
        variant="contained"
        size="large"
        startIcon={<RecentActorsIcon />}
        onClick={() => navigate("/actors")}
      >
        List Actors
      </Button>
      <Button
        sx={{ m: 1 }}
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        onClick={() => navigate("/search")}
      >
        Search
      </Button>
      <Button
        sx={{ m: 1 }}
        variant="outlined"
        size="large"
        startIcon={<PersonAddIcon />}
        onClick={() => navigate("/addactor")}
      >
        Add New Actor
      </Button>
      <Button
        sx={{ m: 1 }}
        variant="outlined"
        size="large"
        disabled="true"
        startIcon={<AddToPhotosIcon />}
      >
        Add New Film
      </Button>
    </Box>
  );
};

export default HomePage;
