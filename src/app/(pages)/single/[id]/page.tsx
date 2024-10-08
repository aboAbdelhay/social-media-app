"use client";
import PostDetails from "@/app/_components/postdetails/postDetails";
import Loading from "@/app/loading";
import { Post } from "@/interfaces/postinterface";
import { gitSinglePost } from "@/redux/slices/postsSlice";
import { storeDispath, storeState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";

export default function SinglePost({
  params: { id },
}: {
  params: { id: string };
}) {
  let { post, isLoading }: { post: Post; isLoading: Boolean } = useSelector(
    (state: storeState) => state.postsReducer
  );
  let dispatch = useDispatch<storeDispath>();
  useEffect(() => {
    dispatch(gitSinglePost(id));
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : post ? (
        <Container maxWidth="md">
          <PostDetails postD={post} allComments={true} />
        </Container>
      ) : (
        ""
      )}
    </>
  );
}
