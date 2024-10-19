/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Box, Progress, Button, ActionIcon, Title } from "@mantine/core";
import { Trash, Pause, X, Play, ArrowLeft } from "@phosphor-icons/react";
import { notifications } from "@mantine/notifications"; // Import for notifications

export default function FileStatusPage({ onBack, onDelete }) {
  const [loading, setLoading] = useState(true); // Simulate loading state
  const [progress] = useState(65); // Example progress percentage
  const [isPaused, setIsPaused] = useState(false);

  // Function to pause/resume the loading
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    notifications.show({
      title: isPaused ? "Resumed" : "Paused",
      message: isPaused
        ? "The loading has resumed."
        : "The loading has been paused.",
      color: isPaused ? "green" : "yellow",
    });
  };

  // Function to cancel the loading
  const handleCancel = () => {
    setLoading(false);
    notifications.show({
      title: "Loading Cancelled",
      message: "The loading process has been cancelled.",
      color: "red",
    });
  };

  // Function to delete the file
  const handleDelete = () => {
    notifications.show({
      title: "File Deleted",
      message: "The file has been successfully deleted.",
      color: "red",
    });
    onDelete();
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        backgroundColor: "#F5F7F8",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Header with Back and Delete buttons */}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Button
          variant="subtle"
          onClick={onBack}
          style={{ marginRight: "1rem" }}
        >
          <ArrowLeft size={24} />
        </Button>
        <Title order={2} style={{ flexGrow: 1, textAlign: "center" }}>
          File Loading Status
        </Title>
        <ActionIcon
          color="red"
          variant="light"
          size="lg"
          onClick={handleDelete} // Call handleDelete on click
          title="Delete File"
        >
          <Trash size={24} />
        </ActionIcon>
      </Box>

      {/* Loading Bar */}
      {loading ? (
        <Box
          style={{
            backgroundColor: "#F5F7F8",
            padding: "16px",
            marginBottom: "2rem",
          }}
        >
          <Progress
            value={progress}
            label={`${progress}%`}
            size="xl"
            striped
            animate={!isPaused} // Animate only if not paused
            style={{ marginBottom: "2rem" }}
          />

          {/* Pause, Cancel, and Resume Buttons */}
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              leftIcon={isPaused ? <Play size={24} /> : <Pause size={24} />}
              color="yellow"
              onClick={handlePauseResume}
              style={{ width: "30%" }}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button
              leftIcon={<X size={24} />}
              color="red"
              onClick={handleCancel}
              style={{ width: "30%" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Box style={{ textAlign: "center", marginTop: "2rem" }}>
          <Title order={3}>Loading Cancelled</Title>
        </Box>
      )}
    </Card>
  );
}
