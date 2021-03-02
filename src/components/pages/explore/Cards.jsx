import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { Base, theme } from "@rent_avail/base";
import { Box } from "@rent_avail/layout";
import { API } from "aws-amplify";
import { listPosts } from "../../../graphql/queries";

function Cards() {
  const [post, setPost] = React.useState([]);

  React.useEffect(() => {
    fetchPost();
  }, []);
  async function fetchPost() {
    try {
      const _Posts = await API.graphql({
        query: listPosts,
        variables: {},
        authMode: "AWS_IAM",
      });
      setPost(_Posts.data.listPosts.items);
      console.log(
        `Executed query, data: ${JSON.stringify(_Posts.data.listPosts.items)}`
      );
    } catch (error) {
      console.log(`Error executing query: ${error}`);
    }
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Base />
        {post.map((items) => (
          <Container key={items.id}>
            <Box as="main" my="4rem">
              <Title>
                <SpanTitle>Ship Name: </SpanTitle>
                <SpanDesc>{items.shipname}</SpanDesc>
              </Title>
              <Title>
                <SpanTitle>IMO #: </SpanTitle>
                <SpanDesc>{items.imonumber}</SpanDesc>
              </Title>
              <Title>
                <SpanTitle>NM:</SpanTitle>
                <SpanDesc>{items.nauticalmile}</SpanDesc>
              </Title>
              <Title>
                <SpanTitle>Bearing:</SpanTitle>
                <SpanDesc>{items.bearing}</SpanDesc>
              </Title>
              <Title>
                <SpanTitle>Degree:</SpanTitle>
                <SpanDesc>{items.degree}&deg;</SpanDesc>
              </Title>
              <Title>
                <SpanTitle>Date of Occurrence:</SpanTitle>
                <SpanDesc>{items.createdAt}</SpanDesc>
              </Title>
              <Title>
                <SpanTitle>Time of Occurrence:</SpanTitle>
                <SpanDesc>{items.obsvtime}</SpanDesc>
              </Title>
              <Coords>
                <SpanTitle>Latitude:</SpanTitle>
                <SpanDesc>{items.latitude}</SpanDesc>
                <SpanTitle>Longitude:</SpanTitle>
                <SpanDesc>{items.longitude}</SpanDesc>
              </Coords>
              <Image>
                <Link target="_new" href={items.image}>
                  Image Link
                </Link>
              </Image>
            </Box>
          </Container>
        ))}
      </ThemeProvider>
    </>
  );
}

export default Cards;

const Container = styled.div`
  background-color: #003f88;
  width: 38rem;
  height: 35rem;
  display: flex;

  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 20px;
  &:hover {
    background-color: #00296b;
  }
`;
const Link = styled.a`
  text-decoration: none;
  color: #00296b;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;
const Image = styled.div`
  width: 8rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #00cb8d;
  color: #fff;
  margin: 19px 12px;
  text-decoration: none;
  &:hover {
    background-color: orange;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  margin: 2px 10px;
`;
const SpanTitle = styled.p`
  font-size: 17px;
  margin: 5px 6px;
  font-weight: bold;
  color: #fff;
`;
const SpanDesc = styled.span`
  font-size: 17px;
  color: #00296b;
  font-weight: bold;
  background-color: #00cb8d;
  padding: 5px 10px;
  border-radius: 5px;
`;

const Coords = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  margin: 2px 10px;
`;
