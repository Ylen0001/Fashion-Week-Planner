import {NavLink} from "react-router-dom"

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">FW Planner</div>

        <nav className="site-nav" aria-label="Main navigation">
          <ul className="site-nav__list">
            <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `site-nav__link ${isActive ? "is-active" : ""}`
                  }
                >
                  Planner
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    `site-nav__link ${isActive ? "is-active" : ""}`
                  }
                >
                  Log in / Sign up
                </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

/* navLink permet de lier une route à un hyperlink. "Si tu appuies ici, on change l'URL en "/auth", donc React modifie l'affichage de la page en fonction" 
- Pourquoi le ternaire sur isActive? Le but est d'afficher en surbrillance le bouton du header correspondant à la page affichée actuellement, donc d'utiliser 
le className "site-nav__link.isActive" si c'est le cas, et sans isActive sinon. Donc on utilise le ternaire pour rajouter isActive au nom du classname si on est
déjà sur l'URL correspondant au bouton*/