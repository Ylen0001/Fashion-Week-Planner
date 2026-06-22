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

*À venir*

---

## PR 3 — `fix/signup-auto-login`

*À venir*

---

## PR 4 — `feature/edit-appointments`

*À venir*

---

## PR 5 — `chore/extend-ci-and-env-example`

*À venir*
