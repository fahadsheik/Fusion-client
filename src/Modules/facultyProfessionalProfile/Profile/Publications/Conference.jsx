// import { useState } from "react";
// // import { Save } from "lucide-react";
// import axios from "axios";
// import {
//   MantineProvider,
//   Container,
//   Paper,
//   Title,
//   Grid,
//   TextInput,
//   Select,
//   Button,
//   Table,
//   FileInput,
//   Accordion,
// } from "@mantine/core";
// import { FloppyDisk, Trash, UploadSimple } from "@phosphor-icons/react";

// export default function Conference() {
//   const [inputs, setInputs] = useState({
//     author: "",
//     coAuthor: "",
//     conferenceName: "",
//     conferneceFile: "",
//     year: "",
//     title: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       const res = await axios.post("/author_insert", inputs);
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.post("/emp_consultancy_projectsDelete", id);
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const years = Array.from({ length: 31 }, (_, i) => (2000 + i).toString());

//   // let tableData = [];
//   // useEffect(() => {
//   //   const getTableData = async () => {
//   //     try {
//   //       const res = await axios.get("/get_data");
//   //       tableData = res.data;
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };
//   //   getTableData();
//   // }, []);

//   const tableData = Array.from({ length: 10 }, (_, index) => ({
//     id: `${index + 1}`,
//     title: `Title of Paper ${index + 1}`,
//     author: `Author ${String.fromCharCode(65 + index)}`,
//     conferenceName: `Details ${String.fromCharCode(65 + index)}`,
//     conferenceFile: `Download Link`,
//   }));

//   return (
//     <MantineProvider withGlobalStyles withNormalizeCSS>
//       <Container size="2xl" mt="xl">
//         <Paper
//           shadow="xs"
//           p="md"
//           withBorder
//           style={{ borderLeft: "8px solid #2185d0" }}
//         >
//           <Title order={2} mb="sm">
//             Add a Conference
//           </Title>
//           <form onSubmit={handleSubmit}>
//             <Grid>
//               <Grid.Col span={6}>
//                 <TextInput
//                   label="Author"
//                   placeholder="Author"
//                   value={inputs.author}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, author: e.target.value })
//                   }
//                   required
//                 />
//               </Grid.Col>
//               <Grid.Col span={6}>
//                 <TextInput
//                   label="Co-author(s)"
//                   placeholder="Co-author(s)"
//                   value={inputs.coAuthor}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, coAuthor: e.target.value })
//                   }
//                 />
//               </Grid.Col>
//               <Grid.Col span={6}>
//                 <TextInput
//                   label="Conference Name"
//                   placeholder="Name of the Conference"
//                   value={inputs.conferenceName}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, conferenceName: e.target.value })
//                   }
//                   required
//                 />
//               </Grid.Col>
//               <Grid.Col span={3}>
//                 <FileInput
//                   label="Conference File"
//                   placeholder="Choose file"
//                   icon={<UploadSimple size={14} />}
//                   value={inputs.conferenceFile}
//                   onChange={(file) =>
//                     setInputs({ ...inputs, conferenceFile: file })
//                   }
//                 />
//               </Grid.Col>
//               <Grid.Col span={3}>
//                 <Select
//                   label="Year"
//                   placeholder="Select year"
//                   data={years}
//                   value={inputs.year}
//                   onChange={(value) =>
//                     setInputs({ ...inputs, year: value || "" })
//                   }
//                   required
//                 />
//               </Grid.Col>
//               <Grid.Col span={12}>
//                 <TextInput
//                   label="Title"
//                   placeholder="Title"
//                   value={inputs.title}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, title: e.target.value })
//                   }
//                   required
//                 />
//               </Grid.Col>
//               <Grid.Col span={12}>
//                 <Accordion>
//                   <Accordion.Item label="Optional Conference Details">
//                     <Grid>{/* Add optional fields here */}</Grid>
//                   </Accordion.Item>
//                 </Accordion>
//               </Grid.Col>
//               <Grid.Col
//                 span={12}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//               >
//                 <Button
//                   type="submit"
//                   loading={isLoading}
//                   leftIcon={<FloppyDisk size={16} />}
//                 >
//                   Save
//                 </Button>
//               </Grid.Col>
//             </Grid>
//           </form>
//         </Paper>

