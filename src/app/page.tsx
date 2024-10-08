"use client";
import { gitPosts } from "@/redux/slices/postsSlice";
import { storeDispath, storeState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loading";
import Container from "@mui/material/Container";
import PostDetails from "./_components/postdetails/PostDetails";

export default function Home() {
  const { push } = useRouter();
  const dispatch = useDispatch<storeDispath>();
  let { posts, isLoading } = useSelector(
    (state: storeState) => state.postsReducer
  );
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      push("/login");
    } else {
      dispatch(gitPosts());
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Container maxWidth="sm">
            {
              posts.map((post) => <PostDetails  key={post._id} postD={post} />)
            }
          </Container>
        </>
      )}
    </>
  );
}
