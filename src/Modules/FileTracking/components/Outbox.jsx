import React, { useState } from "react";
import {
  Box,
  Card,
  Title,
  Table,
  Badge,
  ActionIcon,
  Tooltip,
  Select,
  Textarea,
  Button,
  Group,
} from "@mantine/core";
import { ArrowArcRight, Eye } from "@phosphor-icons/react";
import ViewFiles from "./ViewFile";

export default function Outboxfunc() {
  const [files] = useState([
    {
      fileType: "PDF",
      sentTo: "Employee-Myself",
      fileID: "CSE-2023-11-#596",
      subject: "Fusion Project Module",
      date: "Nov 16, 2023, 11:26 p.m",
    },
    {
      fileType: "PDF",
      sentTo: "Employee-Myself",
      fileID: "CSE-2023-11-#597",
      subject: "Another Project Module",
      date: "Nov 16, 2023, 11:26 p.m",
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null); // For viewing file details
  const [forwardFile, setForwardFile] = useState(null); // For forwarding file
  const [recipientDesignation, setRecipientDesignation] = useState(""); // State for recipient's designation
  const [recipient, setRecipient] = useState(""); // State for next person to forward to
  const [remarks, setRemarks] = useState(""); // State for remarks

  // Available designation options for forwarding
  const designationOptions = [
    { value: "Manager", label: "Manager" },
    { value: "TeamLead", label: "Team Lead" },
    { value: "Employee", label: "Employee" },
  ];

  // Available users based on designation
  const usersByDesignation = {
    Manager: [
      { value: "JohnManager", label: "John (Manager)" },
      { value: "JaneManager", label: "Jane (Manager)" },
    ],
    TeamLead: [
      { value: "AliceLead", label: "Alice (Team Lead)" },
      { value: "BobLead", label: "Bob (Team Lead)" },
    ],
    Employee: [
      { value: "CharlieEmp", label: "Charlie (Employee)" },
      { value: "DanaEmp", label: "Dana (Employee)" },
    ],
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
    setForwardFile(null); // Reset forward file state
  };

  const handleForwardFile = (file) => {
    setForwardFile(file); // Set the file to be forwarded
  };

  const handleSubmitForward = () => {
    console.log("File Forwarded:", forwardFile);
    console.log("Recipient Designation:", recipientDesignation);
    console.log("Forwarding To:", recipient);
    console.log("Remarks:", remarks);

    // Reset form and state
    setForwardFile(null);
    setRecipientDesignation(""); // Reset designation
    setRecipient("");
    setRemarks("");
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: "#F5F7F8", maxWidth: "100%" }}
    >
      {!selectedFile && !forwardFile && (
        <Title order={2} mb="md">
          Outbox
        </Title>
      )}

      {selectedFile ? (
        <div>
          <Title order={3} mb="md">
            File Subject
          </Title>
          <ViewFiles file={selectedFile} onBack={handleBack} />
        </div>
      ) : forwardFile ? (
        <div
          style={{
            margin: "1rem",
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title order={3} mb="md">
            Forward File
          </Title>
          <Box>
            {/* Step 1: Select the recipient's designation */}
            <Select
              label="Recipient's Designation"
              placeholder="Select designation"
              data={designationOptions} // Options for designation
              value={recipientDesignation}
              onChange={setRecipientDesignation}
              style={{ marginBottom: "1rem" }} // Add space between fields
            />

            {/* Step 2: Based on selected designation, allow selection of recipient */}
            {recipientDesignation && (
              <Select
                label="Forward to"
                placeholder="Select recipient"
                data={usersByDesignation[recipientDesignation]} // Dynamic options based on designation
                value={recipient}
                onChange={setRecipient}
                style={{ marginBottom: "1rem" }} // Add space between fields
              />
            )}

            {/* Remarks Textarea */}
            <Textarea
              label="Remarks"
              placeholder="Add any remarks here"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              mt="md"
              style={{ height: "100px" }}
            />

            {/* Forward and Cancel Buttons */}
            <Group position="right" mt="md">
              <Button
                variant="light"
                color="blue"
                onClick={handleSubmitForward}
              >
                Forward File
              </Button>
              <Button variant="subtle" color="gray" onClick={handleBack}>
                Cancel
              </Button>
            </Group>
          </Box>
        </div>
      ) : (
        <Box
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflowY: "auto",
            height: "400px",
            backgroundColor: "#fff",
          }}
        >
          <Table
            highlightOnHover
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#F0F0F0" }}>
                <th
                  style={{
                    padding: "12px",
                    width: "6%",
                    border: "1px solid #ddd",
                  }}
                >
                  Forward
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Sent as
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Sent To
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  File ID
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Subject
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Date
                </th>
                <th
                  style={{
                    padding: "12px",
                    width: "8.5%",
                    border: "1px solid #ddd",
                  }}
                >
                  View File
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    <Tooltip label="Forward" position="top" withArrow>
                      <ActionIcon
                        variant="light"
                        color="red"
                        style={{
                          transition: "background-color 0.3s",
                          width: "2rem",
                          height: "2rem",
                        }}
                        onClick={() => handleForwardFile(file)} // Set the file to forward
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#ffebee";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                        }}
                      >
                        <ArrowArcRight size="1rem" />
                      </ActionIcon>
                    </Tooltip>
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    <Badge color="gray" style={{ fontSize: "12px" }}>
                      File type: {file.fileType}
                    </Badge>
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.sentTo}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.fileID}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.subject}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.date}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    <Tooltip label="View File" position="top" withArrow>
                      <ActionIcon
                        variant="light"
                        color="blue"
                        style={{
                          transition: "background-color 0.3s",
                          width: "2rem",
                          height: "2rem",
                        }}
                        onClick={() => handleViewFile(file)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#E3F2FD";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                        }}
                      >
                        <Eye size="1rem" />
                      </ActionIcon>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      )}
    </Card>
  );
}
