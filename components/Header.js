import { useContext } from "react";
import Link from "next/link";
import { AppBar, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    color: "inherit",
  },
  links: {
    color: "inherit",
    padding: theme.spacing(0, 1),
  },
  spacing: {
    paddingBottom: theme.spacing(6),
  },
}));

export default function Header() {
  const styles = useStyles();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={styles.root}>
      <AppBar position="fixed" color="primary">
        <Container maxWidth="md" className={styles.container}>
          <Link href="/">
            <a className={styles.links}>
              <Typography variant="h6">DJ Events</Typography>
            </a>
          </Link>
          <Search />
          <div className={styles.navLinks}>
            <Link href="/events">
              <a className={styles.links}>
                <Typography variant="body2">Events</Typography>
              </a>
            </Link>
            {user ? (
              <>
                <Link href="/events/add">
                  <a className={styles.links}>
                    <Typography variant="body2">Add Event</Typography>
                  </a>
                </Link>
                <Link href="/account/dashboard">
                  <a className={styles.links}>
                    <Typography variant="body2">Dashboard</Typography>
                  </a>
                </Link>
                <Link href="#">
                  <a className={styles.links} onClick={() => logout()}>
                    <Typography variant="body2">Logout</Typography>
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/account/login">
                  <a className={styles.links}>
                    <Typography variant="body2">Login</Typography>
                  </a>
                </Link>
              </>
            )}
          </div>
        </Container>
      </AppBar>
      <div className={styles.spacing}></div>
    </div>
  );
}
