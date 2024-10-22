import { useState, useEffect } from "react";
import axios from "axios";

import {
  MantineProvider,
  Container,
  Paper,
  Grid,
  Select,
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Table,
  Title
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

export default function AoFForm() {
  const [inputs, setInputs] = useState({
    projectId: "",
    pfNo: "",
    date: null,
    fromBudgetHead: "",
    fromAmount: "",
    toBudgetHead: "",
    toAmount: "",
    details: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [projectOptions, setProjectOptions] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/projects/");
      const projects = response.data;
      setProjectOptions(
        projects.map((p) => ({ value: p.id.toString(), label: p.title })),
      );
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects. Please try again later.");
    }
  };

  const fetchExpenditureTransfers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/expenditure-transfers/",
      );
      const transfers = response.data;
      setTableData(transfers);
    } catch (error) {
      console.error("Error fetching expenditure transfers:", error);
      setError(
        "Failed to fetch expenditure transfers. Please try again later.",
      );
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchExpenditureTransfers();
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

      await axios.post(
        "http://127.0.0.1:8000/api/expenditure-transfers/",
        formData,
      );

      fetchExpenditureTransfers();
      setInputs({
        projectId: "",
        pfNo: "",
        date: null,
        fromBudgetHead: "",
        fromAmount: 0,
        toBudgetHead: "",
        toAmount: 0,
        details: "",
      });
    } catch (error) {
      console.error("Error submitting expenditure transfer:", error);
      setError("Failed to submit expenditure transfer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="2xl" mt="xl">
        <Paper
          shadow="xs"
          p="md"
          withBorder
          style={{ borderLeft: "8px solid #2185d0" }}
        >
          <form onSubmit={handleSubmit}>
              <Grid>
              <Grid.Col span={4}  md={6}>
                <Select
                  required
                  label="Project ID"
                  placeholder="Select project"
                  data={projectOptions}
                  value={inputs.projectId}
                  onChange={(value) =>
                    setInputs({ ...inputs, projectId: value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={4}  md={6}>
                <TextInput
                  required
                  label="PF No."
                  placeholder="Enter PF number"
                  value={inputs.pfNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, pfNo: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={4}  md={6}>
                <DatePickerInput
                  required
                  label="Date"
                  placeholder="Select date"
                  value={inputs.date}
                  onChange={(date) => setInputs({ ...inputs, date })}
                />
              </Grid.Col>
              </Grid>

              <Title order={5} mt="xl" mb="md">Project Head from which expenditure is to be transferred</Title>
              <Grid>
              <Grid.Col span={6}  md={6}>
                <TextInput
                  required
                  label="Budget Head"
                  placeholder="Enter budget head"
                  value={inputs.fromBudgetHead}
                  onChange={(e) =>
                    setInputs({ ...inputs, fromBudgetHead: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}  md={6}>
                <TextInput
                  required
                  label="Amount"
                  placeholder="Enter amount"
                  value={inputs.fromAmount}
                  onChange={(value) =>
                    setInputs({ ...inputs, fromAmount: value })
                  }
                />
              </Grid.Col>
              </Grid>

              <Title order={5} mt="xl" mb="md">Project Head from which expenditure is to be booked</Title>
              <Grid>
              <Grid.Col span={6}  md={6}>
                <TextInput
                  required
                  label="Budget Head"
                  placeholder="Enter budget head"
                  value={inputs.toBudgetHead}
                  onChange={(e) =>
                    setInputs({ ...inputs, toBudgetHead: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}  md={6}>
                <TextInput
                  required
                  label="Amount"
                  placeholder="Enter amount"
                  value={inputs.toAmount}
                  onChange={(value) =>
                    setInputs({ ...inputs, toAmount: value })
                  }
                />
              </Grid.Col>
              </Grid>

              <Grid>
              <Grid.Col span={12} mt={6}  md={6}>
                <Textarea
                  label="Details & Description"
                  placeholder="Enter details and description"
                  minRows={3}
                  value={inputs.details}
                  onChange={(e) =>
                    setInputs({ ...inputs, details: e.target.value })
                  }
                />
              </Grid.Col>
              </Grid>
            <Button type="submit" mt="md" loading={isLoading}>
              Submit
            </Button>
          </form>
        </Paper>

        <Paper mt="xl" p="md" withBorder>
          <Table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project title</th>
                <th>Budget Allotted</th>
                <th>Budget Remaining</th>
                <th>Reason</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((transfer) => (
                <tr key={transfer.id}>
                  <td>{transfer.projectId}</td>
                  <td>{transfer.projectTitle}</td>
                  <td>{transfer.budgetAllotted}</td>
                  <td>{transfer.budgetRemaining}</td>
                  <td>{transfer.reason}</td>
                  <td>{new Date(transfer.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      </Container>
    </MantineProvider>
  );
}
