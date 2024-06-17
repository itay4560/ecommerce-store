import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { ArrowBackIos } from "@mui/icons-material";
import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const HeroSilder = () => {
  const useStyles = makeStyles((theme) => ({
    slide: {
      height: "calc(100vh - 64px)",
      width: "100%",
      position: "relative",
    },
    slideContent: {
      position: "absolute",
      top: "50%",
      left: "10%",
      transform: "translateY(-50%)",
      textAlign: "left",
      color: "#fff",
      zIndex: 1,
    },
    quote: {
      fontSize: "16px",
      width: "30vw",
      fontWeight: 500,
    },
    saleText: {
      fontSize: "32px",
      fontFamily: "Roboto",
      fontWeight: "800",
      width: "45vw",
    },
    productButton: {
      backgroundColor: "transparent",
      color: "#fff",
      transition: "background-color 0.3s ease-in-out",
      "&:hover": {
        color: "#000",
      },
    },
    slideImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  }));

  const slides = [
    {
      image: "/Image/Cricket-wepon/img2.png",
      quote:
        "Unleash Your Passion for Cricket and Embrace the Thrill of the Game",
      saleText:
        "Get in the game with up to 50% off on a wide range of cricket gear's",
      productText: "Shop Now",
    },
    {
      image: "/Image/Cricket-wepon/03.jpg",
      quote:
        "Experience the Unparalleled Excitement and Achieve Victory with Our Premium Cricket Equipment",
      saleText:
        "Limited Time Offer: Don't miss out on the opportunity to upgrade your game",
      productText: "Buy Now",
    },
    {
      image: "/Image/Cricket-wepon/01.jpg",
      quote:
        "Gear up with the Latest Innovations and Dominate the Field like Never Before",
      saleText: "Discover New Arrivals and stay ahead of the competition",
      productText: "Explore",
    },
    {
      image: "/Image/Cricket-wepon/04.jpg",
      quote:
        "Elevate Your Performance and Unleash Your True Cricketing Potential with Our Cutting-Edge Gear",
      saleText: "New Arrivals: Enhance your skills and excel on the field",
      productText: "Upgrade Now",
    },
  ];

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + slides.length) % slides.length
    );
  };

  return (
    <Box sx={{ marginTop: "-6px" }}>
      <Carousel
        autoPlay={true}
        navButtonsAlwaysVisible
        indicators={false}
        animation="slide"
        interval={5000}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            backgroundColor: "#00000088",
            borderRadius: 0,
            padding: 0,
            margin: 0,
            height: "100%",
          },
        }}
        PrevIcon={
          <Button
            className="slider-nav-btn prev"
            onClick={handleBack}
            startIcon={<ArrowBackIos />}
          ></Button>
        }
        NextIcon={
          <Button
            className="slider-nav-btn next"
            onClick={handleNext}
            endIcon={<ArrowForwardIos />}
          ></Button>
        }
        fullHeightHover={false}
        className={classes.slide}
        index={activeStep}
      >
        {slides.map((slide, index) => (
          <div key={index} className={classes.slide}>
            <img
              src={slide.image}
              alt="slider"
              className={classes.slideImage}
            />
            <div className={classes.slideContent}>
              <h2 className={classes.quote}>{slide.quote}</h2>
              <h3 className={classes.saleText}>{slide.saleText}</h3>
              <Link to="/products">
                <Button className={classes.productButton}>
                  {slide.productText}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default HeroSilder;
