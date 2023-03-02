import { apiUrl } from "../config/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import ListActorBlock from "../components/ListActorBlock";

const ActorsListPage = () => {
  const [actors, setActors] = useState(null);

  const fetchActorsList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/actors`);
      console.log(response.data);
      setActors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActorsList();
  }, []);

  if (actors !== null) {
    return (
      <div>
        {actors.map((x) => (
          <ListActorBlock actor={x} key={x.ActorId} />
        ))}
      </div>
    );
  } else {
    return <div>LOADING</div>;
  }
};

export default ActorsListPage;
