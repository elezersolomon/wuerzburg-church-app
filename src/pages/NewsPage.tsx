import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  TextField,
} from "@mui/material";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  image: string;
}

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch("/data/news.json");
        const data = await response.json();
        setNews(data.news);
        setFilteredNews(data.news);
      } catch (error) {
        console.error("Error loading news data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredNews(filtered);
  }, [searchTerm, selectedCategory, news]);

  const categories = Array.from(new Set(news.map((item) => item.category)));

  if (loading) return <div>Loading...</div>;

  return (
    <Box>
      <Box
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=1200&h=400&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 6,
          textAlign: "center",
          color: "white",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontWeight: "bold", position: "relative", zIndex: 10 }}
        >
          Church News and Updates
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label="All"
              onClick={() => setSelectedCategory("")}
              color={selectedCategory === "" ? "primary" : "default"}
              variant={selectedCategory === "" ? "filled" : "outlined"}
            />
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? "primary" : "default"}
                variant={selectedCategory === category ? "filled" : "outlined"}
              />
            ))}
          </Box>
        </Box>

        {filteredNews.length > 0 ? (
          <Grid container spacing={3}>
            {filteredNews.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 1 }}>
                      <Chip
                        label={item.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: "#999" }}>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", my: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {item.content.substring(0, 150)}...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" sx={{ color: "#999" }}>
              No news items found.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default NewsPage;
