import { useState } from "react";
// import { Save } from "lucide-react";
import axios from "axios";
import {
  MantineProvider,
  Container,
  Paper,
  Title,
  Grid,
  TextInput,
  Select,
  Button,
  Table,
  FileInput,
  Accordion,
} from "@mantine/core";
import { FloppyDisk, Trash, UploadSimple } from "@phosphor-icons/react";

export default function Conference() {
  const [inputs, setInputs] = useState({
    author: "",
    coAuthor: "",
    conferenceName: "",
    conferneceFile: "",
    year: "",
    title: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("/author_insert", inputs);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.post("/emp_consultancy_projectsDelete", id);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const years = Array.from({ length: 31 }, (_, i) => (2000 + i).toString());

  // let tableData = [];
  // useEffect(() => {
  //   const getTableData = async () => {
  //     try {
  //       const res = await axios.get("/get_data");
  //       tableData = res.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getTableData();
  // }, []);

  const tableData = Array.from({ length: 10 }, (_, index) => ({
    id: `${index + 1}`,
    title: `Title of Paper ${index + 1}`,
    author: `Author ${String.fromCharCode(65 + index)}`,
    conferenceName: `Details ${String.fromCharCode(65 + index)}`,
    conferenceFile: `Download Link`,
  }));

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="2xl" mt="xl">
        <Paper
          shadow="xs"
          p="md"
          withBorder
          style={{ borderLeft: "8px solid #2185d0" }}
        >
          <Title order={2} mb="sm">
            Add a Conference
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="Author"
                  placeholder="Author"
                  value={inputs.author}
                  onChange={(e) =>
                    setInputs({ ...inputs, author: e.target.value })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Co-author(s)"
                  placeholder="Co-author(s)"
                  value={inputs.coAuthor}
                  onChange={(e) =>
                    setInputs({ ...inputs, coAuthor: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Conference Name"
                  placeholder="Name of the Conference"
                  value={inputs.conferenceName}
                  onChange={(e) =>
                    setInputs({ ...inputs, conferenceName: e.target.value })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <FileInput
                  label="Conference File"
                  placeholder="Choose file"
                  icon={<UploadSimple size={14} />}
                  value={inputs.conferenceFile}
                  onChange={(file) =>
                    setInputs({ ...inputs, conferenceFile: file })
                  }
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label="Year"
                  placeholder="Select year"
                  data={years}
                  value={inputs.year}
                  onChange={(value) =>
                    setInputs({ ...inputs, year: value || "" })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Title"
                  placeholder="Title"
                  value={inputs.title}
                  onChange={(e) =>
                    setInputs({ ...inputs, title: e.target.value })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Accordion>
                  <Accordion.Item label="Optional Conference Details">
                    <Grid>{/* Add optional fields here */}</Grid>
                  </Accordion.Item>
                </Accordion>
              </Grid.Col>
              <Grid.Col
                span={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  type="submit"
                  loading={isLoading}
                  leftIcon={<FloppyDisk size={16} />}
                >
                  Save
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>

        <Paper mt="xl" p="md" withBorder>
          <Title order={3} mb="sm">
            Report:
          </Title>
          <div style={{ overflowX: "auto", maxHeight: "400px" }}>
            {tableData.length === 0 ? (
              <p>No Data Found</p>
            ) : (
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Title of Paper</th>
                    <th>Authors</th>
                    <th>Details</th>
                    <th>Download</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.id}</td>
                      <td>{data.title}</td>
                      <td>{data.author}</td>
                      <td>{data.details}</td>
                      <td>
                        <Button variant="outline" size="xs">
                          Download
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="filled"
                          color="red"
                          size="xs"
                          leftIcon={<Trash size={14} />}
                          onClick={() => handleDelete(data.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Paper>
      </Container>
    </MantineProvider>
  );
}
