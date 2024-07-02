import { useState } from "react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Box,
} from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
function BudgetSlider({ formData, setFormData }) {
  const [sliderValue, setSliderValue] = useState([100, 300]);

  const handleSliderChange = (val) => {
    setSliderValue(val);
    setFormData({ ...formData, budget: val });
  };

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <Box p={4} pt={6}>
      <RangeSlider
        colorScheme="brand"
        aria-label={["min", "max"]}
        defaultValue={[100, 300]}
        min={100}
        max={300}
        onChangeEnd={handleSliderChange}
      >
        <RangeSliderMark value={100} {...labelStyles}>
          $100
        </RangeSliderMark>
        <RangeSliderMark value={300} {...labelStyles}>
          $300
        </RangeSliderMark>
        <RangeSliderMark
          value={sliderValue[0]}
          textAlign="center"
          bg="brand.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          ${sliderValue[0]}
        </RangeSliderMark>
        <RangeSliderMark
          value={sliderValue[1]}
          textAlign="center"
          bg="brand.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          ${sliderValue[1]}
        </RangeSliderMark>
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Box>
  );
}

export default BudgetSlider;
