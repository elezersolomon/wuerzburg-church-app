
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
} from "@mui/material";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import churchLogo from "./assets/logo.png";
import "./App.css";

function AppContent() {
  const { language, setLanguage, t } = useLanguage();

  const navigationItems = [
    { label: t("home"), path: "/" },
    { label: t("news"), path: "/news" },
    { label: t("contact"), path: "/contact" },
  ];

  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* Header */}
        <AppBar
          position="static"
          sx={{
            background: "linear-gradient(135deg, #1b4d3e 0%, #2c3e50 100%)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar sx={{ flexDirection: "column", alignItems: "flex-start", py: 2, gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  component="img"
                  src={churchLogo}
                  alt={t("churchName")}
                  sx={{
                    width: 44,
                    height: 44,
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                  }}
                />
                <Box sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                  {t("churchName")}
                </Box>
              </Box>

              {/* Language Selector */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {[
                  { code: "en", label: "EN" },
                  { code: "am", label: "አማ" },
                  { code: "de", label: "DE" },
                ].map((lang, index) => (
                  <span key={lang.code} style={{ display: "inline-flex", alignItems: "center" }}>
                    <button
                      onClick={() => setLanguage(lang.code as "en" | "am" | "de")}
                      style={{
                        background: "none",
                        border: "none",
                        color: language === lang.code ? "#4db6ac" : "white",
                        fontWeight: language === lang.code ? "bold" : "normal",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {lang.label}
                    </button>
                    {index < 2 && (
                      <Box component="span" sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", mx: 0.5 }}>
                        |
                      </Box>
                    )}
                  </span>
                ))}
              </Box>
            </Box>

            {/* Navigation Menu */}
            <Box sx={{ display: "flex", gap: { xs: 2.5, sm: 3.5 } }}>
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "1rem",
                    transition: "opacity 0.2s ease-in-out",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            background: "#2c3e50",
            color: "white",
            padding: "2rem",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <Container>
            <p>{t("copyright")}</p>
            <p>{t("footerWelcome")}</p>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
