import { useState } from "react";
import { Card, Box, Textarea, Button, TextInput, Title } from "@mantine/core";
import {
  ArrowLeft,
  PaperPlaneTilt,
  ChatCircleDots,
} from "@phosphor-icons/react";

// eslint-disable-next-line react/prop-types
export default function ViewFiles({ onBack }) {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
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
      <Box
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <Button
          variant="subtle"
          onClick={onBack}
          style={{ marginRight: "1rem" }}
        >
          <ArrowLeft size={24} />
        </Button>
        <Title order={2} style={{ flexGrow: 1, textAlign: "center" }}>
          Title of file
        </Title>
      </Box>

      <Box
        style={{
          backgroundColor: "#F5F7F8",
          padding: "16px",
          marginBottom: "2rem",
        }}
      >
        <Textarea
          label="File Content"
          placeholder="This shows the content of the current file."
          style={{ marginBottom: "2rem" }}
          rows={4}
          readOnly
        />
      </Box>

      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <Button
          leftIcon={<PaperPlaneTilt size={24} />}
          onClick={() => toggleSection("forward")}
          color="blue"
          style={{ width: "10%", marginRight: "10px", marginLeft: "15px" }}
        >
          Forward
        </Button>
        <Button
          leftIcon={<ChatCircleDots size={24} />}
          onClick={() => toggleSection("feedback")}
          color="blue"
          style={{ width: "10%" }}
        >
          Feedback
        </Button>
      </Box>

      {activeSection && (
        <>
          {activeSection === "forward" && (
            <>
              <TextInput
                label="Receiver's Email"
                placeholder="Enter receiver's email"
                style={{ marginBottom: "1.5rem" }}
              />
              <Textarea
                label="Receiver's Designation"
                placeholder="Enter receiver's designation"
                rows={4}
                style={{ marginBottom: "1.5rem" }}
              />
              <Button
                style={{
                  display: "block",
                  margin: "0 auto",
                  width: "100px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                }}
              >
                Send
              </Button>
            </>
          )}

          {activeSection === "feedback" && (
            <>
              <Textarea
                label="Feedback"
                placeholder="Enter your feedback"
                rows={6}
                style={{ marginBottom: "1.5rem" }}
              />
              <TextInput
                label="Receiver's Email"
                placeholder="Enter receiver's email"
                style={{ marginBottom: "1.5rem" }}
              />
              <Textarea
                label="Receiver's Designation"
                placeholder="Enter receiver's designation"
                rows={4}
                style={{ marginBottom: "1.5rem" }}
              />
              <Button
                style={{
                  display: "block",
                  margin: "0 auto",
                  width: "100px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                }}
              >
                Send
              </Button>
            </>
          )}
        </>
      )}
    </Card>
  );
}
