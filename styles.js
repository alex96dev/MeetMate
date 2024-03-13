import { createGlobalStyle } from "styled-components";

export const theme = {
  primaryColor: "#efe8d8",
  textColor: "#262524",
  secondaryColors: {
    sports: "#86b2b1",
    culture: "#c16b6b",
    food: "#e2aa60",
    outdoor: "#96ad8c",
    default: "#efe8d8",
  },
  fonts: {
    heading: "Averia Serif Libre, serif",
    text: "Noto Serif Thai Condensed, serif",
  },
  fontSizes: {
    xs: "0.5rem",
    small: "1rem",
    medium: "1.5rem",
    large: "2rem",
    xl: "2.5rem",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
    xl: "2rem",
  },
  box: {
    shadow: "5px 5px 0 #262524",
    height: "6rem",
  },
  borderRadius: {
    small: "5px",
    medium: "10px",
    large: "15px",
  },
  borderWidth: {
    thin: "1px",
    medium: "2px",
    thick: "4px",
  },
  button: {
    small: "2rem",
    medium: "4rem",
    large: "8rem",
  },
};

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${theme.fonts.text};
    color: ${theme.textColor};
    background-color: ${theme.primaryColor}
  }

h1, h2, h3, h4{
  font-family: ${theme.fonts.heading};
}

h1{
font-size: ${theme.fontSizes.xl}
}

h2{ 
  font-size: ${theme.fontSizes.medium}
}

h4{
  font-size: ${theme.fontSizes.small}
}

li{
  list-style: none;
  font-size: ${theme.fontSizes.medium}

}

p{
font-size: ${theme.fontSizes.medium}
}

button{
height: ${theme.button.small};
}

a {
  text-decoration: none;
color: ${theme.textColor};
}

`;
