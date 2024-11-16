import { useState, useEffect } from "react";
import axios from "axios";
import {
  MantineProvider,
  Container,
  Paper,
  Title,
  Text,
  Table,
  ScrollArea,
} from "@mantine/core";
import { Chalkboard } from "@phosphor-icons/react";

export default function ViewEvents() {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null); // For error handling

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/eis/event/pf_no/",
      );
      const projects = response.data;
      // Sort projects by submission date in descending order
      const sortedProjects = projects.sort(
        (a, b) => new Date(b.submission_date) - new Date(a.submission_date),
      );
      setTableData(sortedProjects);
    } catch (e) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects. Please try again later."); // Set error message
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="2xl" mt="xl">
        <Paper
          shadow="sm"
          p="lg"
          withBorder
          style={{
            borderLeft: "8px solid #228be6",
            backgroundColor: "#f9fafb",
          }}
        >
          <Title
            order={2}
            mb="lg"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#228be6",
            }}
          >
            <Chalkboard size={24} />
            Workshops / Training Programs
          </Title>
          
          {error && (
            <Text color="red" mb="sm" style={{ textAlign: "center" }}>
              {error}
            </Text>
          )}
          
          <ScrollArea>
            {/* <Table striped highlightOnHover style={{ minWidth: "100%" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Role</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Sponsoring Agency</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Event Type</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Venue</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Start Date</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>End Date</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((project) => (
                    <tr key={project.id}>
                      <td style={{ padding: "8px" }}>{project.name}</td>
                      <td style={{ padding: "8px" }}>{project.role}</td>
                      <td style={{ padding: "8px" }}>{project.sponsoring_agency}</td>
                      <td style={{ padding: "8px" }}>{project.type}</td>
                      <td style={{ padding: "8px" }}>{project.venue}</td>
                      <td style={{ padding: "8px" }}>{project.start_date}</td>
                      <td style={{ padding: "8px" }}>{project.end_date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "8px" }}>
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table> */}


<Table striped highlightOnHover withBorder style={{ minWidth: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            {["Name", "Role", "Sponsoring Agency", "Event Type", "Venue", "Start Date", "End Date"].map((header, index) => (
              <th
                key={index}
                style={{
                  textAlign: "center",
                  padding: "12px",
                  color: "#495057",
                  fontWeight: "600",
                  border: "1px solid #dee2e6",
                  backgroundColor: "#f1f3f5",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((project) => (
            <tr key={project.id} style={{ backgroundColor: "#fff" }}>
              <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.name}</td>
              <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.role}</td>
              <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.sponsoring_agency}</td>
              <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.type}</td>
              <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.venue}</td>
              <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.start_date}</td>
              <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.end_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
          </ScrollArea>
        </Paper>
      </Container>
    </MantineProvider>
  );
  
}
