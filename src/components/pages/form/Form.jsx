import React, { useState } from "react";
import { Container, Box, Stack, Card } from "@rent_avail/layout";
import { MapPin, Navigation, Hash } from "react-feather";
import DirectionsBoatTwoToneIcon from "@material-ui/icons/DirectionsBoatTwoTone";
import Input from "@rent_avail/input";
import {
  Select,
  SelectInput,
  SelectList,
  SelectItem,
} from "@rent_avail/select";
import { Text, Heading } from "@rent_avail/typography";
import { Button } from "@rent_avail/controls";
import { FullscreenFeedback } from "@rent_avail/feedback";
import { ThemeProvider } from "styled-components";
import { Base, theme } from "@rent_avail/base";
import styled from "styled-components";
import { options, SelectDegs } from "./degrees";
import { useForm } from "react-hook-form";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify, { Storage } from "aws-amplify";

import { API, graphqlOperation } from "aws-amplify";
import { createPost } from "../../../graphql/mutations";

import { Link } from "react-router-dom";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import awsConfig from "../../../aws-exports";
Amplify.configure(awsConfig);

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = awsConfig;

function Form() {
  const { register, handleSubmit, errors, reset } = useForm();
  const [bearing, setBearing] = useState(options[0].value);
  const [degree, setDegree] = useState(SelectDegs[0].value);
  const [open, setOpen] = useState(false);


  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [response, setResponse] = useState("");
  const [imageUploaded, setImage] = useState("");

  const refreshPage = async () => {
    await window.location.reload();
  };
  console.log(response);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.files[0] !== null) {
      setFile(e.target.files[0]);
      setName(e.target.files[0].name);
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (file) {
      Storage.put(name, file, {
        /* level: 'protected', */
        contentType: file.type,
      })
        .then((result) => {
          console.log(result);
          setImage(name);
          setResponse(`Success uploading file: ${name}!`);
        })
        .then(() => {
          document.getElementById("file-input").value = null;
          setFile(null);
        })
        .catch((err) => {
          console.log(err);
          setResponse(`Can't upload file: ${err}`);
        });
    } else {
      setResponse(`Files needed!`);
    }
    let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${name}`;

    const newData = {
      shipname: data.shipname,
      latitude: data.latitude,
      longitude: data.longitude,
      imonumber: data.imonumber,
      nauticalmile: data.nauticalmile,
      bearing: bearing,
      degree: degree,
      obsvtime: data.obsvtime,
      image: url,
      createdAt: data.createdAt,
    };

    try {
      await API.graphql(graphqlOperation(createPost, { input: newData }));
      console.log(`Executed mutation,   data:${JSON.stringify(newData)}`);
    } catch (error) {
      console.log(`Error executing mutation: ${error}`);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Base />
      <Wrapper as="main" my="3rem">
        <Container as={Stack}>
          <CardTitle>
            <div>
              <Heading as="h3">Report Form</Heading>
              <Text>Submit your observation</Text>
            </div>
            <AmplifySignOut />
          </CardTitle>
          <Link to="./edit">
            <ViewAll>Edit your observations</ViewAll>
          </Link>

          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <InputData
              ref={register}
              onChange={onChange}
              name="image"
              type="file"
              id="file-input"
              accept="image/*"
            />
            <InputData
              icon={DirectionsBoatTwoToneIcon}
              label="Ship Name"
              name="shipname"
              autoComplete="off"
              defaultValue=""
              ref={register}
            />
            <InputData
              icon={MapPin}
              label="Latitude"
              name="latitude"
              ref={register}
            />
            <InputData
              icon={MapPin}
              label="Longitude"
              name="longitude"
              ref={register}
            />
            <InputData
              icon={Hash}
              label="IMO"
              name="imonumber"
              defaultValue=""
              autoComplete="off"
              ref={register}
            />
            <InputData
              icon={Navigation}
              label="Nautical Miles"
              name="nauticalmile"
              defaultValue=""
              autoComplete="off"
              ref={register}
            />
            <InputData
              icon={AccessTimeIcon}
              label="Time (eg, H:Min:Time Zone)"
              name="obsvtime"
              defaultValue=""
              autoComplete="off"
              ref={register}
            />
            <InputData
              label="Date Field"
              type="date"
              name="createdAt"
              defaultValue=""
              autoComplete="off"
              ref={register}
            />
            {/* <Time>
              <TimePicker
                onChange={onTime}
                value={time}
                ref={register}
                defaultValue=""
              />
            </Time> */}

            <Select
              id="select-id"
              onSelect={(value) => setBearing(value)}
              defaultValue={options[0].value}
            >
              <SelectedItem label="Observed ship bearing" />
              <SelectList>
                {options.map(({ label, value }) => (
                  <SelectItem key={value} value={value} label={label}>
                    {label}
                  </SelectItem>
                ))}
              </SelectList>
            </Select>
            <Select
              id="select-id"
              onSelect={(value) => setDegree(value)}
              defaultValue={SelectDegs[0].value}
            >
              <SelectedItem label="Direction from you&deg;" />
              <SelectList>
                {SelectDegs.map(({ label, value }) => (
                  <SelectItem key={value} value={value} label={label}>
                    {label}
                  </SelectItem>
                ))}
              </SelectList>
            </Select>
            <SubmitForm type="submit" onClick={(e) => setOpen(true)}>
              Submit observation
            </SubmitForm>
          </Box>
          <FullscreenFeedback
            open={open}
            steps={[
              "Checking your location",
              "Verifying your credentials",
              "Sending your observation",
            ]}
            success={<Heading as="h4">Observation Submitted</Heading>}
            onAnimationEnd={() =>
              setTimeout(() => setOpen(false), 1000, refreshPage())
            }

          />
        </Container>
      </Wrapper>
    </ThemeProvider>
  );
}

export default withAuthenticator(Form);

const InputData = styled(Input)`
  border-color: #00296b;
  color: #00296b;

  &:hover {
    border-color: #00cb8d;
  }
`;

const SelectedItem = styled(SelectInput)`
  border-color: #00296b;
  color: #00296b;
  &:hover {
    border-color: #00cb8d;
  }
`;

const Wrapper = styled(Box)`
  margin: 0;
  padding: 50px 0;
  background-color: #d0ebff;
`;

const CardTitle = styled(Card)`
  background-color: #00cb8d;
  color: #00296b;
  border: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SubmitForm = styled(Button)`
  color: #fff;
  background-color: #00296b;
  height: 80px;
  width: 310px;
`;

const Time = styled.div`
  border-color: #00296b;
  font-size: 35px;
  height: 60px;
  margin-bottom: 30px;

  &:hover {
    border-color: #00cb8d;
  }
`;

const ViewAll = styled(Button)`
  background-color: #00296b;
  color: #fff;
  border: none;
  height: 80px;
  width: auto;
  margin: 20px 0;
`;

// {
//   "Version": "2012-10-17",
//   "Statement": [
//       {
//           "Effect": "Allow",
//           "Principal": "*",
//           "Action": [
//               "s3:GetObject",
//               "s3:PutObject"
//           ],
//           "Resource": [
//               "arn:aws:s3:::soa3final150145-dev/public/*",
//               "arn:aws:s3:::soa3final150145-dev/private/${cognito-identity.amazonaws.com:sub}/*"
//           ]
//       },
//       {
//           "Effect": "Allow",
//           "Principal": "*",
//           "Action": "s3:PutObject",
//           "Resource": "arn:aws:s3:::soa3final150145-dev/uploads/*"
//       },
//       {
//           "Effect": "Allow",
//           "Principal": "*",
//           "Action": "s3:ListBucket",
//           "Resource": "arn:aws:s3:::soa3final150145-dev",
//           "Condition": {
//               "StringLike": {
//                   "s3:prefix": [
//                       "public/",
//                       "public/*",
//                       "private/${cognito-identity.amazonaws.com:sub}/",
//                       "private/${cognito-identity.amazonaws.com:sub}/*"
//                   ]
//               }
//           }
//       }
//   ]
// }
