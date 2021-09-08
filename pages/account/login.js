import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(5),
    width: 400,
  },
  form: {
    marginTop: 20,
  },
  formGroup: { marginBottom: theme.spacing(2) },
  label: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#666",
  },
  input: {
    display: "block",
    width: "100%",
    padding: theme.spacing(1, 1, 1, 1),
    marginTop: 3,
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    outline: "none",
    fontSize: 16,
    color: "#666",
  },
  link: {
    color: blue[500],
  },
}));

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const styles = useStyles();
  const { login, error } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="DJ Events | Login">
      <div className={styles.root}>
        <Paper className={styles.paper}>
          <ToastContainer position="top-center" theme="colored" />
          <Typography variant="h6" gutterBottom>
            Sign In
          </Typography>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={styles.form}
          >
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign In
              </Button>
            </div>
          </form>
          <Typography variant="caption">
            Don{"'"}t have an account?{" "}
            <Link href="/account/register">
              <a className={styles.link}>Register</a>
            </Link>
          </Typography>
        </Paper>
      </div>
    </Layout>
  );
}
