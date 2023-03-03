import { Button } from "@mui/material";
import { testFunc } from "../utils/fetch";

const HomePage = () => {
  return (
    <div>
      home page
      <Button variant="contained" onClick={() => testFunc("blah")}>
        test
      </Button>
    </div>
  );
};

export default HomePage;
