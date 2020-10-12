import React from "react";
import { FlatListSlider } from "react-native-flatlist-slider";
import { carouselImg } from "./_dataDummy";

const Carousel = () => {
  return (
    <FlatListSlider
      data={carouselImg}
      timer={3000}
      indicatorContainerStyle={{ position: "absolute", bottom: 12 }}
      indicatorActiveColor={"#57606f"}
      indicatorInActiveColor={"#a4b0be"}
      indicatorActiveWidth={25}
      animation
    />
  );
};

export default Carousel;
