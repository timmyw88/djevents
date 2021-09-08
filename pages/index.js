import Link from "next/link";
import { Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function HomePage({ events }) {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      {events.length === 0 && (
        <Typography variant="h6">No events to show</Typography>
      )}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a style={{ color: blue[500] }}>View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: {
      events,
    },
    revalidate: 1,
  };
}
