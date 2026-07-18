import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  MobileStepper,
  Container,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  cta: string;
}

interface SlideshowProps {
  slides: Slide[];
}

const Slideshow: React.FC<SlideshowProps> = ({ slides }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  const currentSlide = slides[activeStep];

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "300px", sm: "400px", md: "500px" },
        width: "100%",
        overflow: "hidden",
        backgroundImage: `url(${currentSlide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {currentSlide.title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          {currentSlide.description}
        </Typography>
      </Container>

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          zIndex: 20,
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            },
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>

        <MobileStepper
          variant="dots"
          steps={slides.length}
          position="static"
          activeStep={activeStep}
          sx={{
            backgroundColor: "transparent",
            "& .MuiLinearProgress-root": {
              display: "none",
            },
          }}
          nextButton={<div />}
          backButton={<div />}
        />

        <IconButton
          onClick={handleNext}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            },
          }}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Slideshow;
