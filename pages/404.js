import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import WarningIcon from "@material-ui/icons/Warning";
import Layout from "@/components/Layout";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: 100,
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: blue[500],
  },
}));

export default function NotFoundPage() {
  const styles = useStyles();
  return (
    <Layout title="Page not found">
      <div className={styles.root}>
        <div>
          <div className={styles.header}>
            <WarningIcon fontSize="large" className={styles.icon} />
            <Typography variant="h3">404</Typography>
          </div>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Sorry, there is nothing here
          </Typography>
          <Link href="/">
            <a className={styles.link}>Go back home</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
