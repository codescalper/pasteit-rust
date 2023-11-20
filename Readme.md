## PasteIt

<p align="center"> <a href=https://github.com/codescalper/pasteit-rust target="_blank"> <img src="https://cdn.discordapp.com/attachments/1174724064338772078/1176132879646986261/image.png?ex=656dc21a&is=655b4d1a&hm=f3d3996aa09fea2da9d52616ad4d761bed683095fe3c5b212d9c3f9c66d45299&" width="100%" alt="Banner" /> </a> </p>

<p align="center"> <img src="https://img.shields.io/github/languages/code-size/codescalper/pasteit-rust" alt="GitHub code size in bytes" /> <img src="https://img.shields.io/github/last-commit/codescalper/pasteit-rust" alt="GitHub last commit" /> <img src="https://img.shields.io/github/commit-activity/m/codescalper/pasteit-rust" alt="GitHub commit activity month" /> <img src="https://img.shields.io/github/license/codescalper/pasteit-rust" alt="GitHub license" /> </p> <p></p> <p></p>

PasteIt is a code snippet sharing platform that allows users to easily share code snippets with others. The project consists of two main components: the **Client** and the **Server**.

---

## 📁 Project Structure

```bash
├── client
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── README.md
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── _redirects
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── Footer.tsx
│   │   │   ├── Form
│   │   │   │   ├── Snippet.tsx
│   │   │   │   └── Success.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── MoonIcon.tsx
│   │   │   ├── Steps.tsx
│   │   │   ├── SunIcon.tsx
│   │   │   └── ThemeSwitcher.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   └── vite.config.ts
└── server
    ├── .dockerignore
    ├── .gitignore
    ├── Cargo.toml
    ├── Dockerfile
    └── src
        └── main.rs
```

# Client

## 💻 Stack

- [axios](https://axios-http.com/): Promise-based HTTP client for making API requests.
- [react](https://reactjs.org/): A JavaScript library for building user interfaces.
- [react-dom](https://reactjs.org/docs/react-dom.html): Provides DOM-specific methods for React.
- [react-router-dom](https://reactrouter.com/web/guides/quick-start): Declarative routing for React applications.
- [react-icons](https://react-icons.github.io/react-icons/): Popular icons for React projects.
- [react-toastify](https://fkhadra.github.io/react-toastify/): Notification system for React applications.
- [typescript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [vite](https://vitejs.dev/): A fast build tool for modern web applications.

#### Setting Up Locally

1.  Clone the repository:

```bash
git clone https://github.com/codescalper/pasteit-rust.git
```

2.  Navigate to the **Client** directory:

```bash
cd pasteit-rust/Client
```

3.  Install dependencies:

```bash
 npm install
```

4.  Run the development server:

```bash
 npm run dev
```

#### Tech Stack

- **React:** A JavaScript library for building user interfaces.
- **React Router:** A standard library for routing in React applications.
- **Monaco Editor:** A versatile code editor that powers Visual Studio Code.
- **Next UI:** A React component library for building modern user interfaces.

# Server

#### Project Structure

- **main.rs:** The main Rust file defining the server logic using Actix web framework.
- **Dockerfile:** Instructions for creating a Docker image for deployment.
- **Cargo.toml:** Contains project metadata and dependencies.

#### Setting Up Locally

1.  Navigate to the **Server** directory:

```bash
cd pasteit-rust/Server
```

2.  Create a `.env` file with the following content:

```makefile
    DATABASE_URL=your_database_url
```

3.  Build and run the server:

```bash
docker build -t pasteit-server . && docker run -p 8080:8080 pasteit-server
```

#### Tech Stack

- **Rust:** A systems programming language that focuses on performance and safety.
- **Actix-Web:** A powerful, pragmatic, and extremely fast web framework for Rust.
- **SQLx:** An asynchronous, pure Rust SQL library with compile-time checked queries.
- **Dotenv:** A Rust implementation of loading environment variables from a .env file.
- **Docker:** A platform for developing, shipping, and running applications in containers.

### Contribution

If you would like to contribute to the project, feel free to open issues, submit pull requests, or reach out to the project maintainers.

<a href="https://github.com/codescalper/pasteit-rust/graphs/contributors"> <img src="https://contrib.rocks/image?repo=codescalper/pasteit-rust" /> </a>

### Issues and PRs

Please use the [GitHub repository](https://github.com/codescalper/pasteit-rust) to report issues or submit pull requests.

### Deploying with Docker

To deploy the server using Docker, follow these steps:

1.  Build the Docker image: `docker build -t pasteit-server .`
2.  Run the Docker container: `docker run -p 8080:8080 pasteit-server`

This will deploy the server locally, and it will be accessible at `http://localhost:8080`.

Feel free to customize the deployment process based on your hosting environment.

### Additional Information

For more information on the dependencies used in the project, refer to the following links:

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Next UI](https://nextui.org/)
- [Rust](https://www.rust-lang.org/)
- [Actix-Web](https://actix.rs/)
- [SQLx](https://github.com/launchbadge/sqlx)
- [Dotenv](https://crates.io/crates/dotenv)
- [Docker](https://www.docker.com/)

Feel free to explore and enhance the project! If you have any questions, reach out to the project maintainers.
