import React from "react";
import {
  Box,
  Button,
  Card,
  FileInput,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { Upload } from "@phosphor-icons/react";

export default function Compose() {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: "#F5F7F8" }}
    >
      <Title order={2} mb="md">
        Compose File
      </Title>
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        style={{
          backgroundColor: "#F5F7F8",
          padding: "16px",
        }}
      >
        <TextInput
          label="Title of File"
          placeholder="Enter file title"
          mb="sm"
        />
        <Textarea label="Description" placeholder="Enter description" mb="sm" />
        <TextInput
          label="Create as"
          placeholder="Enter creation type"
          mb="sm"
        />
        <FileInput
          label="Attach file (PDF, JPG, PNG) (MAX: 10MB)"
          placeholder="Upload file"
          accept="application/pdf,image/jpeg,image/png"
          icon={<Upload size={14} />}
          mb="sm"
        />
        <Textarea label="Remark" placeholder="Enter remark" mb="sm" />
        <TextInput
          label="Forward To"
          placeholder="Enter forward recipient"
          mb="sm"
        />
        <TextInput
          label="Receiver Designation"
          placeholder="Enter receiver designation"
          mb="sm"
        />
        <Button
          type="submit"
          color="blue"
          style={{
            display: "block",
            margin: "0 auto",
            width: "200px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Card>
  );
}
