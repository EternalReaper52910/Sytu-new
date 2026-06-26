# NEXT STEPS

## Pending Work (Active Phase)
**Phase 2: Backend Architecture & Team Splits**
- ✅ **Auth Service:** Completed by teammate (CommonJS, in-memory array + JWT Auth).
- ✅ **Portfolio & Content Module:** Completed for Pragya (Mongoose models, Express routes, fallback mock logic).
- 🔲 **Collaboration & Real-Time Module:** Vedansh's part (Smart matching engine, Socket.IO chat infrastructure).

## Backlog
- **Frontend API Integration:** Replace `mockData.ts` on the landing page with real API calls to the Express backend (`/api/portfolios`, `/api/projects`).
- **Dashboard Pages:** Build the internal UI for the Portfolio Editor, Project Management, and User Settings.
- **Matching Algorithm:** Implement the logic that calculates Compatibility % based on user goals, skills, and roles.

## Future Ideas
- GitHub API integration to automatically pull and verify user commits/activity for the Portfolio cards.
- BullMQ integration for background tasks (e.g., sending matching notification emails).
