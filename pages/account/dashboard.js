import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import DashboardEvent from "@/components/DashboardEvent";

const useStyles = makeStyles((theme) => ({}));

export default function DashboardPage({ events, token }) {
  const styles = useStyles();
  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      router.push("/events");
    }
  };

  return (
    <Layout title="User Dashboard">
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        My Events
      </Typography>
      {events.map((evt) => (
        <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}
