import { CssBaseline, createTheme, ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.css";

const theme = createTheme({
  palette: {
    primary: {
      light: "#666",
      main: "#333",
      dark: "#222",
      contrastText: "#fff",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
