import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ActorProfilePage from "./pages/ActorProfilePage";
import ActorsListPage from "./pages/ActorsListPage";
import FilmsListPage from "./pages/FilmsListPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import FilmDetailsPage from "./pages/FilmDetailsPage";
import AddActorPage from "./pages/AddActor";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/films" element={<FilmsListPage />} />
        <Route path="/films/:id" element={<FilmDetailsPage />} />
        <Route path="/actors" element={<ActorsListPage />} />
        <Route path="/actors/:id" element={<ActorProfilePage />} />
        <Route path="/addactor" element={<AddActorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
