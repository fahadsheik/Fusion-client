import { useState, useEffect } from "react";
import axios from "axios";

import {
  MantineProvider,
  Container,
  Title,
  Paper,
  Grid,
  Select,
  Button,
  Table,
  ActionIcon,
  TextInput,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { FloppyDisk, PencilSimple, Trash } from "@phosphor-icons/react";

export default function ProjectRegistrationForm() {
  const [inputs, setInputs] = useState({
    projectTitle: "",
    sponsoringAgency: "",
    projectStartDate: null,
    fundReceivedDate: null,
    projectDuration: "",
    agreement: "",
    totalAmountSanctioned: "",
    projectType: "",
    coPI: "",
    projectOperatedBy: "",
    attachments: null,
    detailsDescription: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(0);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/projects/");
      const projects = response.data;
      const sortedProjects = projects.sort(
        (a, b) => new Date(b.projectStartDate) - new Date(a.projectStartDate)
      );
      setTableData(sortedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects. Please try again later.");
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
      for (const [key, value] of Object.entries(inputs)) {
        if (value !== null) {
          formData.append(key, value);
        }
      }

      if (!isEdit) {
        await axios.post("http://127.0.0.1:8000/api/projects/", formData);
      } else {
        formData.append("id", editId);
        await axios.put(`http://127.0.0.1:8000/api/projects/${editId}/`, formData);
        setIsEdit(false);
        setEditId(0);
      }

      fetchProjects();
      setInputs({
        projectTitle: "",
        sponsoringAgency: "",
        projectStartDate: null,
        fundReceivedDate: null,
        projectDuration: "",
        agreement: "",
        totalAmountSanctioned: "",
        projectType: "",
        coPI: "",
        projectOperatedBy: "",
        attachments: null,
        detailsDescription: "",
      });
    } catch (error) {
      console.error("Error submitting project:", error);
      setError("Failed to submit project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    setInputs({
      projectTitle: project.projectTitle,
      sponsoringAgency: project.sponsoringAgency,
      projectStartDate: new Date(project.projectStartDate),
      fundReceivedDate: new Date(project.fundReceivedDate),
      projectDuration: project.projectDuration,
      agreement: project.agreement,
      totalAmountSanctioned: project.totalAmountSanctioned,
      projectType: project.projectType,
      coPI: project.coPI,
      projectOperatedBy: project.projectOperatedBy,
      detailsDescription: project.detailsDescription,
    });
    setEditId(project.id);
    setIsEdit(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/projects/${projectId}/`);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        setError("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="2xl" mt="xl">
        <Paper shadow="xs" p="md" withBorder style={{ borderLeft: "8px solid #2185d0", backgroundColor: "#f9fafb" }}>
        <Title order={2} mb="sm" style={{ color: "#2185d0" }}>
            Add a New Project
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={3}>
                <TextInput
                  required
                  label="Project Title"
                  placeholder="Enter project title"
                  value={inputs.projectTitle}
                  onChange={(e) => setInputs({ ...inputs, projectTitle: e.target.value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  label="Sponsoring Agency / Client"
                  placeholder="Enter sponsoring agency or client"
                  value={inputs.sponsoringAgency}
                  onChange={(e) => setInputs({ ...inputs, sponsoringAgency: e.target.value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <DatePickerInput
                  label="Project Start Date"
                  placeholder="Select date"
                  value={inputs.projectStartDate}
                  onChange={(date) => setInputs({ ...inputs, projectStartDate: date })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <DatePickerInput
                  label="Fund Received Date"
                  placeholder="Select date"
                  value={inputs.fundReceivedDate}
                  onChange={(date) => setInputs({ ...inputs, fundReceivedDate: date })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Project Duration (In weeks)"
                  placeholder="Number of weeks e.g. 42"
                  value={inputs.projectDuration}
                  onChange={(value) => setInputs({ ...inputs, projectDuration: value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Is there any Agreement(MoU)"
                  placeholder="Select"
                  data={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  value={inputs.agreement}
                  onChange={(value) => setInputs({ ...inputs, agreement: value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Total amount sanctioned"
                  placeholder="Enter amount"
                  value={inputs.totalAmountSanctioned}
                  onChange={(value) => setInputs({ ...inputs, totalAmountSanctioned: value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Project Type"
                  placeholder="Select project type"
                  data={[
                    { value: "sponsored", label: "Sponsored Research" },
                    { value: "consultancy", label: "Consultancy" },
                  ]}
                  value={inputs.projectType}
                  onChange={(value) => setInputs({ ...inputs, projectType: value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="CO_PI"
                  placeholder="Co PI name if any"
                  value={inputs.coPI}
                  onChange={(e) => setInputs({ ...inputs, coPI: e.target.value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Project Operated By"
                  placeholder="Select"
                  data={[
                    { value: "pi", label: "Only By PI" },
                    { value: "copi", label: "PI and Co-PI" },
                  ]}
                  value={inputs.projectOperatedBy}
                  onChange={(value) => setInputs({ ...inputs, projectOperatedBy: value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Attachments"
                  type="file"
                  placeholder="Choose file"
                  accept="application/pdf"
                  onChange={(file) => setInputs({ ...inputs, attachments: file })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Details and Description"
                  placeholder="Enter project details and description"
                  minRows={3}
                  value={inputs.detailsDescription}
                  onChange={(e) => setInputs({ ...inputs, detailsDescription: e.target.value })}
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

        <Paper mt="xl" p="md" withBorder>
          <Table>
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Sponsoring Agency</th>
                <th>Project Type</th>
                <th>Duration</th>
                <th>Start Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((project) => (
                <tr key={project.id}>
                  <td>{project.projectTitle}</td>
                  <td>{project.sponsoringAgency}</td>
                  <td>{project.projectType}</td>
                  <td>{project.projectDuration} weeks</td>
                  <td>{new Date(project.projectStartDate).toLocaleDateString()}</td>
                  <td>
                    <ActionIcon color="blue" onClick={() => handleEdit(project)}>
                      <PencilSimple size={16} />
                    </ActionIcon>
                    <ActionIcon color="red" onClick={() => handleDelete(project.id)}>
                      <Trash size={16} />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      </Container>
    </MantineProvider>
  );
}