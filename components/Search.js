import { useState } from "react";
import { useRouter } from "next/router";
import { Typography, InputBase } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    position: "absolute",
    padding: theme.spacing(0, 1),
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    // paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    paddingLeft: theme.spacing(5),
    // transition: theme.transitions.create("width"),
    // width: "100%",
  },
}));

export default function Search() {
  const [term, setTerm] = useState("");
  const styles = useStyles();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };
  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search..."
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput,
        }}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </form>
  );
}
