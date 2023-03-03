import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ActorProfilePage from "./pages/ActorProfilePage";
import ActorsListPage from "./pages/ActorsListPage";
import FilmsListPage from "./pages/FilmsListPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import FilmDetailsPage from "./pages/FilmDetailsPage";
import AddActorPage from "./pages/AddActor";
import ErrorBlock from "./components/ErrorBlock";
import { useState } from "react";

function App() {
  const [msg, setMsg] = useState({ type: null, duration: 0, text: "" });

  return (
    <div>
      <Navbar />
      <div style={{ margin: "auto", width: "50%" }}>
        <ErrorBlock msg={msg} />
        <Routes>
          <Route path="/" element={<HomePage msg={setMsg} />} />
          <Route path="/search" element={<SearchPage msg={setMsg} />} />
          <Route path="/films" element={<FilmsListPage msg={setMsg} />} />
          <Route path="/films/:id" element={<FilmDetailsPage msg={setMsg} />} />
          <Route path="/actors" element={<ActorsListPage msg={setMsg} />} />
          <Route
            path="/actors/:id"
            element={<ActorProfilePage msg={setMsg} />}
          />
          <Route path="/addactor" element={<AddActorPage msg={setMsg} />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
