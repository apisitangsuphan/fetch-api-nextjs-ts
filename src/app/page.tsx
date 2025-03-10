"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// From MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface Attraction {
  id: number;
  name: string;
  detail: string;
  coverimage: string;
  latitude: number;
  longitude: number;
}

async function getData() {
  const res = await fetch("https://melivecode.com/api/attractions");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Home() {
  const [data, setData] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth="md" className="my-20">
      <Grid container spacing={4}>
        {data.map((a: Attraction) => {
          return (
            <Grid item xs={12} md={4} key={a.id}>
              <Card>
                <CardMedia sx={{ height: 140 }} image={a.coverimage} title={a.name} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className="truncate">
                    {a.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {a.detail.length > 120 ? a.detail.slice(0, 120) + "..." : a.detail}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={"/" + a.id} className="hover:text-sky-400 p-3 border-1 border-gray-400">
                    Learn More
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
