import { useState } from "react";
import axios from "axios";

import {
  MantineProvider,
  Container,
  Paper,
  TextInput,
  Select,
  Textarea,
  Button,
  Grid,
  Title,
} from "@mantine/core";

export default function UCSEForm() {
  const [inputs, setInputs] = useState({
    projectNo: "",
    committedExpensesDues: "",
    committedExpensesRemarks: "",
    otherDirectPaymentsDues: "",
    otherDirectPaymentsRemarks: "",
    salaryHonorariumDues: "",
    salaryHonorariumRemarks: "",
    advancesOutstandingDues: "",
    advancesOutstandingRemarks: "",
    othersDues: "",
    othersRemarks: "",
    fullOverheadDeductedDues: "",
    fullOverheadDeductedRemarks: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const duesOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("http://127.0.0.1:8000/api/project-expenses-dues/", inputs);
      alert("Form submitted successfully!");
      setInputs({
        projectNo: "",
        committedExpensesDues: "",
        committedExpensesRemarks: "",
        otherDirectPaymentsDues: "",
        otherDirectPaymentsRemarks: "",
        salaryHonorariumDues: "",
        salaryHonorariumRemarks: "",
        advancesOutstandingDues: "",
        advancesOutstandingRemarks: "",
        othersDues: "",
        othersRemarks: "",
        fullOverheadDeductedDues: "",
        fullOverheadDeductedRemarks: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="2xl" my="xl">
        <Paper shadow="xs" p="md" withBorder style={{ borderLeft: "8px solid #2185d0" }}>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Project No."
              name="projectNo"
              placeholder="Enter project number"
              value={inputs.projectNo}
              onChange={handleInputChange}
              required
              mb="md"
            />

            <Title order={5} mt="xl" mb="md">Committed Expenses, if any</Title>
            <Grid>
              <Grid.Col span={6} md={6}>
                <Select
                  label="Please specify whether any dues outstanding"
                  name="committedExpensesDues"
                  placeholder="Select"
                  data={duesOptions}
                  value={inputs.committedExpensesDues}
                  onChange={(value) => setInputs((prev) => ({ ...prev, committedExpensesDues: value }))}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6} md={6}>
                <Textarea
                  label="Remarks & Description"
                  name="committedExpensesRemarks"
                  placeholder="Enter remarks and description"
                  value={inputs.committedExpensesRemarks}
                  onChange={handleInputChange}
                  minRows={5}
                />
              </Grid.Col>
            </Grid>

            <Title order={5} mt="xl" mb="md">Other direct payments under processing</Title>
            <Grid>
              <Grid.Col span={6} md={6}>
                <Select
                  label="Please specify whether any dues outstanding"
                  name="otherDirectPaymentsDues"
                  placeholder="Select"
                  data={duesOptions}
                  value={inputs.otherDirectPaymentsDues}
                  onChange={(value) => setInputs((prev) => ({ ...prev, otherDirectPaymentsDues: value }))}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6} md={6}>
                <Textarea
                  label="Remarks & Description"
                  name="otherDirectPaymentsRemarks"
                  placeholder="Enter remarks and description"
                  value={inputs.otherDirectPaymentsRemarks}
                  onChange={handleInputChange}
                  minRows={5}
                />
              </Grid.Col>
            </Grid>

            <Title order={5} mt="xl" mb="md">Salary/Honorarium dues like last payment of employees etc. under processing</Title>
            <Grid>
              <Grid.Col span={6} md={6}>
                <Select
                  label="Please specify whether any dues outstanding"
                  name="salaryHonorariumDues"
                  placeholder="Select"
                  data={duesOptions}
                  value={inputs.salaryHonorariumDues}
                  onChange={(value) => setInputs((prev) => ({ ...prev, salaryHonorariumDues: value }))}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6} md={6}>
                <Textarea
                  label="Remarks & Description"
                  name="salaryHonorariumRemarks"
                  placeholder="Enter remarks and description"
                  value={inputs.salaryHonorariumRemarks}
                  onChange={handleInputChange}
                  minRows={5}
                />
              </Grid.Col>
            </Grid>

            <Title order={5} mt="xl" mb="md">Advances outstanding</Title>
            <Grid>
              <Grid.Col span={6} md={6}>
                <Select
                  label="Please specify whether any dues outstanding"
                  name="advancesOutstandingDues"
                  placeholder="Select"
                  data={duesOptions}
                  value={inputs.advancesOutstandingDues}
                  onChange={(value) => setInputs((prev) => ({ ...prev, advancesOutstandingDues: value }))}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6} md={6}>
                <Textarea
                  label="Remarks & Description"
                  name="advancesOutstandingRemarks"
                  placeholder="Enter remarks and description"
                  value={inputs.advancesOutstandingRemarks}
                  onChange={handleInputChange}
                  minRows={5}
                />
              </Grid.Col>
            </Grid>

            <Title order={5} mt="xl" mb="md">Others (If any)</Title>
            <Grid>
              <Grid.Col span={6} md={6}>
                <Select
                  label="Please specify whether any dues outstanding"
                  name="othersDues"
                  placeholder="Select"
                  data={duesOptions}
                  value={inputs.othersDues}
                  onChange={(value) => setInputs((prev) => ({ ...prev, othersDues: value }))}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6} md={6}>
                <Textarea
                  label="Remarks & Description"
                  name="othersRemarks"
                  placeholder="Enter remarks and description"
                  value={inputs.othersRemarks}
                  onChange={handleInputChange}
                  minRows={5}
                />
              </Grid.Col>
            </Grid>

            <Title order={5} mt="xl" mb="md">Full Overhead deducted</Title>
            <Grid>
              <Grid.Col span={6} md={6}>
                <Select
                  label="Please specify whether any dues outstanding"
                  name="fullOverheadDeductedDues"
                  placeholder="Select"
                  data={duesOptions}
                  value={inputs.fullOverheadDeductedDues}
                  onChange={(value) => setInputs((prev) => ({ ...prev, fullOverheadDeductedDues: value }))}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6} md={6}>
                <Textarea
                  label="Remarks & Description"
                  name="fullOverheadDeductedRemarks"
                  placeholder="Enter remarks and description"
                  value={inputs.fullOverheadDeductedRemarks}
                  onChange={handleInputChange}
                  minRows={5}
                />
              </Grid.Col>
            </Grid>

            {error && (
              <Paper p="md" withBorder color="red" mt="md">
                <p style={{ color: "red", margin: 0 }}>{error}</p>
              </Paper>
            )}

            <Button
              type="submit"
              mt="md"
              loading={isLoading}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </MantineProvider>
  );
}