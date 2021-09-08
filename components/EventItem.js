import Link from "next/link";
import Image from "next/image";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    marginRight: theme.spacing(6),
  },
  info: {
    flexGrow: 1,
  },
  btn: {
    textDecoration: "none",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: theme.spacing(2),
    borderRadius: 5,
    boxShadow: theme.shadows[2],
  },
}));

export default function EventItem({ evt }) {
  const styles = useStyles();

  return (
    <Paper className={styles.paper}>
      <div className={styles.image}>
        <Image
          src={
            evt.image
              ? evt.image.formats.thumbnail.url
              : "/images/event-default.png"
          }
          alt={evt.name}
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <Typography variant="body2" color="textSecondary">
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </Typography>
        <Typography variant="h6">{evt.name}</Typography>
      </div>
      <div>
        <Link href={`/events/${evt.slug}`}>
          <a className={styles.btn}>Details</a>
        </Link>
      </div>
    </Paper>
  );
}
