import React from "react";
import {
  Box,
  Button,
  Card,
  FileInput,
  TextInput,
  Textarea,
  Title,
  ActionIcon,
  Text,
  Select,
} from "@mantine/core";
import { Upload, FloppyDisk } from "@phosphor-icons/react";
import { notifications } from "@mantine/notifications";

export default function Compose() {
  const handleSaveDraft = () => {
    notifications.show({
      title: "Draft Saved",
      message: "File has been saved as draft",
    });
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: "#F5F7F8", position: "relative" }}
    >
      {/* Icon at Top Right with Text Beneath */}
      <Box
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ActionIcon
          size="lg"
          variant="outline"
          color="blue"
          onClick={handleSaveDraft}
          title="Save as Draft"
        >
          <FloppyDisk size={20} />
        </ActionIcon>
        <Text color="blue" size="xs" mt={4}>
          Save as Draft
        </Text>
      </Box>

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
          icon={<Upload size={16} />} // Icon size corrected
          mb="sm"
          withAsterisk
        />
        <Textarea label="Remark" placeholder="Enter remark" mb="sm" />
        <TextInput
          label="Forward To"
          placeholder="Enter forward recipient"
          mb="sm"
        />
        {/* Receiver Designation as a dropdown */}
        <Select
          label="Receiver Designation"
          placeholder="Select designation"
          data={[
            { value: "Proffessor", label: "Proffessor" },
            { value: "Student", label: "Student" },
            { value: "Employee", label: "Employee" },
          ]}
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
