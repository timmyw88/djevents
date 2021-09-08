import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import moment from "moment";

import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";

const useStyles = makeStyles((theme) => ({
  root: {},
  goBack: { color: blue[500] },
  spacing: { paddingTop: theme.spacing(1) },
  form: { marginTop: theme.spacing(3) },
  formGroup: { marginBottom: theme.spacing(2) },
  label: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#666",
  },
  input: {
    display: "block",
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    padding: theme.spacing(1, 1, 1, 1),
    marginTop: 3,
    backgroundColor: theme.palette.background.default,
    outline: "none",
    fontSize: 16,
    color: "#666",
  },
  imagePreview: { marginTop: theme.spacing(2) },
}));

export default function EditEventPage({ evt, token }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const styles = useStyles();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
      return;
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Unauthorized");
        return;
      }
      toast.error("Something went wrong");
      return;
    }

    const ev = await res.json();
    router.push(`/events/${ev.slug}`);
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <a className={styles.goBack}>{"<"} Go Back</a>
      </Link>
      <div className={styles.spacing}></div>
      <Typography variant="h5" gutterBottom>
        Edit Event
      </Typography>
      <ToastContainer position="top-center" theme="colored" />
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="venue" className={styles.label}>
                Venue
              </label>
              <input
                type="text"
                name="venue"
                value={values.venue}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="date" className={styles.label}>
                Date
              </label>
              <input
                type="date"
                name="date"
                value={moment(values.date).format("yyyy-MM-DD")}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.formGroup}>
              <label htmlFor="performers" className={styles.label}>
                Performers
              </label>
              <input
                type="text"
                name="performers"
                value={values.performers}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>
                Address
              </label>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="time" className={styles.label}>
                Time
              </label>
              <input
                type="text"
                name="time"
                value={values.time}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </Grid>
        </Grid>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleInputChange}
            className={styles.input}
            rows={6}
          ></textarea>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Update Event
        </Button>
      </form>
      <div className={styles.imagePreview}>
        <Typography variant="h6" gutterBottom>
          Event Image
        </Typography>
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="img-preview"
            width={170}
            height={100}
          />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No image uploaded
          </Typography>
        )}
      </div>
      <div className={styles.spacing}></div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
      >
        Set Image
      </Button>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: {
      evt,
      token,
    },
  };
}
