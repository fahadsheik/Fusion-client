import { useState, useEffect } from "react";
// import { Button, Select, TextInput, Table, Divider, LoadingOverlay } from '@mantine/core';
// import { Edit, } from '@phosphor-icons/react';
// import { Save, Edit, Trash } from "lucide-react";
import axios from "axios";

import {
  MantineProvider,
  Container,
  Title,
  Paper,
  Grid,
  TextInput,
  Select,
  Button,
  Table,
  ActionIcon,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { FloppyDisk, PencilSimple, Trash } from "@phosphor-icons/react";

export default function Patents() {
  const [inputs, setInputs] = useState({
    patentNumber: "",
    status: "",
    earnings: "",
    year: "",
    month: "",
    title: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [, setError] = useState(null); // For error handling
  const [isEdit, setEdit] = useState(false);
  const [Id, setId] = useState(0);

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
    } catch (error) {
      console.error("Error fetching patents:", error);
      setError("Failed to fetch patents. Please try again later."); // Set error message
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("user_id", 5318);
      formData.append("p_no", inputs.patentNumber);
      formData.append("earnings", inputs.earnings);
      formData.append("year", inputs.year);
      formData.append("status", inputs.status);
      formData.append("month", inputs.month);
      formData.append("title", inputs.title);

      if (isEdit === false) {
        const res = await axios.post(
          "http://127.0.0.1:8000/eis/patent_insert/",
          formData,
        );
        console.log(res.data);
      } else {
        formData.append("patent_id", Id);
        const res = await axios.post(
          "http://127.0.0.1:8000/eis/patent_insert/",
          formData,
        );
        console.log(res.data);
        setEdit(false);
        setId(0);
      }

      // Fetch updated project list after submission
      fetchProjects();

      // Reset the input fields
      setInputs({
        patentNumber: "",
        status: "",
        earnings: "",
        year: "",
        month: "",
        title: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    // Populate the inputs with the project data for editing
    setInputs({
      patentNumber: project.p_no,
      status: project.status,
      earnings: project.earnings,
      year: project.p_year,
      month: project.a_month,
      title: project.title,
    });

    setId(project.id);
    setEdit(true);
  };

  const handleDelete = async (projectId) => {
    console.log(projectId);
    if (window.confirm("Are you sure you want to delete this Patent?")) {
      try {
        await axios.post(
          `http://127.0.0.1:8000/eis/emp_patentsDelete/`,
          new URLSearchParams({ pk: projectId }),
        ); // Adjust the delete URL as needed
        fetchProjects(); // Refresh the project list after deletion
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="2xl" mt="xl">
        <Paper
          shadow="xs"
          p="md"
          withBorder
          style={{ borderLeft: "8px solid #2185d0", backgroundColor: "#f9fafb" }} // Light background for contrast
        >
          <Title order={2} mb="sm" style={{ color: "#2185d0" }}>
            Add a Patent
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Patent Number"
                  placeholder="Patent Number"
                  value={inputs.patentNumber}
                  onChange={(e) =>
                    setInputs({ ...inputs, patentNumber: e.target.value })
                  }
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Status"
                  placeholder="Select status"
                  data={[
                    { value: "Filed", label: "Filed" },
                    { value: "Granted", label: "Granted" },
                    { value: "Published", label: "Published" },
                    { value: "Owned", label: "Owned" },
                  ]}
                  value={inputs.status}
                  onChange={(value) =>
                    setInputs({ ...inputs, status: value || "" })
                  }
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  required
                  label="Earnings (in Rs.)"
                  placeholder="Earnings"
                  value={inputs.earnings}
                  onChange={(e) =>
                    setInputs({ ...inputs, earnings: e.target.value })
                  }
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Month"
                  placeholder="Select Month"
                  data={Array.from({ length: 12 }, (_, i) => ({
                    value: (i + 1).toString(),
                    label: (i + 1).toString(),
                  }))}
                  onChange={(value) =>
                    setInputs({ ...inputs, month: value || "" })
                  }
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Year"
                  placeholder="Select Year"
                  data={Array.from({ length: 10 }, (_, i) => ({
                    value: (2023 + i).toString(),
                    label: (2023 + i).toString(),
                  }))}
                  value={inputs.year}
                  onChange={(value) =>
                    setInputs({ ...inputs, year: value || "" })
                  }
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  required
                  label="Title"
                  placeholder="Patent Title"
                  value={inputs.title}
                  onChange={(e) =>
                    setInputs({ ...inputs, title: e.target.value })
                  }
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  mt="md"
                  loading={isLoading}
                  leftIcon={<FloppyDisk size={16} />}
                  style={{ backgroundColor: "#2185d0", color: "#fff" }} // Custom button styling
                >
                  Save
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
  
        <Paper mt="xl" p="lg" withBorder shadow="sm" style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
          <Table striped highlightOnHover withBorder style={{ minWidth: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                {["Title", "Patent Number", "Status", "Earnings", "Year", "Month", "Actions"].map((header, index) => (
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
                    <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>
                      <ActionIcon color="blue" onClick={() => handleEdit(project)} variant="light" style={{ marginRight: "8px" }}>
                        <PencilSimple size={16} />
                      </ActionIcon>
                      <ActionIcon color="red" onClick={() => handleDelete(project.id)} variant="light">
                        <Trash size={16} />
                      </ActionIcon>
                    </td>
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
        </Paper>
      </Container>
    </MantineProvider>
  );
  
}
