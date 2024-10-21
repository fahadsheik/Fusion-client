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
        "http://127.0.0.1:8000/FPF/projects/pf_no/",
      );
      const projects = response.data;
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
          "http://127.0.0.1:8000/FPF/project/",
          formData,
        );
        console.log(res.data);
      } else {
        formData.append("project_id", Id);
        const res = await axios.post(
          "http://127.0.0.1:8000/FPF/project/",
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

  const handleEdit = (project) => {
    // Populate the inputs with the project data for editing
    setInputs({
      pi: project.pi,
      coPi: project.co_pi,
      fundingAgency: project.funding_agency,
      status: project.status,
      submissionDate: project.date_submission,
      startDate: project.start_date,
      expectedFinishDate: project.finish_date,
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
          `http://127.0.0.1:8000/FPF/emp_research_projectsDelete/`,
          new URLSearchParams({ pk: projectId }),
        ); // Adjust the delete URL as needed
        fetchProjects(); // Refresh the project list after deletion
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  // return (
  //   <div className="bg-white p-6 rounded-lg shadow-inner w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
  //     <h1 className="text-lg font-medium text-gray-800 mb-1">Add a Research Project</h1>
  //     <hr />
  //     <form className="space-y-6 my-5" onSubmit={handleSubmit}>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <div>
  //           <label htmlFor="pi" className="block text-sm font-medium text-gray-700">
  //             Project Incharge(PI)
  //           </label>
  //           <input
  //             type="text"
  //             required
  //             id="pi"
  //             placeholder="(PI)"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //             value={inputs.pi}
  //             onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="copi" className="block text-sm font-medium text-gray-700">
  //             Co-Project Incharge(CO-PI)
  //           </label>
  //           <input
  //             type="text"
  //             required
  //             id="copi"
  //             placeholder="(CO-PI)"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //             value={inputs.coPi}
  //             onChange={(e) => setInputs({ ...inputs, coPi: e.target.value })}
  //           />
  //         </div>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <div>
  //           <label htmlFor="funding-agency" className="block text-sm font-medium text-gray-700">
  //             Funding Agency
  //           </label>
  //           <input
  //             type="text"
  //             required
  //             id="funding-agency"
  //             placeholder="Funding Agency"
  //             value={inputs.fundingAgency}
  //             onChange={(e) => setInputs({ ...inputs, fundingAgency: e.target.value })}
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="status" className="block text-sm font-medium text-gray-700 ml-1">
  //             Status
  //           </label>
  //           <select
  //             id="status"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //             value={inputs.status}
  //             onChange={(e) => setInputs({ ...inputs, status: e.target.value })}
  //           >
  //             <option value="" disabled>
  //               Status
  //             </option>
  //             <option value="ongoing">Ongoing</option>
  //             <option value="completed">Completed</option>
  //           </select>
  //         </div>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  //         <div>
  //           <label htmlFor="submission-date" className="block text-sm font-medium text-gray-700">
  //             Submission Date
  //           </label>
  //           <input
  //             type="date"
  //             id="submission-date"
  //             value={inputs.submissionDate}
  //             onChange={(e) => setInputs({ ...inputs, submissionDate: e.target.value })}
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
  //             Start Date
  //           </label>
  //           <input
  //             type="date"
  //             id="start-date"
  //             value={inputs.startDate}
  //             onChange={(e) => setInputs({ ...inputs, startDate: e.target.value })}
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="expected-finish-date" className="block text-sm font-medium text-gray-700">
  //             Expected Finish Date
  //           </label>
  //           <input
  //             type="date"
  //             id="expected-finish-date"
  //             value={inputs.expectedFinishDate}
  //             onChange={(e) => setInputs({ ...inputs, expectedFinishDate: e.target.value })}
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="financial-outlay" className="block text-sm font-medium text-gray-700">
  //             Financial Outlay
  //           </label>
  //           <input
  //             type="text"
  //             required
  //             id="financial-outlay"
  //             placeholder="Financial Outlay"
  //             value={inputs.financialOutlay}
  //             onChange={(e) => setInputs({ ...inputs, financialOutlay: e.target.value })}
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
  //           className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-customSaveButtonColor hover:bg-customSaveButtonColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //           disabled={isLoading}
  //         >
  //           {isLoading ? <span>Loading...</span> : <Save className="mr-2" />} Save
  //         </button>
  //       </div>
  //     </form>

  //     <div className="overflow-x-auto">
  //       <table className="min-w-full border border-gray-300">
  //         <thead>
  //           <tr>
  //             <th className="border border-gray-300 p-2">Title</th>
  //             <th className="border border-gray-300 p-2">PI</th>
  //             <th className="border border-gray-300 p-2">Co-PI</th>
  //             <th className="border border-gray-300 p-2">Funding Agency</th>
  //             <th className="border border-gray-300 p-2">Status</th>
  //             <th className="border border-gray-300 p-2">Submission Date</th>
  //             <th className="border border-gray-300 p-2">Start Date</th>
  //             <th className="border border-gray-300 p-2">Expected Finish Date</th>
  //             <th className="border border-gray-300 p-2">Financial Outlay</th>
  //             <th className="border border-gray-300 p-2">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {tableData.map((project, index) => (
  //             <tr key={index}>
  //               <td className="border border-gray-300 p-2">{project.title}</td>
  //               <td className="border border-gray-300 p-2">{project.pi}</td>
  //               <td className="border border-gray-300 p-2">{project.co_pi}</td>
  //               <td className="border border-gray-300 p-2">{project.funding_agency}</td>
  //               <td className="border border-gray-300 p-2">{project.status}</td>
  //               <td className="border border-gray-300 p-2">{project.date_submission}</td>
  //               <td className="border border-gray-300 p-2">{project.start_date}</td>
  //               <td className="border border-gray-300 p-2">{project.finish_date}</td>
  //               <td className="border border-gray-300 p-2">{project.financial_outlay}</td>
  //               <td className="border border-gray-300 p-2">
  //                 <button
  //                   onClick={() => handleEdit(project)}
  //                   className="text-blue-500 hover:text-blue-700 mr-2"
  //                 >
  //                   <Edit className="inline" /> Edit
  //                 </button>
  //                 <button
  //                   onClick={() => handleDelete(project.id)} // Adjust this to match your project ID field
  //                   className="text-red-500 hover:text-red-700"
  //                 >
  //                   <Trash className="inline" /> Delete
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
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
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Co-Project Incharge (CO-PI)"
                  placeholder="(CO-PI)"
                  value={inputs.co_pi}
                  onChange={(e) =>
                    setInputs({ ...inputs, co_pi: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Funding Agency"
                  placeholder="Funding Agency"
                  value={inputs.funding_agency}
                  onChange={(e) =>
                    setInputs({ ...inputs, funding_agency: e.target.value })
                  }
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
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <DatePickerInput
                  label="Submission Date"
                  placeholder="Select date"
                  value={inputs.date_submission}
                  onChange={(date) =>
                    setInputs({ ...inputs, date_submission: date })
                  }
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <DatePickerInput
                  label="Start Date"
                  placeholder="Select date"
                  value={inputs.start_date}
                  onChange={(date) =>
                    setInputs({ ...inputs, start_date: date })
                  }
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <DatePickerInput
                  label="Expected Finish Date"
                  placeholder="Select date"
                  value={inputs.finish_date}
                  onChange={(date) =>
                    setInputs({ ...inputs, finish_date: date })
                  }
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  required
                  label="Financial Outlay"
                  placeholder="Financial Outlay"
                  value={inputs.financial_outlay}
                  onChange={(e) =>
                    setInputs({ ...inputs, financial_outlay: e.target.value })
                  }
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
                <th>PI</th>
                <th>Co-PI</th>
                <th>Funding Agency</th>
                <th>Status</th>
                <th>Submission Date</th>
                <th>Start Date</th>
                <th>Expected Finish Date</th>
                <th>Financial Outlay</th>
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
