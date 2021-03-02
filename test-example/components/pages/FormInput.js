import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { API, graphqlOperation } from "aws-amplify";
import { createPost } from "../../graphql/mutations";
import { withAuthenticator } from "@aws-amplify/ui-react";

function FormInput() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await API.graphql(graphqlOperation(createPost, { input: data }));
      console.log(`Executed mutation,   data:${JSON.stringify(data)}`);
    } catch (error) {
      console.log(`Error executing mutation: ${error}`);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <Input
          name="shipname"
          defaultValue=""
          placeholder="Ship Name"
          ref={register}
        />
        <Input
          name="latitude"
          defaultValue=""
          placeholder="latitude"
          ref={register}
        />
        <Input
          name="longitude"
          defaultValue=""
          placeholder="longitude"
          ref={register}
        />
        <Input
          name="imonumber"
          defaultValue=""
          placeholder="imonumber"
          ref={register}
        />
        <Input
          name="nauticalmile"
          defaultValue=""
          placeholder="nauticalmile"
          ref={register}
        />
        <Input
          name="bearing"
          defaultValue=""
          placeholder="bearing"
          ref={register}
        />
        <Input
          name="degree"
          defaultValue=""
          placeholder="degree"
          ref={register}
        />
        <Input
          name="image"
          defaultValue=""
          placeholder="image"
          ref={register}
        />
        <Input type="submit" />
      </Wrapper>
    </form>
  );
}

export default withAuthenticator(FormInput);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 200px;
  height: 40px;
  margin: 10px;
`;
