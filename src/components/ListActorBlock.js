import { Link } from "react-router-dom";

const ListActorBlock = (props) => {
  const { ActorId: id, FirstName: fName, LastName: lName } = props.actor;
  // console.log("ACTOR", props.actor);
  return (
    <div>
      <Link to={"/actors/" + id}>
        {fName} {lName}
      </Link>
    </div>
  );
};

export default ListActorBlock;
