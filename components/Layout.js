import Head from "next/head";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <Container maxWidth="md" style={{ paddingTop: 20 }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find the latest DJ and other musical events",
  keywords: "music, dj, edm, events",
};
