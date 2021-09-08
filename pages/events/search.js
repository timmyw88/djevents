import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
import Layout from "@/components/Layout";
import { blue } from "@material-ui/core/colors";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import qs from "qs";

export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/events">
        <a style={{ color: blue[500] }}>{"<"} Go Back</a>
      </Link>
      <Typography variant="h4" gutterBottom>
        Search Results for {`"${router.query.term}"`}
      </Typography>
      {events.length === 0 && (
        <Typography variant="h6">No events to show</Typography>
      )}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
