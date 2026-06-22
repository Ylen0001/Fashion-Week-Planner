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
| `server/src/routes/appointments.js` | `PUT /appointments/:id` avec vérif propriétaire |
| `client/src/App.jsx` | Mode édition (`editingId`), `handleEdit` / `handleCancelEdit`, submit POST ou PUT |
| `client/src/components/AppointmentForm.jsx` | Boutons « Save changes » / « Cancel » en mode édition |
| `client/src/components/AppointmentItem.jsx` | Bouton Edit + affichage du lieu |
| `client/src/components/AppointmentList.jsx` | Passe `handleEdit` |
| `client/src/App.css` | Styles actions formulaire et boutons item |

**Test manuel :**
1. Créer un RDV
2. Cliquer Edit → formulaire pré-rempli
3. Modifier et sauvegarder → liste mise à jour
4. F5 → modifications persistées
5. Cancel → formulaire réinitialisé

---

## PR 5 — `chore/extend-ci-and-env-example`

*À venir*
