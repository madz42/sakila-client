import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        bgcolor: "#2196f3",
        p: 4,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography
        color={"white"}
        variant="h3"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        Sakila DB
      </Typography>
      <Box>
        <IconButton
          size="large"
          sx={{ color: "white", marginRight: 5 }}
          onClick={() => navigate("/films")}
        >
          <MovieIcon />
        </IconButton>
        <IconButton
          size="large"
          sx={{ color: "white", marginRight: 5 }}
          onClick={() => navigate("/actors")}
        >
          <RecentActorsIcon />
        </IconButton>
        <IconButton
          size="large"
          sx={{ color: "white", marginRight: 5 }}
          onClick={() => navigate("/search")}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
