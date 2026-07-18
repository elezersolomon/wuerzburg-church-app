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

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  cta: string;
}

interface HomePageData {
  slides: Slide[];
}

const HomePage: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const response = await fetch("/data/slideshow.json");
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

  if (loading) return <div>Loading...</div>;

  return (
    <Box>
      {slides.length > 0 && <Slideshow slides={slides} />}

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Welcome to St. Mark Church
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#666", fontSize: "1.1rem" }}
          >
            A vibrant Ethiopian Orthodox community dedicated to worship,
            fellowship, and service. We gather together in faith and extend
            compassion to our neighbors.
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
            Our Services
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#666", maxWidth: "600px", mx: "auto" }}
          >
            We offer a variety of programs and services to support your
            spiritual journey and connect with our community.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {[
            {
              title: "Sunday Worship",
              description:
                "Join us every Sunday at 10:00 AM for our main service. All are welcome.",
              color: "#1b4d3e",
              bgColor: "#E8F5E9",
              icon: "✝",
            },
            {
              title: "Prayer Services",
              description:
                "Midweek prayer meetings and spiritual discussions. Wednesday evenings at 7:00 PM.",
              color: "#0f2d1f",
              bgColor: "#F3E5F5",
              icon: "🙏",
            },
            {
              title: "Youth Programs",
              description:
                "Programs for young people to grow in faith and community. Friday at 6:30 PM.",
              color: "#1b4d3e",
              bgColor: "#E3F2FD",
              icon: "👥",
            },
            {
              title: "Community Service",
              description:
                "We serve the community through various outreach and charitable initiatives.",
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
          About Our Community
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
                  Our Faith
                </Typography>
                <Typography variant="body2">
                  We are part of the Ethiopian Orthodox Tewahedo Church, one of
                  the oldest Christian traditions, with roots dating back to the
                  apostolic age.
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
                  Our Community
                </Typography>
                <Typography variant="body2">
                  St. Mark Church in Wuerzburg is a thriving multicultural
                  community that welcomes all people regardless of their
                  background.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
