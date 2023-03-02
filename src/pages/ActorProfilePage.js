import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../config/constants";

const ActorProfilePage = () => {
  const params = useParams();
  const [actor, setActor] = useState(null);

  const fetchActorById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/actors/${id}`);
      setActor(response.data);
    } catch (error) {
      console.log(error);
    }
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
      <div>
        <p>
          {id} {fName} {lName}
        </p>
        <ul>
          {films.map((x) => (
            <li key={x.FilmId}>
              {x.Title} {x.ReleaseYear}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>LOADING</div>;
  }
};

export default ActorProfilePage;
