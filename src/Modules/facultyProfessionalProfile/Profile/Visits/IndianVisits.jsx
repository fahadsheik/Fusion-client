import { useState, useEffect } from "react";
// import { Save, Edit, Trash } from 'lucide-react'
import axios from "axios";

import {
  MantineProvider,
  Container,
  Title,
  Paper,
  Grid,
  TextInput,
  Button,
  Table,
  ActionIcon,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { FloppyDisk, PencilSimple, Trash } from "@phosphor-icons/react";

export default function IndianVisits() {
  const [inputs, setInputs] = useState({
    country: "India",
    place: "",
    fromDate: "",
    toDate: "",
    purpose: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [, setError] = useState(null); // For error handling
  const [isEdit, setEdit] = useState(false);
  const [Id, setId] = useState(0);

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/FPF/ivisits/pf_no/",
      );
      const projects = response.data;
      // Sort projects by submission date in descending order
      const sortedProjects = projects.sort(
        (a, b) => new Date(b.submission_date) - new Date(a.submission_date),
      );
      setTableData(sortedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects. Please try again later."); // Set error message
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
      formData.append("country", inputs.country);
      formData.append("place", inputs.place);
      formData.append("purpose", inputs.purpose);
      formData.append("start_date", inputs.fromDate);
      formData.append("end_date", inputs.toDate);

      if (isEdit === false) {
        const res = await axios.post(
          "http://127.0.0.1:8000/FPF/ivisit/",
          formData,
        );
        console.log(res.data);
      } else {
        formData.append("ivisit_id", Id);
        const res = await axios.post(
          "http://127.0.0.1:8000/FPF/ivisit/",
          formData,
        );
        console.log(res.data);
        setEdit(false);
        setId(0);
      }

      // fetchForeignVisits() // Refresh the list of foreign visits

      // Fetch updated project list after submission
      fetchProjects();

      // Reset the input fields
      setInputs({
        country: "India",
        place: "",
        fromDate: "",
        toDate: "",
        purpose: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    // Populate the inputs with the project data for editing
    setInputs({
      country: project.country,
      place: project.place,
      fromDate: project.start_date,
      toDate: project.end_date,
      purpose: project.purpose,
    });

    setId(project.id);
    setEdit(true);
  };

  const handleDelete = async (projectId) => {
    console.log(projectId);
    if (window.confirm("Are you sure you want to delete this Visit?")) {
      try {
        await axios.post(
          `http://127.0.0.1:8000/FPF/emp_visitsDelete/`,
          new URLSearchParams({ pk: projectId }),
        ); // Adjust the delete URL as needed
        fetchProjects(); // Refresh the project list after deletion
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  // return (
  //   <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
  //     <h1 className="text-lg font-medium text-gray-800 mb-1">Add a Indian Visit</h1>
  //     <hr />
  //     <form className="space-y-6 my-5" onSubmit={handleSubmit}>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <div>
  //           <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
  //           <input
  //             type="text"
  //             readOnly
  //             id="country"
  //             placeholder="Country"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
  //             value={inputs.country}
  //             onChange={(e) => setInputs({ ...inputs, country: e.target.value })}
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="place" className="block text-sm font-medium text-gray-700">Place</label>
  //           <input
  //             type="text"
  //             required
  //             id="place"
  //             placeholder="Place"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
  //             value={inputs.place}
  //             onChange={(e) => setInputs({ ...inputs, place: e.target.value })}
  //           />
  //         </div>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <div>
  //           <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From</label>
  //           <input
  //             type="date"
  //             id="fromDate"
  //             placeholder="Start Date"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
  //             value={inputs.fromDate}
  //             onChange={(e) => setInputs({ ...inputs, fromDate: e.target.value })}
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To</label>
  //           <input
  //             type="date"
  //             id="toDate"
  //             placeholder="End Date"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
  //             value={inputs.toDate}
  //             onChange={(e) => setInputs({ ...inputs, toDate: e.target.value })}
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose</label>
  //         <input
  //           type="text"
  //           required
  //           id="purpose"
  //           placeholder="Purpose"
  //           className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
  //           value={inputs.purpose}
  //           onChange={(e) => setInputs({ ...inputs, purpose: e.target.value })}
  //         />
  //       </div>

  //       <div className="flex justify-end">
  //         <button
  //           type="submit"
  //           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-customSaveButtonColor hover:bg-customSaveButtonColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-customSaveButtonColor"
  //           disabled={isLoading}
  //         >
  //           <Save className="w-5 h-5 mr-2" />
  //           {isLoading ? 'Loading...' : 'Save'}
  //         </button>
  //       </div>
  //     </form>

  //     <div className="overflow-x-auto">
  //       <table className="min-w-full border border-gray-300">
  //         <thead>
  //             <tr>
  //             <th className="border border-gray-300 p-2">Country</th>
  //             <th className="border border-gray-300 p-2">Place</th>
  //             <th className="border border-gray-300 p-2">Purpose</th>
  //             <th className="border border-gray-300 p-2">Start Date</th>
  //             <th className="border border-gray-300 p-2">End Date</th>
  //             <th className="border border-gray-300 p-2">Actions</th>
  //             </tr>
  //         </thead>
  //         <tbody>
  //             {tableData.length > 0 ? (
  //             tableData.map((project) => (
  //                 <tr key={project.id}>
  //                 <td className="border border-gray-300 p-2">{project.country}</td>
  //                 <td className="border border-gray-300 p-2">{project.place}</td>
  //                 <td className="border border-gray-300 p-2">{project.purpose}</td>
  //                 <td className="border border-gray-300 p-2">{project.start_date}</td>
  //                 <td className="border border-gray-300 p-2">{project.end_date}</td>
  //                 <td className="border border-gray-300 p-2">
  //                     <button
  //                     onClick={() => handleEdit(project)}
  //                     className="text-blue-500 hover:text-blue-700 mr-2"
  //                     >
  //                     <Edit className="inline" /> Edit
  //                     </button>
  //                     <button
  //                     onClick={() => handleDelete(project.id)} // Adjust this to match your project ID field
  //                     className="text-red-500 hover:text-red-700"
  //                     >
  //                     <Trash className="inline" /> Delete
  //                     </button>
  //                 </td>
  //                 </tr>
  //             ))
  //             ) : (
  //             <tr>
  //                 <td colSpan="7" className="border border-gray-300 p-2 text-center">No Visits found.</td>
  //             </tr>
  //             )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // )

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
            Add a India Visit
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Country"
                  placeholder="Country"
                  value={inputs.pi}
                  onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Place"
                  placeholder="Place"
                  value={inputs.pi}
                  onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DatePickerInput
                  label="From"
                  placeholder="Select date"
                  value={inputs.start_date}
                  onChange={(date) =>
                    setInputs({ ...inputs, start_date: date })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DatePickerInput
                  label="To"
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
                  label="Purpose"
                  placeholder="Purpose"
                  value={inputs.pi}
                  onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
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
                <th>Country</th>
                <th>Place</th>
                <th>Purpose</th>
                <th>Start Date</th>
                <th>End Date</th>
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
