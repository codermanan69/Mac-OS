# macOS Desktop Portfolio Simulator

A premium, interactive, and beautiful macOS-like desktop environment simulator built using **React 19**, **Vite 8**, and **Sass (SCSS)**. This application functions as an immersive, highly visual interactive developer portfolio showcasing skills, projects, resume, and responsive tools inside standard draggable and resizable windows.

---

## 📂 Folder Structure

The project follows a standard and organized React + Vite layout:

```text
mac-os/
├── public/                     # Static assets
│   ├── doc-icons/              # High-quality SVG dock icons (Spotify, CLI, PDF, etc.)
│   ├── navbar-icons/           # Navbar icons (Apple logo, Wifi, manan.pdf, etc.)
│   ├── favicon.svg             # Application tab icon
│   ├── icons.svg               # Vector icon assets
│   └── mac wallpaper.jpg       # Beautiful desktop background image
├── src/
│   ├── assets/                 # Component assets
│   │   ├── github.json         # Portfolio projects data source
│   │   ├── hero.png            # Generic asset
│   │   ├── react.svg           # React default asset
│   │   └── vite.svg            # Vite default asset
│   ├── components/             # Reusable and UI system components
│   │   ├── windows/            # Individual application window components
│   │   │   ├── Cli.jsx         # Custom Terminal simulator
│   │   │   ├── Github.jsx      # GitHub portfolio projects card-grid
│   │   │   ├── MacWindow.jsx   # Draggable & Resizable window container wrapper
│   │   │   ├── Note.jsx        # Markdown notebook fetcher & reader
│   │   │   ├── Resume.jsx      # Embedded PDF resume viewer
│   │   │   ├── Spotify.jsx     # Interactive Spotify music player embed
│   │   │   ├── cli.scss        # SCSS for Terminal CLI
│   │   │   ├── github.scss     # SCSS for GitHub card component
│   │   │   ├── note.scss       # SCSS for Notebook reader
│   │   │   ├── resume.scss     # SCSS for PDF container
│   │   │   ├── spotify.scss    # SCSS for Spotify playlist container
│   │   │   └── window.scss     # Window decorations & styling rules
│   │   ├── DateTime.jsx        # Top-right real-time clock widget
│   │   ├── Dock.jsx            # Dynamic application launcher menu
│   │   ├── Nav.jsx             # Classic top status bar
│   │   ├── dock.scss           # Sass styling for macOS dock layout and magnifier animation
│   │   └── nav.scss            # Sass styling for Navbar
│   ├── App.jsx                 # Entry Component and core State Manager
│   ├── app.scss                # Global layout wrapper styles
│   ├── index.css               # Global theme tokens, typography, and scrollbar styles
│   └── main.jsx                # DOM mounting entrypoint
├── index.html                  # HTML entry template
├── package.json                # Project configurations and dependencies
├── eslint.config.js            # Linter rules
└── vite.config.js              # Vite bundler options
```

---

## 🏗️ Architecture & Component Design

The application operates as a single-page simulated desktop environment. Components are structured around **reusability** and **isolation of concerns**:

1. **`App.jsx` (Core Orchestrator)**: Acts as the primary desktop wrapper. It renders the background wallpaper, top navbar (`Nav`), floating launcher dock (`Dock`), and mounts active application windows conditionally.
2. **`Nav.jsx` & `DateTime.jsx` (Top Navigation Bar)**: Simulates the macOS menu bar. The left side displays professional identifiers ("Manan Sahni"), and the right side displays system icons (WiFi) and a live, ticking clock widget.
3. **`Dock.jsx` (Interactive Bottom Launcher)**: Serves as the menu containing dynamic app shortcuts (GitHub projects, Markdown notes, PDF Resume, Calendar, Spotify, Email, and interactive CLI Terminal).
4. **`MacWindow.jsx` (Core Windowing Wrapper)**: A premium generic wrapper utilizing the external `react-rnd` library to facilitate true, responsive **dragging and resizing** of desktop apps, containing simulated macOS window controls (Red close button, Yellow minimize, Green zoom) and standard shell title-bars.
5. **Application-Specific Windows (`src/components/windows/`)**:
   - **`Cli.jsx`**: An interactive console using `react-console-emulator` providing simulated bash commands (`about`, `skills`, `projects`, `contact`, `clear`) to retrieve portfolio data directly from console outputs.
   - **`Github.jsx`**: Renders cards mapping featured developer projects dynamically loaded from `src/assets/github.json` in a responsive flex layout.
   - **`Note.jsx`**: Dynamically fetches the developer's resume profile code configuration from `/note.txt` asynchronously on mount and displays it in a dark terminal theme using `react-syntax-highlighter` (employing the `atelierDuneDark` style).
   - **`Resume.jsx`**: Embeds a professional PDF resume (`/navbar-icons/manan.pdf`) inside a clean container using standard HTML `<embed>`.
   - **`Spotify.jsx`**: Integrates a responsive Spotify playlist frame for customized background music control.

