"use client";
import { Button, Container, Paper, TextField } from "@mui/material";
import axios from "axios";
import React from "react";

export default function Profile() {
  async function addPost(values) {
    let { data } = await axios.post(
      `https://linked-posts.routemisr.com/posts`,
      values,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  function handleSubmit(e: Event) {
    let formData = new FormData();
    e.preventDefault();
    let body = e.target?.body.value;
    let image = e.target?.image.files[0];
    formData.append("body", body);
    formData.append("image", image);
    addPost(formData);
  }
  return (
    <Container maxWidth="md" sx={{}}>
      <Paper elevation={10} sx={{ p: 3, m: 3 }}>
        <h1
          style={{
            marginBottom: "30px",
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Add Post{" "}
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
        >
          <TextField
            type="text"
            name="body"
            id="body"
            label="body"
            variant="outlined"
            fullWidth
          />
          <TextField
            type="file"
            name="image"
            id="image"
            label="image"
            variant="outlined"
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            add{" "}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
