import Link from "next/link";
import { useRouter } from "next/router";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { blue, red } from "@material-ui/core/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

const useStyles = makeStyles((theme) => ({
  controls: {
    display: "flex",
    justifyContent: "flex-end",
  },
  imageContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  image: {
    boxShadow: theme.shadows[2],
  },
  link: {
    color: blue[500],
  },
  editBtn: {
    border: `1px solid ${blue[100]}`,
    color: blue[500],
    "&:hover": {
      backgroundColor: blue[100],
    },
    marginRight: theme.spacing(1),
  },
  deleteBtn: {
    border: `1px solid ${red[100]}`,
    color: red[500],
    "&:hover": {
      backgroundColor: red[100],
    },
    marginRight: theme.spacing(1),
  },
}));

export default function EventPage({ evt }) {
  const styles = useStyles();
  const router = useRouter();

  // const deleteEvent = async () => {
  //   if (confirm("Are you sure?")) {
  //     const res = await fetch(`${API_URL}/events/${evt.id}`, {
  //       method: "DELETE",
  //     });
  //     const data = await res.json();

  //     if (!res.ok) {
  //       toast.error(data.message);
  //       return;
  //     }

  //     router.push("/events");
  //   }
  // };
  return (
    <Layout title={evt.name}>
      <ToastContainer position="top-center" theme="colored" />
      <div>
        {/* <div className={styles.controls}>
          <IconButton
            className={styles.editBtn}
            onClick={() => router.push(`/events/edit/${evt.id}`)}
          >
            <CreateIcon />
          </IconButton>
          <IconButton className={styles.deleteBtn} onClick={deleteEvent}>
            <DeleteIcon />
          </IconButton>
        </div> */}
        <Typography variant="body2" color="textSecondary">
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </Typography>
        <Typography variant="h5">{evt.name}</Typography>
        {evt.image && (
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              alt={evt.name}
              src={evt.image.formats.large.url}
              width="100%"
            />
          </div>
        )}
        <Typography variant="h6">Performers:</Typography>
        <Typography variant="body2" paragraph>
          {evt.performers}
        </Typography>
        <Typography variant="h6">Description:</Typography>
        <Typography variant="body2" paragraph>
          {evt.description}
        </Typography>
        <Typography variant="h6">Venue: {evt.venue}</Typography>
        <Typography variant="body2" paragraph>
          {evt.address}
        </Typography>
        <Link href="/events">
          <a className={styles.link}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();
//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();
  return {
    props: {
      evt: events[0],
    },
  };
}
