# Interactive Timeline – Challenge Submission

## Time Spent

I spent approximately **4 hours** working on this challenge, including setup, core feature development, bug fixing, and polishing.

---

## What I Like About My Implementation

- Clean and modular React component structure (e.g., `Timeline`, `TimelineItem`, `ZoomControls`)
- Implemented **zoom in/out** functionality with both mouse wheel and buttons 🤓
- Included **inline editing** of event names
- Built **drag-and-resize** capability for adjusting event dates
- Used custom **React hooks** (e.g., `useResizeHandle`, `useTimelineLayout`) for reusability and separation of concerns
- Added **persistent state** using `localStorage` to retain changes across reloads
- UI remains responsive and events are automatically re-layed out upon modification

---

## What I Would Change If I Were to Do It Again

- Extract a custom hook for persistent state (e.g., `usePersistentState`)
- Add support for mobile/touch devices for drag/resize
- Improve accessibility (e.g., keyboard navigation, screen reader labels)
- Use TypeScript for better type safety across components
- Add context or Redux for centralized state management in larger timelines

---

## Design Decisions

- I used a **lane-based layout algorithm** to avoid overlapping events and keep a clean visual structure.
- For resizing logic, I implemented a lightweight version of **Gantt-like behavior** via drag handles.
- I was inspired by project planning tools like **Asana**, **Trello Timelines**, and **Gantt charts** for visual patterns and interaction behaviors.
- I deliberately avoided heavy libraries like `react-beautiful-dnd` or full timeline frameworks to stay close to the raw React + CSS logic.

---

## How I Would Test This With More Time

- Expand unit test coverage to include edge cases (e.g., overlapping events, boundary resize limits)
- Write integration tests for zoom and drag interactions
- Add **end-to-end (E2E)** tests with **Playwright** or **Cypress** to simulate real user behavior
- Validate accessibility (a11y)
- Test on multiple browsers and screen sizes for consistent UX

---

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Start the server: `npm start`
4. Go to http://localhost:3000 Explore the timeline!

## Run test

1. Clone the repo
2. Run `npm install`
3. Start the server: `npm test`
---

## Thanks

Thanks for the opportunity! Looking forward to feedback.
