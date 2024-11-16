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
import { Certificate } from "@phosphor-icons/react";

export default function ViewPatent() {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null); // For error handling

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/eis/patents/pf_no/",
      );
      const projects = response.data;
      // Sort projects by submission date in descending order
      const sortedProjects = projects.sort(
        (a, b) => new Date(b.submission_date) - new Date(a.submission_date),
      );
      setTableData(sortedProjects);
    } catch (e) {
      console.error("Error fetching patents:", error);
      setError("Failed to fetch patents. Please try again later."); // Set error message
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
            <Certificate size={24} />
            Patents
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
                  <th style={{ textAlign: "left", padding: "8px" }}>Patent Number</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Status</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Earnings</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Year</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Month</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((project) => (
                    <tr key={project.id}>
                      <td style={{ padding: "8px" }}>{project.title}</td>
                      <td style={{ padding: "8px" }}>{project.p_no}</td>
                      <td style={{ padding: "8px" }}>{project.status}</td>
                      <td style={{ padding: "8px" }}>{project.earnings}</td>
                      <td style={{ padding: "8px" }}>{project.p_year}</td>
                      <td style={{ padding: "8px" }}>{project.a_month}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "8px" }}>
                      No patents found.
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
            {["Title", "Patent Number", "Status", "Earnings", "Year", "Month"].map((header, index) => (
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
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.p_no}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.status}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.earnings}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.p_year}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.a_month}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "12px", border: "1px solid #dee2e6" }}>
                No patents found.
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
