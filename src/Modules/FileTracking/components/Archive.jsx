import React, { useState } from "react";
import {
  Box,
  Card,
  Title,
  Table,
  ActionIcon,
  Tooltip,
  Badge,
} from "@mantine/core";
import { ArrowArcLeft, Archive, Eye } from "@phosphor-icons/react";
import ViewFiles from "./ViewFile";

export default function ArchiveFiles() {
  const [files, setFiles] = useState([
    {
      fileType: "PDF",
      sentBy: "22BCSD04-Student",
      fileID: "CSE-2023-11-#596",
      subject: "Fusion Project Module",
      date: "Nov 16, 2023, 11:26 p.m",
      archived: true,
    },
    {
      fileType: "PDF",
      sentBy: "22BCSD04-Student",
      fileID: "CSE-2023-11-#597",
      subject: "Another Project Module",
      date: "Nov 16, 2023, 11:26 p.m",
      archived: true,
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleToggleArchive = (fileID) => {
    const updatedFiles = files.map((file) =>
      file.fileID === fileID ? { ...file, archived: !file.archived } : file,
    );
    setFiles(updatedFiles);
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  const tableStyles = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
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
          Archived files
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
            style={{ width: "100%", tableLayout: "fixed" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#F0F0F0" }}>
                <th style={{ ...tableStyles, width: "7%" }}>Unarchive</th>
                <th style={tableStyles}>Received as</th>
                <th style={tableStyles}>Sent by</th>
                <th style={tableStyles}>File ID</th>
                <th style={tableStyles}>Subject</th>
                <th style={tableStyles}>Date</th>
                <th style={{ ...tableStyles, width: "8.5%" }}>View File</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index}>
                  <td style={tableStyles}>
                    <Tooltip
                      label={file.archived ? "Unarchive file" : "Archive file"}
                      position="top"
                      withArrow
                    >
                      <ActionIcon
                        variant="light"
                        color={file.archived ? "red" : "green"}
                        onClick={() => handleToggleArchive(file.fileID)}
                        style={{ width: "2rem", height: "2rem" }}
                      >
                        {file.archived ? (
                          <ArrowArcLeft size="1rem" />
                        ) : (
                          <Archive size="1rem" />
                        )}
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
                  <td style={tableStyles}>{file.sentBy}</td>
                  <td style={tableStyles}>{file.fileID}</td>
                  <td style={tableStyles}>{file.subject}</td>
                  <td style={tableStyles}>{file.date}</td>
                  <td style={tableStyles}>
                    <ActionIcon
                      variant="outline"
                      color="gray"
                      onClick={() => handleViewFile(file)}
                      style={{ width: "2rem", height: "2rem" }}
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
