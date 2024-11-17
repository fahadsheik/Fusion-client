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
  Group,
} from "@mantine/core";
import { Upload, FloppyDisk, Trash } from "@phosphor-icons/react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

axios.defaults.withCredentials = true;
// eslint-disable-next-line no-unused-vars
export default function Compose() {
  const [file, setFile] = React.useState(null);
  const [designation, setDesignation] = React.useState("");
  const [receiver_username, setReceiverUsername] = React.useState("");
  const [receiver_designation, setReceiverDesignation] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [description, setDescription] = React.useState("");
  const handleFileChange = (uploadedFile) => {
    setFile(uploadedFile);
  };
  const removeFile = () => {
    setFile(null);
  };

  const handleSaveDraft = () => {
    notifications.show({
      title: "Draft Saved",
      message: "File has been saved as draft",
    });
  };
  const handleCreateFile = async () => {
    if (!file) {
      notifications.show({
        title: "Error",
        message: "Please upload a file",
        color: "red",
      });
      // eslint-disable-next-line no-useless-return
      return;
    }
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("designation", designation);
    formData.append("receiver_username", receiver_username);
    formData.append("receiver_designation", receiver_designation);
    formData.append("file", file); // Ensure this is the file object
    try {
      const response = await axios.post(
        "http://localhost:8000/filetracking/api/file/",
        formData,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data", // Set the content type for file upload
          },
        },
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
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
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <Textarea
          label="Description"
          placeholder="Enter description"
          mb="sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextInput
          label="Designation"
          placeholder="Sender's Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          mb="sm"
        />
        <FileInput
          label="Attach file (PDF, JPG, PNG) (MAX: 10MB)"
          placeholder="Upload file"
          accept="application/pdf,image/jpeg,image/png"
          icon={<Upload size={16} />}
          value={file} // Set the file state as the value
          onChange={handleFileChange} // Update file state on change
          mb="sm"
          withAsterisk
        />
        {file && (
          <Group position="apart" mt="sm">
            <Text>{file.name}</Text>
            <Button
              leftIcon={<Trash size={16} />}
              color="red"
              onClick={removeFile}
              compact
            >
              Remove File
            </Button>
          </Group>
        )}
        <Textarea label="Remark" placeholder="Enter remark" mb="sm" />
        <TextInput
          label="Forward To"
          placeholder="Enter forward recipient"
          value={receiver_username}
          onChange={(e) => setReceiverUsername(e.target.value)}
          mb="sm"
        />
        {/* Receiver Designation as a dropdown */}
        <Select
          label="Receiver Designation"
          placeholder="Select designation"
          data={[
            { value: "Professor", label: "Professor" },
            { value: "Student", label: "Student" },
            { value: "Employee", label: "Employee" },
          ]}
          mb="sm"
          value={receiver_designation}
          onChange={(value) => setReceiverDesignation(value)}
        />

        <Button
          type="submit"
          color="blue"
          style={{
            display: "block",
            margin: "0 auto",
            width: "200px",
          }}
          onClick={handleCreateFile}
        >
          Submit
        </Button>
      </Box>
    </Card>
  );
}
