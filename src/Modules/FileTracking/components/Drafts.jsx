import React, { useState } from "react";
import {
  Box,
  Card,
  Title,
  Table,
  Button,
  Badge,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { Archive, PencilSimple } from "@phosphor-icons/react";
import { notifications } from "@mantine/notifications";
import EditDraft from "./EditDraft";

export default function Draft() {
  const [files, setFiles] = useState([
    {
      fileType: "PDF",
      beingsentTo: "Employee-Myself",
      fileID: "CSE-2023-11-#596",
      subject: "Fusion Project Module",
    },
    {
      fileType: "PDF",
      beingsentTo: "Employee-Myself",
      fileID: "CSE-2023-11-#597",
      subject: "Another Project Module",
    },
  ]);

  const [editFile, setEditFile] = useState(null); // File being edited

  const handleArchive = (fileID) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.fileID !== fileID));
  };

  const handleDeleteFile = (fileID) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.fileID !== fileID));
    notifications.show({
      title: "File deleted",
      message: "The file has been successfully deleted",
      color: "red",
    });
  };

  const handleEditFile = (file) => {
    setEditFile(file); // Set the file to edit mode
  };

  const handleBack = () => {
    setEditFile(null); // Exit edit mode and go back
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: "#F5F7F8", maxWidth: "100%" }}
    >
      {!editFile && (
        <Title order={2} mb="md">
          Drafts
        </Title>
      )}

      {editFile ? (
        <EditDraft file={editFile} onBack={handleBack} />
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
                  File type
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Being Sent to
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
                  Delete draft
                </th>
                <th
                  style={{
                    padding: "12px",
                    width: "8.5%",
                    border: "1px solid #ddd",
                  }}
                >
                  Edit Draft
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
                        // eslint-disable-next-line no-return-assign
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#ffebee")
                        }
                        // eslint-disable-next-line no-return-assign
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
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
                    {file.beingsentTo}
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
                    <Button
                      color="blue"
                      variant="outline"
                      style={{
                        transition: "background-color 0.3s",
                        fontSize: "0.9rem",
                        padding: "0.5rem 1rem",
                      }}
                      // eslint-disable-next-line no-return-assign
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#e3f2fd")
                      }
                      // eslint-disable-next-line no-return-assign
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                      onClick={() => handleDeleteFile(file.fileID)}
                    >
                      Delete file
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
                      onClick={() => handleEditFile(file)} // Switch to edit mode
                      // eslint-disable-next-line no-return-assign
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e0e0e0")
                      }
                      // eslint-disable-next-line no-return-assign
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <PencilSimple size="1rem" />
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
