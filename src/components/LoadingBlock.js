import { Box, CircularProgress } from "@mui/material";

const LoadingBlock = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingBlock;
