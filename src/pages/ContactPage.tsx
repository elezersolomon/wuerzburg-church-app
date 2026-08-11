import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useLanguage } from "../context/LanguageContext";

interface ContactInfo {
  name: string;
  name_am?: string;
  name_de?: string;
  address: string;
  address_am?: string;
  address_de?: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website: string;
  hours: {
    sunday: string;
    wednesday: string;
    friday: string;
  };
  social: {
    facebook: string;
    twitter: string;
    youtube: string;
  };
}

const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const response = await fetch("/data/contact.json");
        const data = await response.json();
        setContact(data.contact);
      } catch (error) {
        console.error("Error loading contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>{t("loading")}</Box>;
  if (!contact) return <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>{t("errorLoadingContact")}</Box>;

  const activeAddress = language === "am" && contact.address_am ? contact.address_am : language === "de" && contact.address_de ? contact.address_de : contact.address;

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
          {t("contactUs")}
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
              {t("getInTouch")}
            </Typography>

            <Card sx={{ mb: 2, display: "flex", alignItems: "center", p: 2 }}>
              <LocationOnIcon
                sx={{ mr: 2, color: "#1b4d3e", fontSize: "2rem" }}
              />
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="subtitle2" sx={{ color: "#999" }}>
                  {t("address")}
                </Typography>
                <Typography variant="body1">{activeAddress}</Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2, display: "flex", alignItems: "center", p: 2 }}>
              <PhoneIcon sx={{ mr: 2, color: "#1b4d3e", fontSize: "2rem" }} />
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="subtitle2" sx={{ color: "#999" }}>
                  {t("phone")}
                </Typography>
                <Typography variant="body1">
                  <a
                    href={`tel:${contact.phone}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {contact.phone}
                  </a>
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2, display: "flex", alignItems: "center", p: 2 }}>
              <EmailIcon sx={{ mr: 2, color: "#1b4d3e", fontSize: "2rem" }} />
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="subtitle2" sx={{ color: "#999" }}>
                  {t("email")}
                </Typography>
                <Typography variant="body1">
                  <a
                    href={`mailto:${contact.email}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {contact.email}
                  </a>
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2, p: 2 }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <AccessTimeIcon sx={{ mr: 1, color: "#1b4d3e" }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {t("serviceTimes")}
                  </Typography>
                </Box>
                <Box sx={{ ml: 3 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>{t("sunday")}:</strong> {contact.hours.sunday}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>{t("wednesday")}:</strong> {contact.hours.wednesday}
                  </Typography>
                  <Typography variant="body2">
                    <strong>{t("friday")}:</strong> {contact.hours.friday}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ mb: 3, overflow: "hidden" }}>
              <Box
                component="iframe"
                width="100%"
                height="350"
                style={{ border: "none" }}
                title="Church Location"
                src={`https://maps.google.com/maps?q=${contact.latitude},${contact.longitude}&z=15&output=embed`}
              />
            </Card>

            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("sendUsAMessage")}
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {t("messageSuccess")}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label={t("yourName")}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label={t("yourEmail")}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label={t("message")}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: "#1b4d3e",
                    "&:hover": {
                      background: "#0f2d1f",
                    },
                  }}
                  fullWidth
                >
                  {t("sendMessage")}
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