//         <Paper mt="xl" p="md" withBorder>
//           <Title order={3} mb="sm">
//             Report:
//           </Title>
//           <div style={{ overflowX: "auto", maxHeight: "400px" }}>
//             {tableData.length === 0 ? (
//               <p>No Data Found</p>
//             ) : (
//               <Table striped highlightOnHover>
//                 <thead>
//                   <tr>
//                     <th>Sr.</th>
//                     <th>Title of Paper</th>
//                     <th>Authors</th>
//                     <th>Details</th>
//                     <th>Download</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tableData.map((data, index) => (
//                     <tr key={index}>
//                       <td>{data.id}</td>
//                       <td>{data.title}</td>
//                       <td>{data.author}</td>
//                       <td>{data.details}</td>
//                       <td>
//                         <Button variant="outline" size="xs">
//                           Download
//                         </Button>
//                       </td>
//                       <td>
//                         <Button
//                           variant="filled"
//                           color="red"
//                           size="xs"
//                           leftIcon={<Trash size={14} />}
//                           onClick={() => handleDelete(data.id)}
//                         >
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             )}
//           </div>
//         </Paper>
//       </Container>
//     </MantineProvider>
//   );
// }













import React, { useState, useEffect } from "react";
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
  Modal,
} from "@mantine/core";
import { FloppyDisk, Pencil, Trash, UploadSimple } from "@phosphor-icons/react";

