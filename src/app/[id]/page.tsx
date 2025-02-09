"use client";
import React, { useState, useEffect,use } from "react";
// MUI
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// Define the structure of the attraction data
interface Attraction {
  attraction: {
    name: string;
    detail: string;
    coverimage: string;
  };
}

interface MyParams {
  params: Promise<{
    id: string;
  }>;
}

function Page({ params }: MyParams) {
  const { id } = use(params);
  const [data, setData] = useState<Attraction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Unwrap the params Promise here
      const res = await fetch(
        `https://www.melivecode.com/api/attractions/${id}`
      );
      const predata = await res.json();
      setData(predata);
      console.log("Its try process");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

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
