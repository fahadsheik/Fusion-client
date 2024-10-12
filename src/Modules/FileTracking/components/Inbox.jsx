import React, { useState } from "react";
import {
  Box,
  Card,
  Title,
  Table,
  Badge,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { Archive, Eye } from "@phosphor-icons/react";
import ViewFiles from "./ViewFile";

export default function Inboxfunc() {
  const [files, setFiles] = useState([
    {
      fileType: "PDF",
      sentBy: "22BCSD04-Student",
      fileID: "CSE-2023-11-#596",
      subject: "Fusion Project Module",
      date: "Nov 16, 2023, 11:26 p.m",
    },
    {
      fileType: "PDF",
      sentBy: "22BCSD04-Student",
      fileID: "CSE-2023-11-#597",
      subject: "Another Project Module",
      date: "Nov 16, 2023, 11:26 p.m",
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleArchive = (fileID) => {
    const updatedFiles = files.filter((file) => file.fileID !== fileID);
    setFiles(updatedFiles);
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = e.target.dataset.hoverColor; // Set hover color
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = e.target.dataset.defaultColor; // Reset to default
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: "#F5F7F8", maxWidth: "100%" }}
    >
      {!selectedFile && (
        <Title order={2} mb="md">
          Inbox
        </Title>
      )}
      {selectedFile ? (
        <div>
          <Title order={3} mb="md">
            File Subject
          </Title>
          <ViewFiles file={selectedFile} onBack={handleBack} />
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
                  Archive
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Received as
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Sent By
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
                        data-default-color="transparent" // Store default color
                        data-hover-color="#ffebee" // Store hover color
                        onMouseEnter={handleMouseEnter} // Handle mouse enter
                        onMouseLeave={handleMouseLeave} // Handle mouse leave
                      >
                        <Archive size="1rem" />
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
                    {file.sentBy}
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
                      data-default-color="white" // Store default color
                      data-hover-color="#e0e0e0" // Store hover color
                      onMouseEnter={handleMouseEnter} // Handle mouse enter
                      onMouseLeave={handleMouseLeave} // Handle mouse leave
                      onClick={() => handleViewFile(file)}
                    >
                      <Eye size="1rem" />
                    </ActionIcon>
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
