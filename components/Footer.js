import Link from "next/link";
import { blue } from "@material-ui/core/colors";

export default function Footer() {
  return (
    <footer
      style={{ textAlign: "center", marginTop: "100px", marginBottom: "40px" }}
    >
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link href="/about">
          <a style={{ textDecoration: "none", color: blue[500] }}>
            About this project
          </a>
        </Link>
      </p>
    </footer>
  );
}
