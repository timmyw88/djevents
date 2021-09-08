import { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "@/config/index";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "block",
  },
  spacing: {
    paddingTop: theme.spacing(2),
  },
}));

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const styles = useStyles();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Upload Event Image
      </Typography>
      <div className={styles.spacing}></div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          className={styles.input}
          onChange={handleFileChange}
        />
        <div className={styles.spacing}></div>
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </form>
    </>
  );
}
