import { Link } from "react-router-dom";

const ListFilmBlock = (props) => {
  const { FilmId: id, Title: title, ReleaseYear: year } = props.film;
  // console.log("ACTOR", props.actor);
  return (
    <div>
      <Link to={`/films/${id}`}>
        {title} {year}
      </Link>
    </div>
  );
};

export default ListFilmBlock;
