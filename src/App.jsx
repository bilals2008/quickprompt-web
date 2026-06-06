import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

import { Features } from "@/components/Features";
import { Download } from "@/components/Download";
import { PromptNest } from "@/components/PromptNest";
import { Footer } from "@/components/Footer";
import { ChangelogPage } from "@/components/pages/changelog-page";

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <Features />

        <Download />

        <PromptNest />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
