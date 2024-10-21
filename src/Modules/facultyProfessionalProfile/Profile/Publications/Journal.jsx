import { useState } from "react";
// import { Save } from "lucide-react";
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

export default function Conference() {
  const [inputs, setInputs] = useState({
    author: "",
    coAuthor: "",
    journalName: "",
    journalFile: File,
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
    details: `Details ${String.fromCharCode(65 + index)}`,
    download: `Download Link`,
  }));

  const years = Array.from({ length: 31 }, (_, i) => (2000 + i).toString());

  // return (
  //   <div className="bg-white p-6 rounded-lg shadow-inner w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
  //     <h1 className="text-lg font-medium text-gray-800 mb-1">Add a Journal</h1>
  //     <hr />
  //     <form className="space-y-6 my-5" onSubmit={handleSubmit}>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <div>
  //           <label
  //             htmlFor="author"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Author
  //           </label>
  //           <input
  //             type="text"
  //             required
  //             id="author"
  //             placeholder="Author"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //             value={inputs.author}
  //             onChange={(e) => setInputs({ ...inputs, author: e.target.value })}
  //           />
  //         </div>
  //         <div>
  //           <label
  //             htmlFor="coAuthor"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Co-author(s)
  //           </label>
  //           <input
  //             type="text"
  //             required
  //             id="coAuthor"
  //             placeholder="Co-Author"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //             value={inputs.coAuthor}
  //             onChange={(e) =>
  //               setInputs({ ...inputs, coAuthor: e.target.value })
  //             }
  //           />
  //         </div>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //         <div>
  //           <label
  //             htmlFor="journalName"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Journal Name
  //           </label>
  //           <input
  //             type="text"
  //             required
  //             id="journalName"
  //             placeholder="Name of the Journal"
  //             value={inputs.journalName}
  //             onChange={(e) =>
  //               setInputs({ ...inputs, journalName: e.target.value })
  //             }
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //         </div>
  //         <div>
  //           <label
  //             htmlFor="journalFile"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Insert File
  //           </label>
  //           <input
  //             type="file"
  //             id="journalFile"
  //             onChange={(e) =>
  //               setInputs({ ...inputs, journalFile: e.target.files[0] })
  //             }
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
  //           <select
  //             id="year"
  //             value={inputs.year}
  //             onChange={(e) => setInputs({ ...inputs, year: e.target.value })}
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //           >
  //             <option value="" disabled>
  //               Year
  //             </option>
  //             {years.map((year) => (
  //               <option key={year} value={year}>
  //                 {year}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //       </div>

  //       <div>
  //         <label
  //           htmlFor="title"
  //           className="block text-sm font-medium text-gray-700"
  //         >
  //           Title
  //         </label>
  //         <input
  //           type="text"
  //           required
  //           id="title"
  //           placeholder="Title"
  //           value={inputs.title}
  //           onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
  //           className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //         />
  //       </div>

  //       <div className="flex justify-end">
  //         <button
  //           type="submit"
  //           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-customSaveButtonColor hover:bg-customSaveButtonColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-customSaveButtonColor"
  //           disabled={isLoading}
  //         >
  //           <Save className="w-5 h-5 mr-2" />
  //           {isLoading ? "Loading..." : "Save"}
  //         </button>
  //       </div>
  //     </form>

  //     <h1 className="font-medium text-gray-800 mb-1 mt-6">Report:</h1>
  //     <hr className="mb-4" />

  //     <div className="overflow-x-auto max-h-[400px]">
  //       <table className="min-w-full table-auto border-collapse border border-gray-200 text-left">
  //         <thead className="sticky top-0 bg-gray-400">
  //           <tr className="font-semibold text-gray-800">
  //             <th className="border border-gray-300 px-4 py-2">Sr</th>
  //             <th className="border border-gray-300 px-4 py-2">Title of Paper</th>
  //             <th className="border border-gray-300 px-4 py-2">Authors</th>
  //             <th className="border border-gray-300 px-4 py-2">Details</th>
  //             <th className="border border-gray-300 px-4 py-2">Download</th>
  //             <th className="border border-gray-300 px-4 py-2">Action</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {tableData.length > 0 ? (
  //             tableData.map((data, index) => (
  //               <tr
  //                 key={index}
  //                 className={`${
  //                   index % 2 === 0 ? "bg-gray-100" : "bg-white"
  //                 } hover:bg-gray-200`}
  //               >
  //                 <td className="border border-gray-300 px-4 py-2">
  //                   {data.id}
  //                 </td>
  //                 <td className="border border-gray-300 px-4 py-2">
  //                   {data.title}
  //                 </td>
  //                 <td className="border border-gray-300 px-4 py-2">
  //                   {data.author}
  //                 </td>
  //                 <td className="border border-gray-300 px-4 py-2">
  //                   {data.details}
  //                 </td>
  //                 <td className="border border-gray-300 px-4 py-2">
  //                   {data.download}
  //                 </td>
  //                 <td className="border border-gray-300 px-4 py-2 text-left">
  //                   <button
  //                     className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 border border-transparent transition duration-200"
  //                     onClick={() => handleDelete(data.id)}
  //                   >
  //                     Delete
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))
  //           ) : (
  //             <tr>
  //               <td colSpan={6} className="text-center py-4">
  //                 No Data Found
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );

  // return (
  //   <MantineProvider withGlobalStyles withNormalizeCSS>
  //     <Container size="2xl" mt="xl">
  //       <Paper shadow="xs" p="md" withBorder style={{ borderLeft: '8px solid #2185d0' }}>
  //         <Title order={2} mb="sm">Add a Journal</Title>
  //         <form onSubmit={handleSubmit}>
  //           <Grid gutter="md">
  //             <Grid.Col span={6}>
  //               <TextInput
  //                 required
  //                 label="Author"
  //                 placeholder="Author"
  //                 value={inputs.pi}
  //                 onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={6}>
  //               <TextInput
  //                 required
  //                 label="Co-author(s)"
  //                 placeholder="Co-author"
  //                 value={inputs.co_pi}
  //                 onChange={(e) => setInputs({ ...inputs, co_pi: e.target.value })}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={6}>
  //               <TextInput
  //                 required
  //                 label="Journal Name"
  //                 placeholder="Journal Name"
  //                 value={inputs.funding_agency}
  //                 onChange={(e) => setInputs({ ...inputs, funding_agency: e.target.value })}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={6}>
  //               <Select
  //                 label="Status"
  //                 placeholder="Select status"
  //                 data={[
  //                   { value: 'ongoing', label: 'Ongoing' },
  //                   { value: 'completed', label: 'Completed' },
  //                 ]}
  //                 value={inputs.status}
  //                 onChange={(value) => setInputs({ ...inputs, status: value || '' })}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={3}>
  //               <DatePickerInput
  //                 label="Submission Date"
  //                 placeholder="Select date"
  //                 value={inputs.date_submission}
  //                 onChange={(date) => setInputs({ ...inputs, date_submission: date })}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={3}>
  //               <DatePickerInput
  //                 label="Start Date"
  //                 placeholder="Select date"
  //                 value={inputs.start_date}
  //                 onChange={(date) => setInputs({ ...inputs, start_date: date })}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={3}>
  //               <DatePickerInput
  //                 label="Expected Finish Date"
  //                 placeholder="Select date"
  //                 value={inputs.finish_date}
  //                 onChange={(date) => setInputs({ ...inputs, finish_date: date })}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={3}>
  //               <TextInput
  //                 required
  //                 label="Financial Outlay"
  //                 placeholder="Financial Outlay"
  //                 value={inputs.financial_outlay}
  //                 onChange={(e) => setInputs({ ...inputs, financial_outlay: e.target.value })}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={12}>
  //               <TextInput
  //                 required
  //                 label="Title"
  //                 placeholder="Project Title"
  //                 value={inputs.title}
  //                 onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
  //               />
  //             </Grid.Col>
  //           </Grid>
  //           <Button
  //             type="submit"
  //             mt="md"
  //             loading={isLoading}
  //             leftIcon={<FloppyDisk size={16} />}
  //           >
  //             Save
  //           </Button>
  //         </form>
  //       </Paper>

  //       <Paper mt="xl" p="md" withBorder>
  //         <Table>
  //           <thead>
  //             <tr>
  //               <th>Title</th>
  //               <th>PI</th>
  //               <th>Co-PI</th>
  //               <th>Funding Agency</th>
  //               <th>Status</th>
  //               <th>Submission Date</th>
  //               <th>Start Date</th>
  //               <th>Expected Finish Date</th>
  //               <th>Financial Outlay</th>
  //               <th>Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {tableData.map((project) => (
  //               <tr key={project.id}>
  //                 <td>{project.title}</td>
  //                 <td>{project.pi}</td>
  //                 <td>{project.co_pi}</td>
  //                 <td>{project.funding_agency}</td>
  //                 <td>{project.status}</td>
  //                 <td>{project.date_submission?.toLocaleDateString()}</td>
  //                 <td>{project.start_date?.toLocaleDateString()}</td>
  //                 <td>{project.finish_date?.toLocaleDateString()}</td>
  //                 <td>{project.financial_outlay}</td>
  //                 <td>
  //                   <ActionIcon color="blue" onClick={() => handleEdit(project)}>
  //                     <PencilSimple size={16} />
  //                   </ActionIcon>
  //                   <ActionIcon color="red" onClick={() => handleDelete(project.id)}>
  //                     <Trash size={16} />
  //                   </ActionIcon>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </Table>
  //       </Paper>
  //     </Container>
  //   </MantineProvider>
  // );
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
            Add a Journal
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Author"
                  placeholder="Author"
                  value={inputs.author}
                  onChange={(e) =>
                    setInputs({ ...inputs, author: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Co-author(s)"
                  placeholder="Co-author(s)"
                  value={inputs.co_authors}
                  onChange={(e) =>
                    setInputs({ ...inputs, co_authors: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Journal Name"
                  placeholder="Journal Name"
                  value={inputs.journal_name}
                  onChange={(e) =>
                    setInputs({ ...inputs, journal_name: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  type="file"
                  label="Journal File"
                  placeholder="Choose File"
                  onChange={(e) =>
                    setInputs({ ...inputs, journal_file: e.target.files[0] })
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
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  required
                  label="Title"
                  placeholder="Journal Title"
                  value={inputs.title}
                  onChange={(e) =>
                    setInputs({ ...inputs, title: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <details>
                  <summary>Optional Journal Details</summary>
                  <Grid gutter="md">
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
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <DatePickerInput
                        label="Submission Date"
                        placeholder="Select date"
                        value={inputs.date_submission}
                        onChange={(date) =>
                          setInputs({ ...inputs, date_submission: date })
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <DatePickerInput
                        label="Start Date"
                        placeholder="Select date"
                        value={inputs.start_date}
                        onChange={(date) =>
                          setInputs({ ...inputs, start_date: date })
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <DatePickerInput
                        label="Expected Finish Date"
                        placeholder="Select date"
                        value={inputs.finish_date}
                        onChange={(date) =>
                          setInputs({ ...inputs, finish_date: date })
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Financial Outlay"
                        placeholder="Financial Outlay"
                        value={inputs.financial_outlay}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            financial_outlay: e.target.value,
                          })
                        }
                      />
                    </Grid.Col>
                  </Grid>
                </details>
              </Grid.Col>
            </Grid>
            <Button
              type="submit"
              mt="md"
              loading={isLoading}
              leftIcon={<FloppyDisk size={16} />}
            >
              Save
            </Button>
          </form>
        </Paper>

        <Paper mt="xl" p="md" withBorder>
          <Table>
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
              {tableData.map((project, index) => (
                <tr key={project.id}>
                  <td>{index + 1}</td>
                  <td>{project.title}</td>
                  <td>{`${project.author}, ${project.co_authors}`}</td>
                  <td>{project.journal_name}</td>
                  <td>
                    <Button size="xs" variant="outline">
                      Download
                    </Button>
                  </td>
                  <td>
                    {/* <ActionIcon
                      color="blue"
                      onClick={() => handleEdit(project)}
                    > */}
                    <ActionIcon color="blue">
                      <PencilSimple size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => handleDelete(project.id)}
                    >
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
