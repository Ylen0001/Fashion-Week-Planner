function Header({ currentPage }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">FW Planner</div>

        <nav className="site-nav" aria-label="Main navigation">
          <ul className="site-nav__list">
            <li>
              <button
                className={`site-nav__link ${currentPage === "home" ? "is-active" : ""}`}
                type="button"
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={`site-nav__link ${currentPage === "appointments" ? "is-active" : ""}`}
                type="button"
              >
                Appointments
              </button>
            </li>
            <li>
              <button
                className={`site-nav__link ${currentPage === "account" ? "is-active" : ""}`}
                type="button"
              >
                Account
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;