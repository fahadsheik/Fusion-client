import { useEffect, useState } from "react";
import {
  Card,
  Box,
  Button,
  ActionIcon,
  Title,
  Text,
  Divider,
  Group,
  TextInput,
} from "@mantine/core";
import { Trash, ArrowLeft } from "@phosphor-icons/react";
import { notifications } from "@mantine/notifications";
import PropTypes from "prop-types";
import axios from "axios";

export default function FileStatusPage({ onBack, fileID, updateFiles }) {
  const [fileHistory, setFileHistory] = useState(null);
  const token = localStorage.getItem("authToken");

  // Utility function to convert date to a readable format
  const convertDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString();
  };

  // Fetch file history when component mounts or fileID changes
  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/filetracking/api/history/${fileID}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        setFileHistory(response.data[0]);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    getHistory();
  }, [fileID, token]);

  // Handle file deletion
  const handleDelete = () => {
    notifications.show({
      title: "File Deleted",
      message: "The file has been successfully deleted.",
      color: "red",
    });
    updateFiles();
    onBack();
  };

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      style={{
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <Group position="apart" mb="lg">
        <Button variant="subtle" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <Title order={3} style={{ textAlign: "center", flex: 1 }}>
          File Loading Status
        </Title>
        <ActionIcon
          color="red"
          variant="light"
          size="lg"
          onClick={handleDelete}
        >
          <Trash size={24} />
        </ActionIcon>
      </Group>

      <Divider mb="lg" />

      <Box
        style={{
          padding: "1rem",
          backgroundColor: "#F9FAFB",
          borderRadius: "8px",
          border: "1px solid #E0E6ED",
        }}
      >
        {fileHistory ? (
          <>
            <Text size="md" weight={500} style={{ marginBottom: "1rem" }}>
              File Details
            </Text>
            <Box mb="md">
              <TextInput label="File ID" value={fileHistory.id} readOnly />
            </Box>

            <Box mb="md">
              <TextInput
                label="Receiver"
                value={fileHistory.receiver_id}
                readOnly
              />
            </Box>

            <Box mb="md">
              <TextInput
                label="Current Holder"
                value={fileHistory.current_id}
                readOnly
              />
            </Box>

            <Box mb="md">
              <TextInput
                label="Designation"
                value={fileHistory.receive_design}
                readOnly
              />
            </Box>

            <Box mb="md">
              <TextInput label="Remarks" value={fileHistory.remarks} readOnly />
            </Box>

            <Box mb="md">
              <TextInput
                label="Received At"
                value={convertDate(fileHistory.receive_date)}
                readOnly
              />
            </Box>

            <Box mb="md">
              <TextInput
                label="Forwarded At"
                value={convertDate(fileHistory.forward_date)}
                readOnly
              />
            </Box>

            <Box mb="md">
              <TextInput
                label="Status"
                value={fileHistory.is_read ? "Processed" : "Not Processed"}
                readOnly
              />
            </Box>
          </>
        ) : (
          <Text
            size="md"
            color="dimmed"
            align="center"
            style={{ padding: "1rem" }}
          >
            Loading file history...
          </Text>
        )}
      </Box>
    </Card>
  );
}

FileStatusPage.propTypes = {
  onBack: PropTypes.func.isRequired,
  fileID: PropTypes.string.isRequired,
  updateFiles: PropTypes.func.isRequired,
};