export default function Conference() {
  const [inputs, setInputs] = useState({
    author: "",
    coAuthor: "",
    conferenceName: "",
    conferenceFile: null,
    year: "",
    title: "",
    venueHostInstitute: "",
    dateOfSubmission: "",
    dateOfAcceptance: "",
    dateOfPublication: "",
    pageNo: "",
    status: "",
    conferenceDates: "",
    isbnNo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/eis/fetch_conference/");
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching conferences:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        const formData = new FormData();
        formData.append("author", inputs.author);
        formData.append("co_authors", inputs.coAuthor);
        formData.append("title", inputs.title);
        formData.append("name", inputs.conferenceName);
        formData.append("venue", inputs.venueHostInstitute);
        formData.append("isbn_no", inputs.isbnNo);
        formData.append("page_no", inputs.pageNo);
        formData.append("year", inputs.year);
        formData.append("status", inputs.status);
        formData.append("doi", inputs.conferenceDates);
        formData.append("doa", inputs.dateOfAcceptance);
        formData.append("dop", inputs.dateOfPublication);
        formData.append("dos", inputs.dateOfSubmission);
        formData.append("conferencepk", editingId);
        await axios.post("http://127.0.0.1:8000/eis/conference/edit", formData);
      } else {
        const formData = new FormData();
        formData.append("author", inputs.author);
        formData.append("co_authors", inputs.coAuthor);
        formData.append("title", inputs.title);
        formData.append("name", inputs.conferenceName);
        formData.append("venue", inputs.venueHostInstitute);
        formData.append("isbn_no", inputs.isbnNo);
        formData.append("page_no", inputs.pageNo);
        formData.append("year", inputs.year);
        formData.append("status", inputs.status);
        formData.append("doi", inputs.conferenceDates);
        formData.append("doa", inputs.dateOfAcceptance);
        formData.append("dop", inputs.dateOfPublication);
        formData.append("dos", inputs.dateOfSubmission);
        await axios.post("http://127.0.0.1:8000/eis/conference/", formData);
      }
      fetchConferences();
      setInputs({
        author: "",
        coAuthor: "",
        conferenceName: "",
        conferenceFile: null,
        year: "",
        title: "",
        venueHostInstitute: "",
        dateOfSubmission: "",
        dateOfAcceptance: "",
        dateOfPublication: "",
        pageNo: "",
        status: "",
        conferenceDates: "",
        isbnNo: "",
      });
      setEditingId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting conference:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (conference) => {
    setInputs(conference);
    setEditingId(conference.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const formData = new FormData();
      formData.append("pk", id);
      await axios.post("http://127.0.0.1:8000/eis/emp_confrence_organisedDelete/", formData);
      fetchConferences();
    } catch (error) {
      console.error("Error deleting conference:", error);
    }
  };

  const years = Array.from({ length: 31 }, (_, i) => (2000 + i).toString());

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="2xl" mt="xl">
        <Paper
          shadow="xs"
          p="md"
          withBorder
          style={{ borderLeft: "8px solid #2185d0", backgroundColor: "#f9fafb" }}
        >
          <Title order={2} mb="sm" style={{ color: "#2185d0" }}>
            {inputs.id ? "Edit Conference" : "Add a Conference"}
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
                  placeholder="Co-Author"
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
                  placeholder="Choose File"
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
                  placeholder="2021"
                  data={years}
                  value={inputs.year}
                  onChange={(value) => setInputs({ ...inputs, year: value })}
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
                {/* <Accordion>
                  <Accordion.Item label="Optional Conference Details"> */}
                <details>
                  <summary style={{ cursor: "pointer", color: "#2185d0" }}>Optional Journal Details</summary>
                    <Grid gutter="md">
                      <Grid.Col span={6}>
                        <TextInput
                          label="Venue/Host Institute"
                          placeholder="Venue/Host Institute"
                          value={inputs.venueHostInstitute}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              venueHostInstitute: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Date of Submission(DOS)"
                          placeholder="Date/Time"
                          value={inputs.dateOfSubmission}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              dateOfSubmission: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Date of Acceptance(DOA)"
                          placeholder="Date/Time"
                          value={inputs.dateOfAcceptance}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              dateOfAcceptance: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Date of Publication(DOP)"
                          placeholder="Date/Time"
                          value={inputs.dateOfPublication}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              dateOfPublication: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Page No."
                          placeholder="Date of Publication"
                          value={inputs.pageNo}
                          onChange={(e) =>
                            setInputs({ ...inputs, pageNo: e.target.value })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Select
                          label="Status"
                          placeholder="Status"
                          data={["Published", "Accepted", "Submitted"]}
                          value={inputs.status}
                          onChange={(value) =>
                            setInputs({ ...inputs, status: value })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Conference Date(s)"
                          placeholder="SCI/SCIE"
                          value={inputs.conferenceDates}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              conferenceDates: e.target.value,
                            })
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="ISBN No"
                          placeholder="Date of Issuance"
                          value={inputs.isbnNo}
                          onChange={(e) =>
                            setInputs({ ...inputs, isbnNo: e.target.value })
                          }
                        />
                      </Grid.Col>
                    </Grid>
                  </details>
                  {/* </Accordion.Item>
                </Accordion> */}
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
                      <td>{index + 1}</td>
                      <td>{data.title}</td>
                      <td>{`${data.author}${
                        data.coAuthor ?` , ${data.coAuthor}` : ""
                      }`}</td>
                      <td>{data.conferenceName}</td>
                      <td>
                        <Button variant="outline" size="xs">
                          Download
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="filled"
                          color="blue"
                          size="xs"
                          leftIcon={<Pencil size={14} />}
                          onClick={() => handleEdit(data)}
                          mr="xs"
                        >
                          Edit
                        </Button>
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

        <Modal
          opened={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingId(null);
            setInputs({
              author: "",
              coAuthor: "",
              conferenceName: "",
              conferenceFile: null,
              year: "",
              title: "",
              venueHostInstitute: "",
              dateOfSubmission: "",
              dateOfAcceptance: "",
              dateOfPublication: "",
              pageNo: "",
              status: "",
              conferenceDates: "",
              isbnNo: "",
            });
          }}
          title="Edit Conference"
        >
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
                  placeholder="Co-Author"
                  value={inputs.coAuthor}
                  onChange={(e) =>
                    setInputs({ ...inputs, coAuthor: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={12}>
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
              <Grid.Col span={6}>
                <FileInput
                  label="Conference File"
                  placeholder="Choose File"
                  icon={<UploadSimple size={14} />}
                  value={inputs.conferenceFile}
                  onChange={(file) =>
                    setInputs({ ...inputs, conferenceFile: file })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Year"
                  placeholder="2021"
                  data={years}
                  value={inputs.year}
                  onChange={(value) => setInputs({ ...inputs, year: value })}
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
              <Grid.Col span={6}>
                <TextInput
                  label="Venue/Host Institute"
                  placeholder="Venue/Host Institute"
                  value={inputs.venueHostInstitute}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      venueHostInstitute: e.target.value,
                    })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Date of Submission(DOS)"
                  placeholder="Date/Time"
                  value={inputs.dateOfSubmission}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      dateOfSubmission: e.target.value,
                    })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Date of Acceptance(DOA)"
                  placeholder="Date/Time"
                  value={inputs.dateOfAcceptance}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      dateOfAcceptance: e.target.value,
                    })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Date of  Publication(DOP)"
                  placeholder="Date/Time"
                  value={inputs.dateOfPublication}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      dateOfPublication: e.target.value,
                    })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Page No."
                  placeholder="Date of Publication"
                  value={inputs.pageNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, pageNo: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Status"
                  placeholder="Status"
                  data={["Published", "Accepted", "Submitted"]}
                  value={inputs.status}
                  onChange={(value) =>
                    setInputs({ ...inputs, status: value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Conference Date(s)"
                  placeholder="SCI/SCIE"
                  value={inputs.conferenceDates}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      conferenceDates: e.target.value,
                    })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="ISBN No"
                  placeholder="Date of Issuance"
                  value={inputs.isbnNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, isbnNo: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Button type="submit" loading={isLoading}>
                  Update
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Modal>
      </Container>
    </MantineProvider>
  );
}