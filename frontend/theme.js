import { extendTheme } from "@chakra-ui/react"
import "@fontsource/red-hat-text/400.css";
import "@fontsource/red-hat-text/500.css";
import "@fontsource/red-hat-text/700.css";

const theme = extendTheme({
    fonts: {
      heading: "Red Hat Text, sans-serif",
      body: "Red Hat Text, sans-serif",
      button: "Red Hat Text, sans-serif",
    },
    colors: {
      brand: {
        100: "#FDFAFA", // off-white
        200: "#F0ECF7", // pastel purple
        300: "#ECBBBC", // light pink
        400: "#C3B8E5", // lavender
        500: "#819792", // sage green
        600: "#41534D", // darker green
      },
    },
    styles: {
      global: {
        "html, body": {
          background: "#FDFAFA",
        },
      },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: "medium",
              },
            variants: {
                solid: {
                    bg: "brand.500",
                    color: "white",
                    _hover: {
                        bg: "brand.600",
                        border: "none",
                    },
                    _active: {
                        bg: "brand.600",
                        border: "none",
                    },
                    _focus: {
                        border: "none",
                        boxShadow: "none",
                      },
                }
            }
        }
    }
  });
  
  export default theme;