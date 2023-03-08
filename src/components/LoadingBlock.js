import { Box, CircularProgress } from "@mui/material";

const LoadingBlock = () => {
  return (
    <Box
      sx={{
        display: "flex",
        m: "auto",
        width: "50%",
        p: 5,
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingBlock;
