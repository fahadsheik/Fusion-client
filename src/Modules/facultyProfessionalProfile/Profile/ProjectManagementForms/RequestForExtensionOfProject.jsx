import { useState, useEffect } from "react";
import axios from "axios";

import {
  MantineProvider,
  Container,
  Paper,
  Grid,
  TextInput,
  NumberInput,
  FileInput,
  Textarea,
  Button,
  Table,
} from "@mantine/core";

export default function RequestForExtensionOfProject() {
  const [inputs, setInputs] = useState({
    projectNo: "",
    previousDuration: "",
    currentDuration: "",
    extensionSanctioned: null,
    additionalDetails: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  const fetchExtensions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/project-extensions/");
      const extensions = response.data;
      setTableData(extensions);
    } catch (error) {
      console.error("Error fetching project extensions:", error);
      setError("Failed to fetch project extensions. Please try again later.");
    }
  };

  useEffect(() => {
    fetchExtensions();
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

      await axios.post("http://127.0.0.1:8000/api/project-extensions/", formData);

      fetchExtensions();
      setInputs({
        projectNo: "",
        previousDuration: "",
        currentDuration: "",
        extensionSanctioned: null,
        additionalDetails: "",
      });
    } catch (error) {
      console.error("Error submitting project extension:", error);
      setError("Failed to submit project extension. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="2xl" mt="xl">
        <Paper shadow="xs" p="md" withBorder style={{ borderLeft: "8px solid #2185d0" }}>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={4}>
                <TextInput
                  required
                  label="Project No"
                  placeholder="Enter project number"
                  value={inputs.projectNo}
                  onChange={(e) => setInputs({ ...inputs, projectNo: e.target.value })}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  label="Previous Duration"
                  placeholder="Enter previous duration"
                  min={0}
                  value={inputs.previousDuration}
                  onChange={(value) => setInputs({ ...inputs, previousDuration: value })}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  label="Current Duration"
                  placeholder="Current duration in weeks"
                  min={0}
                  value={inputs.currentDuration}
                  onChange={(value) => setInputs({ ...inputs, currentDuration: value })}
                />
              </Grid.Col>
              <Grid.Col span={4} mb={10}>
                <TextInput
                type="file"
                  label="Extension Sanctioned and Required up to (Enclose sanction letter)"
                  placeholder="Choose file"
                  accept="application/pdf"
                  onChange={(file) => setInputs({ ...inputs, extensionSanctioned: file })}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Textarea
                  label="Any relevant additional details on extension sought/sanctioned"
                  placeholder="Enter additional details"
                  minRows={3}
                  value={inputs.additionalDetails}
                  onChange={(e) => setInputs({ ...inputs, additionalDetails: e.target.value })}
                />
              </Grid.Col>
            </Grid>
            <Button
              type="submit"
              mt="md"
              loading={isLoading}
            >
              Submit
            </Button>
          </form>
        </Paper>

        <Paper mt="xl" p="md" withBorder>
          <Table>
            <thead>
              <tr>
                <th>User</th>
                <th>Project ID</th>
                <th>Project Title</th>
                <th>Rspc res.</th>
                <th>Extended duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((extension) => (
                <tr key={extension.id}>
                  <td>{extension.user}</td>
                  <td>{extension.projectId}</td>
                  <td>{extension.projectTitle}</td>
                  <td>{extension.rspcRes}</td>
                  <td>{extension.extendedDuration}</td>
                  <td>{new Date(extension.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      </Container>
    </MantineProvider>
  );
}