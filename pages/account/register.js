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

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const styles = useStyles();
  const { register, error } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    register({ username, email, password });
  };

  return (
    <Layout title="DJ Events | Registration">
      <ToastContainer position="top-center" theme="colored" />
      <div className={styles.root}>
        <Paper className={styles.paper}>
          <Typography variant="h6" gutterBottom>
            Sign Up
          </Typography>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={styles.form}
          >
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
              />
            </div>
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
              <label htmlFor="passwordConfirm" className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
                Sign Up
              </Button>
            </div>
          </form>
          <Typography variant="caption">
            Already have an account?{" "}
            <Link href="/account/login">
              <a className={styles.link}>Login</a>
            </Link>
          </Typography>
        </Paper>
      </div>
    </Layout>
  );
}
