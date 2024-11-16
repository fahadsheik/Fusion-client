import { useState, useEffect } from "react";
// import { Save, Edit, Trash } from 'lucide-react'
import axios from "axios";

import {
  MantineProvider,
  Container,
  Title,
  Paper,
  Grid,
  TextInput,
  Button,
  Table,
  ActionIcon,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { FloppyDisk, PencilSimple, Trash } from "@phosphor-icons/react";

export default function ForeignVisits() {
  const [inputs, setInputs] = useState({
    country: "",
    place: "",
    fromDate: "",
    toDate: "",
    purpose: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [, setError] = useState(null); // For error handling
  const [isEdit, setEdit] = useState(false);
  const [Id, setId] = useState(0);

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/eis/fvisits/pf_no/",
      );
      const projects = response.data;
      // Sort projects by submission date in descending order
      const sortedProjects = projects.sort(
        (a, b) => new Date(b.submission_date) - new Date(a.submission_date),
      );
      setTableData(sortedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects. Please try again later."); // Set error message
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
      formData.append("country", inputs.country);
      formData.append("place", inputs.place);
      formData.append("purpose", inputs.purpose);
      formData.append("start_date", inputs.fromDate);
      formData.append("end_date", inputs.toDate);

      if (isEdit === false) {
        const res = await axios.post(
          "http://127.0.0.1:8000/eis/fvisit/",
          formData,
        );
        console.log(res.data);
      } else {
        formData.append("fvisit_id", Id);
        const res = await axios.post(
          "http://127.0.0.1:8000/eis/fvisit/",
          formData,
        );
        console.log(res.data);
        setEdit(false);
        setId(0);
      }

      // fetchForeignVisits() // Refresh the list of foreign visits

      // Fetch updated project list after submission
      fetchProjects();

      // Reset the input fields
      setInputs({
        country: "",
        place: "",
        fromDate: "",
        toDate: "",
        purpose: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    // Populate the inputs with the project data for editing
    setInputs({
      country: project.country,
      place: project.place,
      fromDate: project.start_date ? new Date(project.start_date) : null,
      toDate: project.end_date ? new Date(project.end_date) : null,
      purpose: project.purpose,
    });

    setId(project.id);
    setEdit(true);
  };

  const handleDelete = async (projectId) => {
    console.log(projectId);
    if (window.confirm("Are you sure you want to delete this Visit?")) {
      try {
        await axios.post(
          `http://127.0.0.1:8000/eis/emp_visitsDelete/`,
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
            Add a Foreign Visit
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Country"
                  placeholder="Country"
                  value={inputs.country}
                  onChange={(e) => setInputs({ ...inputs, country: e.target.value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Place"
                  placeholder="Place"
                  value={inputs.place}
                  onChange={(e) => setInputs({ ...inputs, place: e.target.value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DatePickerInput
                  label="From"
                  placeholder="Select date"
                  value={inputs.fromDate}
                  onChange={(date) => setInputs({ ...inputs, fromDate: date })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DatePickerInput
                  label="To"
                  placeholder="Select date"
                  value={inputs.toDate}
                  onChange={(date) => setInputs({ ...inputs, toDate: date })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  required
                  label="Purpose"
                  placeholder="Purpose"
                  value={inputs.purpose}
                  onChange={(e) => setInputs({ ...inputs, purpose: e.target.value })}
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
          <Title order={3} mb="lg" style={{ color: "#2185d0" }}> {/* Consistent color with border */}
            Projects Report:
          </Title>
          <Table striped highlightOnHover withBorder style={{ minWidth: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            {["Country", "Place", "Purpose", "Start Date", "End Date", "Actions"].map((header, index) => (
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
            tableData.map((visit) => (
              <tr key={visit.id} style={{ backgroundColor: "#fff" }}>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{visit.country}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{visit.place}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{visit.purpose}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{visit.start_date}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{visit.end_date}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>
                  <ActionIcon color="blue" onClick={() => handleEdit(visit)} variant="light" style={{ marginRight: "8px" }}>
                    <PencilSimple size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDelete(visit.id)} variant="light">
                    <Trash size={16} />
                  </ActionIcon>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "12px", border: "1px solid #dee2e6" }}>
                No visits found.
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
