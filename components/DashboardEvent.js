import Link from "next/link";
import { useRouter } from "next/router";
import { IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2, 3),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
}));

export default function DashboardEvent({ evt, handleDelete }) {
  const styles = useStyles();
  const router = useRouter();

  return (
    <Paper className={styles.paper}>
      <Link href={`/events/${evt.slug}`}>
        <a className={styles.title}>{evt.name}</a>
      </Link>
      <div>
        <IconButton onClick={() => router.push(`/events/edit/${evt.id}`)}>
          <CreateIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(evt.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Paper>
  );
}
