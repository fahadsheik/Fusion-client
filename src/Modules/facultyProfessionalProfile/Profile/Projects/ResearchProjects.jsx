import { useState, useEffect } from "react";
// import { Save, Edit, Trash } from "lucide-react"; // Importing Edit and Trash icons
import axios from "axios";
// import {
//   TextInput, Button, Grid, Select, Table, ActionIcon, Container, Title, Divider, Box,
// } from '@mantine/core';
// import { PencilSimple } from '@phosphor-icons/react';
// import './ResearchProjectManager.css';

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

export default function ResearchProjects() {
  const [inputs, setInputs] = useState({
    pi: "",
    coPi: "",
    fundingAgency: "",
    status: "",
    submissionDate: "",
    startDate: "",
    expectedFinishDate: "",
    financialOutlay: "",
    title: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [Id, setId] = useState(0);

  // Function to fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/eis/projects/pf_no/",
      );
      const projects = response.data;
      console.log(projects);
      // Sort projects by submission date in descending order
      const sortedProjects = projects.sort(
        (a, b) => new Date(b.submission_date) - new Date(a.submission_date),
      );
      console.log(sortedProjects);
      setTableData(sortedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
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
      formData.append("pi", inputs.pi);
      formData.append("co_pi", inputs.coPi);
      formData.append("funding_agency", inputs.fundingAgency);
      formData.append("status", inputs.status);
      formData.append("start", inputs.startDate);
      formData.append("end", inputs.expectedFinishDate);
      formData.append("sub", inputs.submissionDate);
      formData.append("financial_outlay", inputs.financialOutlay);
      formData.append("title", inputs.title);

      if (isEdit === false) {
        const res = await axios.post(
          "http://127.0.0.1:8000/eis/project/",
          formData,
        );
        console.log(res.data);
      } else {
        formData.append("project_id", Id);
        const res = await axios.post(
          "http://127.0.0.1:8000/eis/project/",
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
        pi: "",
        coPi: "",
        fundingAgency: "",
        status: "",
        submissionDate: "",
        startDate: "",
        expectedFinishDate: "",
        financialOutlay: "",
        title: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleEdit = (project) => {
  //   // Populate the inputs with the project data for editing
    
  //   setInputs({
  //     pi: project.pi,
  //     coPi: project.co_pi,
  //     fundingAgency: project.funding_agency,
  //     status: project.status,
  //     submissionDate: project.date_submission,
  //     startDate: project.start_date,
  //     expectedFinishDate: project.finish_date,
  //     financialOutlay: project.financial_outlay,
  //     title: project.title,
  //   });

  //   setId(project.id);
  //   setEdit(true);
  // };
  const handleEdit = (project) => {
    setInputs({
      pi: project.pi,
      coPi: project.co_pi,
      fundingAgency: project.funding_agency,
      status: project.status,
      submissionDate: project.date_submission ? new Date(project.date_submission) : null,
      startDate: project.start_date ? new Date(project.start_date) : null,
      expectedFinishDate: project.finish_date ? new Date(project.finish_date) : null,
      financialOutlay: project.financial_outlay,
      title: project.title,
    });
  
    setId(project.id);
    setEdit(true);
  };
  

  const handleDelete = async (projectId) => {
    console.log(projectId);
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.post(
          `http://127.0.0.1:8000/eis/emp_research_projectsDelete/`,
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
            Add a Research Project
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Project Incharge (PI)"
                  placeholder="(PI)"
                  value={inputs.pi}
                  onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Co-Project Incharge (CO-PI)"
                  placeholder="(CO-PI)"
                  value={inputs.coPi}
                  onChange={(e) =>
                    setInputs({ ...inputs, coPi: e.target.value })
                  }
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Funding Agency"
                  placeholder="Funding Agency"
                  value={inputs.fundingAgency}
                  onChange={(e) =>
                    setInputs({ ...inputs, fundingAgency: e.target.value })
                  }
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Status"
                  placeholder="Select status"
                  data={[
                    { value: "ongoing", label: "Ongoing" },
                    { value: "completed", label: "Completed" },
                  ]}
                  value={inputs.status}
                  onChange={(value) =>
                    setInputs({ ...inputs, status: value || "" })
                  }
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <DatePickerInput
                  label="Submission Date"
                  placeholder="Select date"
                  value={inputs.submissionDate}
                  onChange={(date) =>
                    setInputs({ ...inputs, submissionDate: date })
                  }
                  valueFormat="YYYY-MM-DD"
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <DatePickerInput
                  label="Start Date"
                  placeholder="Select date"
                  value={inputs.startDate}
                  onChange={(date) =>
                    setInputs({ ...inputs, startDate: date })
                  }
                  valueFormat="YYYY-MM-DD"
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <DatePickerInput
                  label="Expected Finish Date"
                  placeholder="Select date"
                  value={inputs.expectedFinishDate}
                  onChange={(date) =>
                    setInputs({ ...inputs, expectedFinishDate: date })
                  }
                  valueFormat="YYYY-MM-DD"
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  required
                  label="Financial Outlay"
                  placeholder="Financial Outlay"
                  value={inputs.financialOutlay}
                  onChange={(e) =>
                    setInputs({ ...inputs, financialOutlay: e.target.value })
                  }
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  required
                  label="Title"
                  placeholder="Project Title"
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
          <Table striped highlightOnHover style={{ minWidth: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                {["Title", "PI", "Co-PI", "Funding Agency", "Status", "Submission Date", "Start Date", "Expected Finish Date", "Financial Outlay", "Actions"].map((header, index) => (
                  <th
                    key={index}
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
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
                tableData.map((project, index) => (
                  <tr key={index} style={{ backgroundColor: "#fff" }}>
                    <td style={{ padding: "12px 16px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.title}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.pi}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.co_pi}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.funding_agency}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.status}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.date_submission}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.start_date}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.finish_date}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: "#0d6efd", fontWeight: "500", border: "1px solid #dee2e6" }}>
                      {project.financial_outlay}
                    </td>
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
                  <td colSpan={9} style={{ textAlign: "center", padding: "20px", color: "#6c757d", border: "1px solid #dee2e6" }}>
                    No research projects found.
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
