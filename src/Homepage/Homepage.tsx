import SessionBlock from "./Sessions/SessionBlock.tsx";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";


export type Session = {
    id: number;
    image: string;
    name: string;
    theme: string;
    playerNb: string;
    difficulty: string;
    description: string;
};

const sessions: Session[] = [
    {id: 1, image: "/sessions/rock-n-spy.jpg", name: "Rock'N SPY", theme: "Musique, Espionnage", playerNb: "2-6", difficulty: "Intermédiaire", description: "1975, Nicky Brighton est une célèbre star du rock anglais. Les services secrets britanniques pensent qu’il s’agit en réalité d’un agent du KGB, qui détiendrait une photographie compromettante d’un haut fonctionnaire anglais qui aurait collaboré avec l'ennemi pendant la Guerre. Vous, agents du MI6, êtes chargés de vous infiltrer dans le pied à terre parisien de Nicky pour confirmer cette information et trouver cette photo afin que le MI6 puisse arrêter le traître anglais et intercepter Nicky avant qu’il ne prenne la fuite pour l’URSS ! L’honneur de la Couronne en dépend, faites vite agents !"},
    {id: 2, image: "/sessions/dr-kang.jpg", name: "Dr Kang", theme: "Aventure", playerNb: "2-5", difficulty: "Intermédiaire", description: "Après son échec à anéantir toute forme de vie sur terre, l'infâme Dr Kang a enlevé une des plus brillantes chimistes au monde afin de lui extorquer les connaissances nécessaires à son nouveau plan. Vous partirez en mission de sauvetage dans le repaire de Kang, en espérant que vous n'arrivez pas trop tard..."},
    {id: 3, image: "/sessions/contagion.jpg", name: "Contagion", theme: "Apocalypse", playerNb: "2-6", difficulty: "Difficile", description: "Nous sommes en 1992, une étrange épidémie fait des ravages dans le pays. Le professeur Sabatier, éminent virologue, prétend avoir trouvé un antidote grâce à ses recherches sur des rats. Mais étrangement, il disparaît juste après cette annonce. Vous êtes les meilleurs scientifiques et vous devez fouiller son laboratoire dans l’espoir de trouver ce fameux antidote avant qu’il ne soit trop tard..."},
    {id: 4, image: "/sessions/ghost.jpg", name: "Ghost", theme: "Disparition, Mystère", playerNb: "2-6", difficulty: "Difficile", description: "Une vielle dame passionnée d'occultisme a été assassinée il y a plus de 40 ans dans cet appartement. Personne ne sait ce qui s’est réellement passé. Aucun de ceux qui y sont entrés n’en sont revenus. Il parait que le seul moyen d'en sortir vivant serait de trouver le nom de son assassin. Par sécurité, nous en avons condamné l’accès, mais nous pouvons vous l’ouvrir si vous voulez vraiment tenter votre chance..."},
]

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="homepage bg-dark text-light min-vh-100">
      <header className="text-center py-5 bg-black">
        <div className="container">
          <h1 className="display-4 fw-bold">Bienvenue à la Maison Horrifique</h1>
          <p className="lead text-secondary mb-4">
            Plongez dans l’aventure : découvrez nos sessions d’escape game immersives et vivez une expérience unique en équipe !
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="#sessions" className="btn btn-primary btn-lg rounded-pill">
              Découvrir les sessions
            </a>
            <button
              className="btn btn-outline-light btn-lg rounded-pill"
              onClick={() => navigate("/login")}
            >
              Connexion Employé
            </button>
          </div>
        </div>
      </header>

      <section className="container my-5 p-4 rounded bg-secondary bg-opacity-25" id="sessions">
        <h2 className="mb-4">Nos sessions d’escape game</h2>
        <div className="row g-4">
          {sessions.map((s) => (
            <div key={s.id} className="col-12">
              <SessionBlock {...s} />
            </div>
          ))}
        </div>
      </section>

      <section className="container my-5 p-4 rounded bg-secondary bg-opacity-25">
        <h2 className="mb-3">À propos de EscapeXperience</h2>
        <p>
          EscapeXperience est une entreprise passionnée par le jeu et l’aventure, spécialisée dans la création de sessions d’escape game originales
          pour tous les âges...
        </p>
      </section>

      <section className="container my-5 p-4 rounded bg-secondary bg-opacity-25">
        <h2 className="mb-3">Contact</h2>
        <p>Une question ? Envie de réserver ? Contactez-nous !</p>
        <ul className="list-unstyled lh-lg">
          <li>
            <strong>Email :</strong> contact@escapexperience.fr
          </li>
          <li>
            <strong>Téléphone :</strong> 01 23 45 67 89
          </li>
          <li>
            <strong>Adresse :</strong> 42 rue de l’Aventure, 75000 Paris
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Homepage;
