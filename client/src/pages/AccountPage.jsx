import { Link } from "react-router-dom";

function AccountPage({ currentUser, handleLogout }) {
  if (!currentUser) {
    return (
      <div className="account-page">
        <h1 className="page-title">My Account</h1>

        <div className="card account-card account-card--empty">
          <div className="account-empty-icon">✦</div>

          <h2 className="account-empty-title">You’re not logged in</h2>

          <p className="account-empty-text">
            Log in or create an account to view your profile and manage your
            planner.
          </p>

          <Link to="/auth" className="button button--auth account-auth-link">
            Log in / Sign up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <h1 className="page-title">My Account</h1>
      <p className="account-subtitle">Your profile and planner access.</p>

      <section className="card account-card">
        <div className="account-header">
          <div className="account-avatar">
            {currentUser.username?.[0]?.toUpperCase() || "U"}
          </div>

          <div className="account-identity">
            <h2 className="account-username">{currentUser.username}</h2>
            <p className="account-email">{currentUser.email}</p>
          </div>
        </div>

        <div className="account-meta">
          <div className="account-meta__item">
            <span className="account-meta__label">User ID</span>
            <span className="account-meta__value">{currentUser.id}</span>
          </div>

          <div className="account-meta__item">
            <span className="account-meta__label">Status</span>
            <span className="account-meta__value">Logged in</span>
          </div>
        </div>

        <div className="account-actions">
          <button
            type="button"
            className="button account-logout-button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </section>
    </div>
  );
}

export default AccountPage;