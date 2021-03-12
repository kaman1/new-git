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
import { FullscreenFeedback, InlineFeedback } from "@rent_avail/feedback";
import { ThemeProvider } from "styled-components";
import { Base, theme } from "@rent_avail/base";
import styled from "styled-components";
import { options, SelectDegs } from "./degrees";
import { useForm } from "react-hook-form";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify, { Storage } from "aws-amplify";

import {
  Dialog,
  DialogTarget,
  DialogHeader,
  FullscreenDialog,
  ConfirmationDialog,
} from "@rent_avail/dialog";

import { API, graphqlOperation } from "aws-amplify";
import { createPost } from "../../../graphql/mutations";

import { Link } from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

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

  const [loaded, setLoaded] = useState(false);
  function handleToggle() {
    setOpen(false);
    setLoaded(false);
  }

  const refreshPage = async () => {
    await window.location.reload();
  };

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
            <ViewAll>View All My Observations</ViewAll>
          </Link>

          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {name ? (
                <label
                  for="image_uploads"
                  style={{
                    backgroundColor: "green",
                    color: "#fff",
                    width: "350px",
                    height: "50px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Image uploaded 👍
                </label>
              ) : (
                <label
                  for="image_uploads"
                  style={{
                    backgroundColor: "orange",
                    color: "#fff",
                    width: "350px",
                    height: "50px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  📸 Upload an image (PNG, JPG)
                </label>
              )}

              <div
                style={{
                  opacity: 0,
                }}
              >
                <input
                  multiple
                  ref={register}
                  onChange={onChange}
                  name="image"
                  type="file"
                  id="image_uploads"
                  accept="image/*"
                />
              </div>
            </div>

            <InputData
              icon={MapPin}
              label="Latitude (eg: 11.523088)"
              name="latitude"
              ref={register}
            />
            <InputData
              icon={MapPin}
              label="Longitude (eg: 118.933152)"
              name="longitude"
              ref={register}
            />
            <InputData
              icon={DirectionsBoatTwoToneIcon}
              label="Ship Name (if Available)"
              name="shipname"
              autoComplete="off"
              defaultValue=""
              ref={register}
            />
            <InputData
              icon={Hash}
              label="IMO (if Available)"
              name="imonumber"
              defaultValue=""
              autoComplete="off"
              ref={register}
            />
            <InputData
              icon={Navigation}
              label="Distance from you (NM)"
              name="nauticalmile"
              defaultValue=""
              autoComplete="off"
              ref={register}
            />

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
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <InputTime
                label="Observed Date"
                type="date"
                name="createdAt"
                defaultValue=""
                autoComplete="off"
                ref={register}
              />
              <InputTime
                icon={AccessTimeIcon}
                label="Time"
                name="obsvtime"
                defaultValue=""
                autoComplete="off"
                ref={register}
              />
            </div>

            <SubmitForm type="submit" onClick={(e) => setOpen(!open)}>
              Submit observation
            </SubmitForm>
          </Box>
          <Dialog open={open} toggle={handleToggle} id="confirmation-id">
            <ConfirmationDialog>
              <InlineFeedback
                steps={[
                  "Optimizing your photo",
                  "Connecting to the cloud",
                  "Uploading your observation",
                ]}
                onAnimationEnd={() => setLoaded(true)}
              />
              {loaded && (
                <Box
                  initial={{ opacity: 0, y: "1rem" }}
                  animate={{ opacity: 1, y: 0 }}
                  mt="2rem"
                >
                  <Btn onClick={() => refreshPage()}>CLOSE</Btn>
                  <Heading as="h3" color="#52b69a" fontWeight="bold">
                    Observation Published
                  </Heading>
                </Box>
              )}
            </ConfirmationDialog>
          </Dialog>
        </Container>
        <div style={{ padding: 200 }} />
      </Wrapper>
    </ThemeProvider>
  );
}

export default withAuthenticator(Form);

const Btn = styled.button`
  border: none;
  color: #fff;
  background: orange;
  padding: 8px;
  font-size: 35;
  top: 25px;
  right: 25px;
  position: absolute;
`;

const InputData = styled(Input)`
  border-color: #00296b;
  color: #00296b;

  &:hover {
    border-color: #00cb8d;
  }
`;
const InputTime = styled(Input)`
  border-color: #00296b;
  color: #00296b;
  width: 100%;

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
