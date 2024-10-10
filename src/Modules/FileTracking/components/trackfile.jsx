import React, { useState } from "react";
import {
  Box,
  Card,
  Title,
  Table,
  Button,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { Archive, Eye } from "@phosphor-icons/react";

export default function Track() {
  const [files, setFiles] = useState([
    {
      fileType: "PDF",
      sentTo: "Employee-Myself",
      fileID: "CSE-2023-11-#596",
      subject: "Fusion Project Module",
    },
    {
      fileType: "PDF",
      sentTo: "Employee-Myself",
      fileID: "CSE-2023-11-#597",
      subject: "Another Project Module",
    },
  ]);

  const handleArchive = (fileID) => {
    const updatedFiles = files.filter((file) => file.fileID !== fileID);
    setFiles(updatedFiles);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: "#F5F7F8", maxWidth: "100%" }}
    >
      <Title order={2} mb="md">
        File Tracking
      </Title>
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
                Archive
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Sent ad
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
              <th
                style={{
                  padding: "12px",
                  width: "12.5%",
                  border: "1px solid #ddd",
                }}
              >
                Finish File
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
                  <Tooltip label="Archive file" position="top" withArrow>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => handleArchive(file.fileID)}
                      style={{
                        transition: "background-color 0.3s",
                        width: "2rem",
                        height: "2rem",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#ffebee";
                      }} // Fixed
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                      }} // Fixed
                    >
                      <Archive size="1rem" />
                    </ActionIcon>
                  </Tooltip>
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {file.fileType}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {file.sentTo}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {file.fileID}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {file.subject}
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  <Button
                    color="blue"
                    variant="outline"
                    style={{
                      transition: "background-color 0.3s",
                      fontSize: "0.9rem",
                      padding: "0.5rem 1rem",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#e3f2fd";
                    }} // Fixed
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                    }} // Fixed
                  >
                    Finish File
                  </Button>
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <ActionIcon
                    variant="outline"
                    color="gray"
                    style={{
                      transition: "background-color 0.3s",
                      width: "2rem",
                      height: "2rem",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#e0e0e0";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                    }}
                  >
                    <Eye size="1rem" />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Card>
  );
}