---

## ⚙️ State Management

State management is kept clean, centralized, and lightweight without resorting to heavy libraries like Redux or Zustand:

- **Centralized Desktop State**: Managed in `App.jsx` using a single React `useState` hook storing an object containing boolean visibility states for every app window:
  ```javascript
  const [windowsState, setWindowsState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false
  })
  ```
- **State Propagation**: The state object is passed to components dynamically:
  - The `Dock` component receives the `setWindowsState` dispatcher to open specific applications on click.
  - Active window components (`Github`, `Note`, `Resume`, etc.) pass the setter down to their wrapping `MacWindow` container to handle the closing functionality (by toggling their respective boolean to `false` when the red close dot is clicked).

---

## 🎨 Design System, Styling & Premium UI

The styling system is split between global design tokens and layout specific Sass files:

- **Global Theme & Variables (`index.css`)**:
  Defines modern font-families, custom scrollbars, and sets design tokens inside root variables for light/dark mode preference via the browser's `@media (prefers-color-scheme: dark)`:
  ```css
  :root {
    --text: #6b6375;
    --border: #e5e4e7;
    --code-bg: #f4f3ec;
    --accent: #aa3bff;
    /* Dark Theme Override */
    @media (prefers-color-scheme: dark) {
      --text: #9ca3af;
      --bg: #16171d;
      --border: #2e303a;
    }
  }
  ```
- **Draggable Window Shells (`window.scss`)**: Handles standard absolute bounds, modern box shadows, borders, dark color schemes (`#060606`), and the exact macOS red/yellow/green control circles.

---

## ✨ Micro-Animations & Dock Magnification

The interface boasts a custom-crafted macOS launcher magnification transition written in pure **Sass** (`src/components/dock.scss`):

- Hovering over a dock icon initiates a smooth scale magnification to `1.25` and raises it vertically by `20%`:
  ```scss
  .icon:hover {
      transform: scale(1.25) translateY(-20%);
  }
  ```
- Using adjacent sibling (`+`) and dynamic child-parent pointer (`:has`) selectors, the adjacent left and right icons scale slightly to `1.1` and raise by `10%` to construct the famous organic magnification curve:
  ```scss
  .icon:hover+.icon,
  .icon:has(+ .icon:hover) {
      transform: scale(1.1) translateY(-10%);
  }
  ```
- The transition uses a premium, low-latency cubic-bezier curve to ensure immediate, fluid reactivity: `all 0.5s cubic-bezier(0.19, 1, 0.22, 1)`.

---

## 🔍 Codebase Diagnostics & Analysis

After exploring the current active project files, there are specific architectural facts to clarify:

### 🌦️ Temperature Logic & Weather App
- **Real Codebase Status**: There is **no active Weather component, API integration, or temperature calculation logic** present anywhere in the codebase.
- **Potential Reason**: It is highly likely that weather forecasting features were planned as an extension, but they are not implemented in the current source files.

### 📊 Mixpanel Integration
- **Real Codebase Status**: There is **no Mixpanel, telemetry tracker, or tracking dependency** defined in `package.json`, `index.html`, or the React files. All interactions are strictly local and privacy-respecting.

### 📝 The Asynchronous Markdown Note
- **Technical Detail**: The `Note.jsx` component performs an asynchronous `fetch("/note.txt")` request upon mounting to retrieve profile details. If running locally, you must ensure a `/public/note.txt` is present, or configure it to point directly to the `/public/navbar-icons/note.tsx` developer script which contains standard developer resume variables and terminal logs in commented typescript format.

---

## 🚀 Running the Project Locally

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your machine.

### 2. Installation
Clone the repository and install the development dependencies:
```bash
npm install
```

### 3. Run Development Server
Start the local server with Vite:
```bash
npm run dev
```
Open your browser and navigate to the local host address printed in the terminal (usually `http://localhost:5173`).

### 4. Build for Production
Generate the optimized production bundle inside the `/dist` directory:
```bash
npm run build
```
