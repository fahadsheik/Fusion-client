import React from "react";
import {
  Box,
  Button,
  Card,
  Table,
  Title,
  Badge,
  ScrollArea,
} from "@mantine/core";
import { Eye, ArchiveBox } from "@phosphor-icons/react"; // Added ArchiveBox for icon

export default function Outbox() {
  const rows = [
    {
      id: 1,
      fileType: "PDF",
      sender: "Employee-Myself",
      fileID: "CSE-2023-11-#596",
      subject: "Fusion Project Module",
      date: "Nov 16, 2023, 11:26 p.m.",
    },
    {
      id: 2,
      fileType: "PDF",
      sender: "Employee-Myself",
      fileID: "CSE-2023-11-#596",
      subject: "Fusion Project Module",
      date: "Nov 16, 2023, 11:26 p.m.",
    },
  ];

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: "#F5F7F8" }}
    >
      <Title order={2} mb="md">
        Outbox File
      </Title>
      <ScrollArea style={{ height: "400px" }}>
        <Box
          style={{
            backgroundColor: "#F5F7F8",
            padding: "16px",
          }}
        >
          <Table
            verticalSpacing="sm"
            striped
            highlightOnHover
            withBorder
            style={{
              backgroundColor: "#FFFFFF",
              padding: "16px",
              overflowY: "auto",
              borderRadius: "8px", // Rounded corners
            }}
          >
            <thead>
              <tr>
                {[
                  "Archive",
                  "Received as",
                  "Sent By",
                  "File ID",
                  "Subject",
                  "Date",
                  "View File",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      fontWeight: 500,
                      textAlign: "left",
                      padding: "10px",
                      borderBottom: "1px solid #CBD5E0",
                      borderRight: "1px solid #CBD5E0",
                      fontSize: "16px", // Slightly larger for headers
                      fontFamily: "'Segoe UI', Arial, sans-serif", // Updated font
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} style={{ fontSize: "14px" }}>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #CBD5E0",
                      borderRight: "1px solid #CBD5E0",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      variant="subtle"
                      color="red"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArchiveBox size={20} />
                    </Button>
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #CBD5E0",
                      borderRight: "1px solid #CBD5E0",
                    }}
                  >
                    <Badge color="gray" style={{ fontSize: "12px" }}>
                      File type: {row.fileType}
                    </Badge>
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #CBD5E0",
                      borderRight: "1px solid #CBD5E0",
                    }}
                  >
                    {row.sender}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #CBD5E0",
                      borderRight: "1px solid #CBD5E0",
                    }}
                  >
                    {row.fileID}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #CBD5E0",
                      borderRight: "1px solid #CBD5E0",
                    }}
                  >
                    {row.subject}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #CBD5E0",
                      borderRight: "1px solid #CBD5E0",
                    }}
                  >
                    {row.date}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #CBD5E0",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      variant="light"
                      leftIcon={<Eye size={16} />}
                      color="black"
                      size="xs"
                      style={{
                        padding: "5px 10px",
                        fontSize: "12px",
                      }}
                    >
                      Open file
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </ScrollArea>
    </Card>
  );
}
