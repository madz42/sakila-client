import axios from "axios";
import { useState } from "react";
import { apiUrl } from "../config/constants";
import ListActorBlock from "../components/ListActorBlock";
import ListFilmBlock from "../components/ListFilmBlock";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [foundFilms, setFoundFilms] = useState([]);
  const [foundActors, setFoundActors] = useState([]);
  const [showWhat, setShowWhat] = useState({ chkActors: true, chkFilms: true });

  const doSearch = async (text) => {
    try {
      const response = await axios.get(`${apiUrl}/actors/search/${text}`);
      console.log(response.data);
      setFoundActors(response.data);
    } catch (error) {
      console.log(error);
      setFoundActors([]);
    }
    try {
      const response = await axios.get(`${apiUrl}/films/search/${text}`);
      console.log(response.data);
      setFoundFilms(response.data);
    } catch (error) {
      console.log(error);
      setFoundFilms([]);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    doSearch(search);
  };

  const chkHandler = (e) => {
    setShowWhat({ ...showWhat, [e.target.name]: !showWhat[e.target.name] });
  };

  const showResults = () => {
    const showActors = () => {
      return (
        <div>
          <p>Actors:</p>
          {foundActors.map((x) => (
            <ListActorBlock actor={x} key={x.ActorId} />
          ))}
        </div>
      );
    };
    const showFilms = () => {
      return (
        <div>
          <p>Films:</p>
          {foundFilms.map((x) => (
            <ListFilmBlock film={x} key={x.FilmId} />
          ))}
        </div>
      );
    };
    return (
      <div>
        {showWhat.chkActors ? showActors() : ""}
        {showWhat.chkFilms ? showFilms() : ""}
      </div>
    );
  };

  //MAIN RENDER
  return (
    <div>
      <form onSubmit={searchHandler}>
        <input
          placeholder="Type Here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        <button type="submit">Find it!</button>
      </form>
      <div>
        <input
          type="checkbox"
          name="chkActors"
          id="chkActors"
          checked={showWhat.chkActors}
          readOnly={true}
          onClick={chkHandler}
        />
        <label htmlFor="chkActors">Show actors</label>
        <input
          type="checkbox"
          name="chkFilms"
          id="chkFilms"
          checked={showWhat.chkFilms}
          readOnly={true}
          onClick={chkHandler}
        />
        <label htmlFor="chkFilms">Show films</label>
      </div>
      <p>Actors Found: {foundActors.length}</p>
      <p>Films Found: {foundFilms.length}</p>
      {showResults()}
    </div>
  );
};

export default SearchPage;
