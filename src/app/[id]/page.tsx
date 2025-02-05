'use client';
import React, { useState, useEffect } from "react";
// MUI
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface MyParams {
  params: Promise<{
    id: string;
  }>;
}

async function getData(id: string) {
  const res = await fetch(`https://www.melivecode.com/api/attractions/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from id: " + id);
  }
  return res.json();
}

function Page({ params }: MyParams) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Unwrap the params Promise here
        const { id } = await params;  // Unwrap params object
        const data = await getData(id);  // Use the unwrapped id
        setData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);  // params is now unwrapped and accessible as an object

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="lg" className="mt-10 bg-cyan-100">
      <Card>
        <CardMedia
          sx={{ height: 450 }}
          image={data?.attraction.coverimage}
          title={data?.attraction.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.attraction.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data?.attraction.detail}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Page;
