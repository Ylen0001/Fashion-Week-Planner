# PR Changelog

Journal concis des modifications par PR.

---

## PR 1 — `fix/delete-appointment-ownership`

**Objectif :** empêcher un utilisateur de supprimer le rendez-vous d'un autre.

| Fichier | Modification |
|---------|--------------|
| `server/src/routes/appointments.js` | `DELETE /:id` filtre par `id` + `userId` via `deleteMany` ; 400 si id invalide ; 404 si non trouvé ou non propriétaire |

**Test manuel :**
1. User A crée un RDV, note son `id`
2. User B (autre compte) tente `DELETE /appointments/:id` → `404`
3. User A supprime son propre RDV → `200`

---

## PR 2 — `feature/auth-me-endpoint`

**Objectif :** restaurer la session utilisateur après un refresh de page.

| Fichier | Modification |
|---------|--------------|
| `server/src/routes/auth.js` | `GET /auth/me` (protégé) → retourne `{ id, username, email }` depuis la DB |
| `client/src/App.jsx` | Au mount, appelle `/auth/me` + `/appointments` en parallèle ; nettoie le token si 401 |

**Test manuel :**
1. Se connecter → aller sur `/account` → profil affiché
2. F5 → profil toujours affiché (plus « not logged in »)
3. Supprimer le token ou attendre expiration → F5 → état déconnecté

---

## PR 3 — `fix/signup-auto-login`

**Objectif :** connecter automatiquement l'utilisateur après l'inscription.

| Fichier | Modification |
|---------|--------------|
| `server/src/routes/auth.js` | `POST /auth/signup` retourne un JWT (comme login) |
| `client/src/pages/AuthPage.jsx` | Stocke le token après signup ; supprime les `console.log` de debug |

**Test manuel :**
1. Créer un compte via signup
2. Sans re-login, aller sur `/` et ajouter un RDV → succès
3. F5 → session toujours active (grâce à PR 2)

---

## PR 4 — `feature/edit-appointments`

**Objectif :** permettre la modification d'un rendez-vous existant.

| Fichier | Modification |
|---------|--------------|
| `server/src/routes/appointments.js` | `PUT /appointments/:id` avec vérif propriétaire + validation date |
| `client/src/App.jsx` | Mode édition, reload depuis API après create/update/delete |
| `client/src/components/AppointmentForm.jsx` | Boutons « Save changes » / « Cancel » en mode édition |
| `client/src/components/AppointmentItem.jsx` | Bouton Edit + affichage date sécurisé |
| `client/src/components/AppointmentList.jsx` | Passe `handleEdit` |
| `client/src/App.css` | Styles actions formulaire et boutons item |

**Flux Edit :** cliquer Edit sur un RDV → le formulaire du haut se pré-remplit → modifier → Save changes.

**Correctifs post-review :**
- Reload depuis l'API au lieu de patcher le state local (évite suppressions fantômes)
- Vérif `res.ok` sur DELETE
- Affichage date tolérant si donnée invalide

**Test manuel :**
1. Créer un RDV → date affichée correctement
2. Delete un RDV → seul celui-ci disparaît
3. Edit → modifier → Save → F5 → persisté
4. Cancel → formulaire réinitialisé

---

## PR 5 — `chore/extend-ci-and-env-example`

**Objectif :** améliorer l'onboarding et la CI.

| Fichier | Modification |
|---------|--------------|
| `client/.env.example` | Template `VITE_API_URL` |
| `server/eslint.config.js` | ESLint backend (Node) |
| `server/package.json` | Dépendances ESLint |
| `.github/workflows/ci.yml` | Lint backend, `prisma validate`, `VITE_API_URL` en CI |
| `readme.md` | Chemins `client/`/`server/`, install propre, API à jour |
| `client/src/App.jsx` | Session : 401 vs 404 sur `/auth/me`, garde `VITE_API_URL` |

**Test manuel :**
1. `cp client/.env.example client/.env` → dev local OK
2. CI verte sur la PR

---

## PR 6 — `test/api-integration`

**Objectif :** ajouter des tests d'intégration API backend avec Vitest + Supertest.

| Fichier | Modification |
|---------|--------------|
| `server/src/app.js` | App Express exportable pour les tests |
| `server/index.js` | Délègue à `createApp()` |
| `server/tests/auth.test.js` | 6 tests auth (login, signup, `/me`, legacy password) |
| `server/tests/appointments.test.js` | 5 tests CRUD + isolation `userId` |
| `server/tests/helpers.js` | Helpers signup/login/request |
| `server/vitest.config.js` | Config Vitest |
| `server/package.json` | Scripts `npm test` + dépendances |
| `.github/workflows/ci.yml` | Postgres éphémère + `prisma migrate deploy` + `npm test` |
| `readme.md` | Section « Backend tests » |

**Lancer en local :** `cd server && npm test`

---

## PR 7 — `fix/reload-session-after-login`

**Objectif :** recharger user + appointments après login/signup sans F5.

| Fichier | Modification |
|---------|--------------|
| `client/src/App.jsx` | `loadSession` extraite et passée à `AuthPage` |
| `client/src/pages/AuthPage.jsx` | Appelle `onAuthSuccess()` après login/signup |

**Test manuel :**
1. Login → créer un RDV → logout → re-login → aller sur `/` → RDV visible sans F5
