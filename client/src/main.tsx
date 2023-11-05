import React from "react";
import ReactDOM from "react-dom/client";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <NextUIProvider>
  <NextThemesProvider attribute="class" defaultTheme="dark">
    <main className="text-foreground bg-background">
      
      <App />
    </main>
    </NextThemesProvider>
  </NextUIProvider>
</React.StrictMode>,
)
