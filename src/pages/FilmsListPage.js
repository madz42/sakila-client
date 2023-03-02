import { apiUrl } from "../config/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import ListFilmBlock from "../components/ListFilmBlock";

const FilmsListPage = () => {
  const [films, setFilms] = useState(null);

  const fetchFilmsList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/films`);
      console.log(response.data);
      setFilms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilmsList();
  }, []);

  if (films) {
    return (
      <div>
        {films.map((x) => (
          <ListFilmBlock film={x} key={x.FilmId} />
        ))}
      </div>
    );
  } else {
    return <div>LOADING</div>;
  }
};

export default FilmsListPage;
