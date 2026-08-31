import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Slideshow from "../components/Slideshow";
import { useLanguage } from "../context/LanguageContext";

interface Slide {
  id: number;
  title: string;
  title_am?: string;
  title_de?: string;
  description: string;
  description_am?: string;
  description_de?: string;
  image: string;
  cta: string;
  cta_am?: string;
  cta_de?: string;
}

interface HomePageData {
  slides: Slide[];
}

const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/slideshow.json`);
        const data: HomePageData = await response.json();
        setSlides(data.slides);
      } catch (error) {
        console.error("Error loading slideshow data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSlides();
  }, []);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>{t("loading")}</Box>;

  const localizedSlides = slides.map((slide) => ({
    ...slide,
    title: language === "am" && slide.title_am ? slide.title_am : language === "de" && slide.title_de ? slide.title_de : slide.title,
    description: language === "am" && slide.description_am ? slide.description_am : language === "de" && slide.description_de ? slide.description_de : slide.description,
    cta: language === "am" && slide.cta_am ? slide.cta_am : language === "de" && slide.cta_de ? slide.cta_de : slide.cta,
  }));

  return (
    <Box>
      {slides.length > 0 && <Slideshow slides={localizedSlides} />}

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            {t("welcomeTitle")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#666", fontSize: "1.1rem" }}
          >
            {t("welcomeIntro")}
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            {t("ourServices")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#666", maxWidth: "600px", mx: "auto" }}
          >
            {t("servicesIntro")}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {[
            {
              title: t("sundayWorshipTitle"),
              description: t("sundayWorshipDesc"),
              color: "#1b4d3e",
              bgColor: "#E8F5E9",
              icon: "✝",
            },
            {
              title: t("prayerServicesTitle"),
              description: t("prayerServicesDesc"),
              color: "#0f2d1f",
              bgColor: "#F3E5F5",
              icon: "🙏",
            },
            {
              title: t("youthProgramsTitle"),
              description: t("youthProgramsDesc"),
              color: "#1b4d3e",
              bgColor: "#E3F2FD",
              icon: "👥",
            },
            {
              title: t("communityServiceTitle"),
              description: t("communityServiceDesc"),
              color: "#0f2d1f",
              bgColor: "#FFF3E0",
              icon: "❤",
            },
          ].map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: `5px solid ${service.color}`,
                  backgroundColor: service.bgColor,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: "3rem",
                    textAlign: "center",
                    pt: 2,
                    color: service.color,
                  }}
                >
                  {service.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1, pt: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: service.color,
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", lineHeight: 1.6 }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          {t("aboutOurCommunity")}
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image="https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=600&h=300&fit=crop"
                alt="Church"
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {t("ourFaithTitle")}
                </Typography>
                <Typography variant="body2">
                  {t("ourFaithBody")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=300&fit=crop"
                alt="Community"
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {t("ourCommunityTitle")}
                </Typography>
                <Typography variant="body2">
                  {t("ourCommunityBody")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            {t("watchOurVideo")}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/DN6hlp9YGHc"
            title={t("watchOurVideo")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
