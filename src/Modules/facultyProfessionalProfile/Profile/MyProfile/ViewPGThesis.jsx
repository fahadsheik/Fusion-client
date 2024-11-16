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
import { Books } from "@phosphor-icons/react";

export default function PgThesis() {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null); // For error handling

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/eis/pg_thesis/pf_no/",
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
            <Books size={24} />
            PG Thesis
          </Title>
  
          {error && (
            <Text color="red" mb="sm" style={{ textAlign: "center" }}>
              {error}
            </Text>
          )}
  
          {/* <ScrollArea>
            <Table striped highlightOnHover style={{ minWidth: "100%" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px" }}>Title</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Roll Number</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Year</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Month</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((project) => (
                    <tr key={project.id}>
                      <td style={{ padding: "8px" }}>{project.title}</td>
                      <td style={{ padding: "8px" }}>{project.rollno}</td>
                      <td style={{ padding: "8px" }}>{project.s_name}</td>
                      <td style={{ padding: "8px" }}>{project.s_year}</td>
                      <td style={{ padding: "8px" }}>{project.a_month}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "8px" }}>
                      No theses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ScrollArea> */}


<ScrollArea>
      <Table striped highlightOnHover withBorder style={{ minWidth: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            {["Title", "Roll Number", "Name", "Year", "Month"].map((header, index) => (
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
          {tableData.length > 0 ? (
            tableData.map((project) => (
              <tr key={project.id} style={{ backgroundColor: "#fff" }}>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.title}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.rollno}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.s_name}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.s_year}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.a_month}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "12px", border: "1px solid #dee2e6" }}>
                No theses found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
        </Paper>
      </Container>
    </MantineProvider>
  );
  
}
