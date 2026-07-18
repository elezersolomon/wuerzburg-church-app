
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
} from "@mui/material";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

function App() {
  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "News", path: "/news" },
    { label: "Contact", path: "/contact" },
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
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ fontSize: "1.5rem" }}>✝️</Box>
              <Box sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                St. Mark Church
              </Box>
            </Box>

            {/* Navigation Menu */}
            <Box sx={{ display: "flex", gap: { xs: 2.5, sm: 3.5 } }}>
              {navigationItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
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
                </a>
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
            <p>&copy; 2026 St. Mark Church Würzburg. All rights reserved.</p>
            <p>Everyone is welcome. 📍 Würzburg, Germany</p>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
