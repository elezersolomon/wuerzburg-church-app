import React, { useRef, useState, useEffect, useCallback } from "react";
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

const SLIDE_INTERVAL_MS = 5000;

const Slideshow: React.FC<SlideshowProps> = ({ slides }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = slides.length;

  const handleNext = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % total);
  }, [total]);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Measure the slideshow width so the track can slide by exactly one slide.
  useEffect(() => {
    const host = trackRef.current?.parentElement;
    if (!host) return;
    const update = () => setContainerWidth(host.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Auto-advance (pauses while the mouse is over the slideshow).
  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(handleNext, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, total, handleNext]);

  if (total === 0) return null;

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "300px", sm: "400px", md: "500px" },
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta < -40) handleNext();
        else if (delta > 40) handleBack();
        touchStartX.current = null;
      }}
    >
      {/* Sliding track: all slides side by side, translated by activeStep */}
      <Box
        ref={trackRef}
        sx={{
          display: "flex",
          height: "100%",
          width: containerWidth > 0 ? `${containerWidth}px` : "100%",
          transition: "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform: `translateX(${-activeStep * containerWidth}px)`,
          willChange: "transform",
        }}
      >
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              flex: "0 0 100%",
              height: "100%",
              position: "relative",
              backgroundImage: `url(${slide.image})`,
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
                {slide.title}
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
                {slide.description}
              </Typography>
            </Container>
          </Box>
        ))}
      </Box>

      {/* Controls */}
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
          steps={total}
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
