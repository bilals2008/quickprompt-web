import { ThemeProvider } from "@/hooks/useTheme";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Download />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
