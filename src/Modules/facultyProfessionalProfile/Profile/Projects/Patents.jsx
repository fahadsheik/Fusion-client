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
        "http://127.0.0.1:8000/FPF/patents/pf_no/",
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
          "http://127.0.0.1:8000/FPF/patent_insert/",
          formData,
        );
        console.log(res.data);
      } else {
        formData.append("patent_id", Id);
        const res = await axios.post(
          "http://127.0.0.1:8000/FPF/patent_insert/",
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
          `http://127.0.0.1:8000/FPF/emp_patentsDelete/`,
          new URLSearchParams({ pk: projectId }),
        ); // Adjust the delete URL as needed
        fetchProjects(); // Refresh the project list after deletion
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  // const years = Array.from({ length: 31 }, (_, i) => (2000 + i).toString());
  // const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  // return (
  //   <div className="bg-white p-6 rounded-lg shadow-inner w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
  //     <h1 className="text-lg font-medium text-gray-800 mb-1">Add a Patent</h1>
  //     <hr />
  //     <form className="space-y-6 my-5" onSubmit={handleSubmit}>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <div>
  //           <label
  //             htmlFor="patent-number"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Patent Number
  //           </label>
  //           <input
  //             type="text"
  //             required
  //             id="patent-number"
  //             placeholder="Patent Number"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
  //             value={inputs.patentNumber}
  //             onChange={(e) =>
  //               setInputs({ ...inputs, patentNumber: e.target.value })
  //             }
  //           />
  //         </div>
  //         <div>
  //           <label
  //             htmlFor="status"
  //             className="block text-sm font-medium text-gray-700 ml-1"
  //           >
  //             Status
  //           </label>
  //           <select
  //             id="status"
  //             placeholder="Status"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400 transition ease-in-out duration-300"
  //             value={inputs.status}
  //             onChange={(e) => setInputs({ ...inputs, status: e.target.value })}
  //           >
  //             <option value="" disabled>
  //               Status
  //             </option>
  //             <option value="Filed">Filed</option>
  //             <option value="Granted">Granted</option>
  //             <option value="Published">Published</option>
  //             <option value="Owned">Owned</option>
  //           </select>
  //         </div>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //         <div>
  //           <label
  //             htmlFor="earnings"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Earnings (in Rs.)
  //           </label>
  //           <input
  //             type="number"
  //             required
  //             id="earnings"
  //             placeholder="Earnings"
  //             value={inputs.earnings}
  //             onChange={(e) =>
  //               setInputs({ ...inputs, earnings: e.target.value })
  //             }
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
  //           />
  //         </div>
  //         <div>
  //           <label
  //             htmlFor="year"
  //             className="block text-sm font-medium text-gray-700 ml-1"
  //           >
  //             Year
  //           </label>
  //           <select
  //             id="year"
  //             placeholder="Year"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
  //             value={inputs.year}
  //             onChange={(e) => setInputs({ ...inputs, year: e.target.value })}
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
  //         <div>
  //           <label
  //             htmlFor="month"
  //             className="block text-sm font-medium text-gray-700 ml-1"
  //           >
  //             Month
  //           </label>
  //           <select
  //             id="month"
  //             placeholder="Select Month"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
  //             value={inputs.month}
  //             onChange={(e) => setInputs({ ...inputs, month: e.target.value })}
  //           >
  //             <option value="" disabled>
  //               Month
  //             </option>
  //             {months.map((month) => (
  //               <option key={month} value={month}>
  //                 {month}
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
  //           className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
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

  //     <div className="overflow-x-auto">
  //       <table className="min-w-full border border-gray-300">
  //         <thead>
  //           <tr>
  //             <th className="border border-gray-300 p-2">Title</th>
  //             <th className="border border-gray-300 p-2">Patent Number</th>
  //             <th className="border border-gray-300 p-2">Status</th>
  //             <th className="border border-gray-300 p-2">Earnings</th>
  //             <th className="border border-gray-300 p-2">Year</th>
  //             <th className="border border-gray-300 p-2">Month</th>
  //             <th className="border border-gray-300 p-2">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {tableData.length > 0 ? (
  //             tableData.map((project) => (
  //               <tr key={project.id}>
  //                 <td className="border border-gray-300 p-2">{project.title}</td>
  //                 <td className="border border-gray-300 p-2">{project.p_no}</td>
  //                 <td className="border border-gray-300 p-2">{project.status}</td>
  //                 <td className="border border-gray-300 p-2">{project.earnings}</td>
  //                 <td className="border border-gray-300 p-2">{project.p_year}</td>
  //                 <td className="border border-gray-300 p-2">{project.a_month}</td>
  //                 <td className="border border-gray-300 p-2">
  //                   <button
  //                     onClick={() => handleEdit(project)}
  //                     className="text-blue-500 hover:text-blue-700 mr-2"
  //                   >
  //                     <Edit className="inline" /> Edit
  //                   </button>
  //                   <button
  //                     onClick={() => handleDelete(project.id)} // Adjust this to match your project ID field
  //                     className="text-red-500 hover:text-red-700"
  //                   >
  //                     <Trash className="inline" /> Delete
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))
  //           ) : (
  //             <tr>
  //               <td colSpan="7" className="border border-gray-300 p-2 text-center">No projects found.</td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );

  // return (
  //   <div className="p-6 rounded-lg shadow-inner w-full max-w-[4910px]">
  //     <h1 className="text-lg font-medium text-gray-800 mb-1">Add a Patent</h1>
  //     <Divider />

  //     <form className="space-y-6 my-5" onSubmit={handleSubmit}>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <TextInput
  //           label="Patent Number"
  //           placeholder="Patent Number"
  //           required
  //           value={inputs.patentNumber}
  //           onChange={(e) => setInputs({ ...inputs, patentNumber: e.target.value })}
  //         />

  //         <Select
  //           label="Status"
  //           placeholder="Status"
  //           data={[
  //             { value: 'Filed', label: 'Filed' },
  //             { value: 'Granted', label: 'Granted' },
  //             { value: 'Published', label: 'Published' },
  //             { value: 'Owned', label: 'Owned' },
  //           ]}
  //           value={inputs.status}
  //           onChange={(value) => setInputs({ ...inputs, status: value })}
  //         />
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //         <TextInput
  //           label="Earnings (in Rs.)"
  //           placeholder="Earnings"
  //           required
  //           type="number"
  //           value={inputs.earnings}
  //           onChange={(e) => setInputs({ ...inputs, earnings: e.target.value })}
  //         />

  //         <Select
  //           label="Year"
  //           placeholder="Year"
  //           data={years.map((year) => ({ value: year, label: year }))}
  //           value={inputs.year}
  //           onChange={(value) => setInputs({ ...inputs, year: value })}
  //         />

  //         <Select
  //           label="Month"
  //           placeholder="Month"
  //           data={months.map((month) => ({ value: month, label: month }))}
  //           value={inputs.month}
  //           onChange={(value) => setInputs({ ...inputs, month: value })}
  //         />
  //       </div>

  //       <TextInput
  //         label="Title"
  //         placeholder="Title"
  //         required
  //         value={inputs.title}
  //         onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
  //       />

  //       <div className="flex justify-end">
  //         <Button
  //           type="submit"
  //           color="blue"
  //           leftIcon={<Save />}
  //           disabled={isLoading}
  //         >
  //           {isLoading ? <LoadingOverlay visible /> : "Save"}
  //         </Button>
  //       </div>
  //     </form>

  //     <h1 className="font-medium text-gray-800 mb-1 mt-6">Report:</h1>
  //     <Divider className="mb-4" />

  //     <div className="overflow-x-auto">
  //       <Table>
  //         <thead>
  //           <tr>
  //             <th>Title</th>
  //             <th>Patent Number</th>
  //             <th>Status</th>
  //             <th>Earnings</th>
  //             <th>Year</th>
  //             <th>Month</th>
  //             <th>Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {tableData.length > 0 ? (
  //             tableData.map((project) => (
  //               <tr key={project.id}>
  //                 <td>{project.title}</td>
  //                 <td>{project.p_no}</td>
  //                 <td>{project.status}</td>
  //                 <td>{project.earnings}</td>
  //                 <td>{project.p_year}</td>
  //                 <td>{project.a_month}</td>
  //                 <td>
  //                   <Button
  //                     variant="subtle"
  //                     color="blue"
  //                     onClick={() => handleEdit(project)}
  //                     leftIcon={<Edit />}
  //                   >
  //                     Edit
  //                   </Button>
  //                   <Button
  //                     variant="subtle"
  //                     color="red"
  //                     onClick={() => handleDelete(project.id)}
  //                     leftIcon={<Trash />}
  //                   >
  //                     Delete
  //                   </Button>
  //                 </td>
  //               </tr>
  //             ))
  //           ) : (
  //             <tr>
  //               <td colSpan="7" className="text-center">No projects found.</td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </Table>
  //     </div>
  //   </div>
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
            Add a Patent
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Patent Number"
                  placeholder="Patent Number"
                  value={inputs.pi}
                  onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Status"
                  placeholder="Select status"
                  data={[
                    { value: "filed", label: "Filed" },
                    { value: "granted", label: "Granted" },
                    { value: "published", label: "Published" },
                    { value: "owned", label: "Owned" },
                  ]}
                  value={inputs.status}
                  onChange={(value) =>
                    setInputs({ ...inputs, status: value || "" })
                  }
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  required
                  label="Earnings (in Rs.)"
                  placeholder="Earnings"
                  value={inputs.financial_outlay}
                  onChange={(e) =>
                    setInputs({ ...inputs, financial_outlay: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <DatePickerInput
                  label="Start Date"
                  placeholder="Select date"
                  value={inputs.start_date}
                  onChange={(date) =>
                    setInputs({ ...inputs, start_date: date })
                  }
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <DatePickerInput
                  label="Expected Finish Date"
                  placeholder="Select date"
                  value={inputs.finish_date}
                  onChange={(date) =>
                    setInputs({ ...inputs, finish_date: date })
                  }
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
                />
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
                <th>Title</th>
                <th>Patent Number</th>
                <th>Earnings</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Expected Finish Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.pi}</td>
                  <td>{project.co_pi}</td>
                  <td>{project.funding_agency}</td>
                  <td>{project.status}</td>
                  <td>{project.date_submission?.toLocaleDateString()}</td>
                  <td>{project.start_date?.toLocaleDateString()}</td>
                  <td>{project.finish_date?.toLocaleDateString()}</td>
                  <td>{project.financial_outlay}</td>
                  <td>
                    <ActionIcon
                      color="blue"
                      onClick={() => handleEdit(project)}
                    >
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
