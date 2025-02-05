"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
//From MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
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
export default async function Home() {
  const data = await getData();
  console.log(data);
  return (
    <Container maxWidth="md" className="mt-20 bg-linear-45 from-sky-400 to-cyan-600">

      <Grid container spacing={4}>
        {data.map((a: Attraction) => {
          return (
            <Grid item xs={12} md={4} key={a.id}>
              {" "}
              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  image={a.coverimage}
                  title={a.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {a.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {a.detail.length > 120
                      ? a.detail.slice(0, 120) + "..."
                      : a.detail}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={"/" + a.id}>Learn More</Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
