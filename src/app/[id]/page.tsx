'use client'
import React from "react";
//MUI
import Container from "@mui/material/Container";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface myParams {
  params: {
    id: string;
  };
}
async function getData(id: string) {
  const res = await fetch(`https://www.melivecode.com/api/attractions/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from id: " + id);
  }

  return res.json();
}

async function page({ params }: myParams) {

  const data = await getData(params.id);
  console.log(data);
  return (
    <Container maxWidth="lg" className="mt-10 bg-cyan-100">
      <Card >
        <CardMedia
          sx={{ height: 450 }}
          image={data?.attraction.coverimage}
          title={data?.attraction.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.attraction.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data.attraction.detail}
          </Typography>
        </CardContent>
        
      </Card>
    </Container>
  );
}

export default page;
