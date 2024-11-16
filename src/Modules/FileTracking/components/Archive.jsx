import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Title,
  Table,
  ActionIcon,
  Tooltip,
  Badge,
} from "@mantine/core";
import { ArrowArcLeft, Eye } from "@phosphor-icons/react";
import axios from "axios";
import View from "./ViewFile";

export default function ArchiveFiles() {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/filetracking/api/archive/`,

          {
            params: {
              username: "atul",
              designation: "Professor",
              src_module: "filetracking",
            },
            withCredentials: true,
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        // Set the response data to the files state
        setFiles(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };

    // Call the getFiles function to fetch data on component mount
    getFiles();
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleToggleArchive = async (fileID) => {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(
      "http://localhost:8000/filetracking/api/unarchive/",
      {
        file_id: fileID,
      },
      {
        params: {
          username: "atul",
          designation: "Professor",
          src_module: "filetracking",
        },
        withCredentials: true,
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      },
    );
    const updatedFiles = files.filter((file) => file.id !== fileID);
    setFiles(updatedFiles); // Update state with the new file list
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  const tableStyles = {
    padding: "12px",
    textAlign: "center",
    border: "1px solid #ddd",
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
          Archived Files
        </Title>
      )}

      {selectedFile ? (
        <div>
          <Title order={3} mb="md">
            File Subject
          </Title>
          <View file={selectedFile} onBack={handleBack} />
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
                <th style={{ ...tableStyles, width: "8%" }}>Unarchive</th>
                <th style={{ ...tableStyles, width: "12%" }}>Received As</th>
                <th style={{ ...tableStyles, width: "18%" }}>Sent By</th>
                <th style={{ ...tableStyles, width: "15%" }}>File ID</th>
                <th style={{ ...tableStyles, width: "25%" }}>Subject</th>
                <th style={{ ...tableStyles, width: "15%" }}>Date</th>
                <th style={{ ...tableStyles, width: "7%" }}>View File</th>
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
                        color="red"
                        onClick={() => handleToggleArchive(file.id)}
                        style={{ width: "2rem", height: "2rem" }}
                      >
                        <ArrowArcLeft size="1rem" />
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
                  <td style={tableStyles}>{file.uploader}</td>
                  <td style={tableStyles}>{file.id}</td>
                  <td style={tableStyles}>{file.subject}</td>
                  <td style={tableStyles}>{file.upload_date}</td>
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
