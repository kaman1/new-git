import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Base, theme } from "@rent_avail/base";
import { MapPin, Navigation, Hash } from "react-feather";
import DirectionsBoatTwoToneIcon from "@material-ui/icons/DirectionsBoatTwoTone";
import {
  Select,
  SelectInput,
  SelectList,
  SelectItem,
} from "@rent_avail/select";
import { Container, Box, Stack, Card } from "@rent_avail/layout";
import { Text, Heading } from "@rent_avail/typography";
import { Button } from "@rent_avail/controls";
import {
  Dialog,
  DialogTarget,
  DialogHeader,
  FullscreenDialog,
} from "@rent_avail/dialog";
import { FullscreenFeedback } from "@rent_avail/feedback";

import Input from "@rent_avail/input";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { options, SelectDegs } from "./degrees";

import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../../graphql/mutations";

import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../navbar/responsive";
import AccessTimeIcon from '@material-ui/icons/AccessTime';


const UpdateData = (props) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const [bearing, setBearing] = useState(options[0].value);
  const [degree, setDegree] = useState(SelectDegs[0].value);
  const [openF, setOpenF] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const refreshPage = async () => {
    await window.location.reload();
  };

  const onSubmit = async (data) => {
    const newData = {
      id: data.id,
      shipname: data.shipname,
      latitude: data.latitude,
      longitude: data.longitude,
      imonumber: data.imonumber,
      nauticalmile: data.nauticalmile,
      bearing: bearing,
      obsvtime: data.obsvtime,
      degree: degree,
      createdAt: data.createdAt,
    };

    console.log(newData);

    try {
      await API.graphql({
        query: mutations.updatePost,
        variables: { input: newData },
      });
      console.log(`Executed mutation,   data:${JSON.stringify(newData)}`);
    } catch (error) {
      console.log(`Error executing mutation: ${error}`);
    }
  };

  const [open, setOpen] = React.useState(false);
  function handleClick() {
    setOpen((o) => !o);
  }
  return (
    <ThemeProvider theme={theme}>
      <Base />
      <Dialog open={open} toggle={handleClick} id="fullscreen-id">
        <DialogTarget>
          <EditButton onClick={handleClick}>Edit</EditButton>
        </DialogTarget>
        <FullscreenDialog>
          <Container>
            <DialogHeader title="Edit Observation" />
            <Wrapper as="main" my="3rem">
              <Container as={Stack}>
                {!isMobile && (
                  <CardTitle>
                    <>
                      <div>
                        <Heading as="h3">Observation updated.</Heading>
                        <Text>Update your observation</Text>
                      </div>
                      <AmplifySignOut />
                    </>
                  </CardTitle>
                )}

                {isMobile && (
                  <CardTitle>
                    <AmplifySignOut />
                  </CardTitle>
                )}

                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                  {/* <InputData
                    ref={register}
                    onChange={onChange}
                    name="image"
                    type="file"
                    id="file-input"
                    accept="image/*"
                  /> */}
                  <InputId
                    defaultValue={props.id}
                    ref={register}
                    name="id"
                    editable={false}
                  />
                  <InputData
                    label="Ship Name"
                    icon={DirectionsBoatTwoToneIcon}
                    name="shipname"
                    defaultValue={props.shipname}
                    ref={register}
                  />
                  <InputData
                    icon={MapPin}
                    label="Latitude"
                    name="latitude"
                    defaultValue={props.latitude}
                    ref={register}
                  />
                  <InputData
                    icon={MapPin}
                    label="Longitude"
                    name="longitude"
                    defaultValue={props.longitude}
                    ref={register}
                  />
                  <InputData
                    label="IMO Number"
                    icon={Hash}
                    name="imonumber"
                    defaultValue={props.imonumber}
                    autoComplete="off"
                    ref={register}
                  />
                  <InputData
                    label="Nautical Mile"
                    icon={Navigation}
                    name="nauticalmile"
                    defaultValue={props.nauticalmile}
                    autoComplete="off"
                    ref={register}
                  />
                  <InputData
                    label="Nautical Mile"
                    icon={Navigation}
                    name="nauticalmile"
                    defaultValue={props.updatedAt}
                    autoComplete="off"
                    ref={register}
                  />
                  <InputData
                    label="created At"
                    type="date"
                    name="createdAt"
                    defaultValue={props.createdAt}
                    autoComplete="off"
                    ref={register}
                  />
                  <Select
                    id="select-id"
                    onSelect={(value) => setBearing(value)}
                    defaultValue={props.bearing}
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
                    defaultValue={props.degree}
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
                  <SubmitForm type="submit" onClick={(e) => setOpenF(true)}>
                    Submit observation
                  </SubmitForm>
                </Box>
                <FullscreenFeedback
                  open={openF}
                  steps={[
                    "Checking your image",
                    "Verifying your data",
                    "Sending your observation",
                  ]}
                  success={<Heading as="h4">Observation Submitted</Heading>}
                  onAnimationEnd={() =>
                    setTimeout(() => setOpenF(false), 1000, refreshPage())
                  }
                />
              </Container>
            </Wrapper>
          </Container>
        </FullscreenDialog>
      </Dialog>
    </ThemeProvider>
  );
};

export default UpdateData;

const InputId = styled.input`
  background-color: black;
  color: black;
  border: none;
  opacity: 0;
  width: 1px;
  height: 1px;
`;

const EditButton = styled(Button)`
  background-color: orange;
  margin-left: 13px;
  border-radius: 7px;
`;

const InputData = styled(Input)`
  border-color: #00296b;
  color: #00296b;
  label {
    font-size: 11px;
  }

  &:hover {
    border-color: #00cb8d;
  }
`;

const SelectedItem = styled(SelectInput)`
  border-color: #00296b;
  color: #00296b;
  label {
    font-size: 11px;
    color: #00296b;
  }
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
  width: auto;
`;
