// import { useState, useEffect } from 'react'
// import { Save, Edit, Trash } from 'lucide-react'
// import axios from 'axios'

// export default function ConferenceSymposium() {
//   const [inputs, setInputs] = useState({
//     role: '',
//     venue: '',
//     startDate: '',
//     endDate: '',
//     conferenceName: '',
//   })

//   const [isLoading, setIsLoading] = useState(false)
//   const [tableData, setTableData] = useState([]);
//   const [error, setError] = useState(null); // For error handling
//   const [isEdit, setEdit] = useState(false);
//   const [Id, setId] = useState(0);

//   // Fetch projects from the backend
//   const fetchProjects = async () => {
//     try {
//         const response = await axios.get("http://127.0.0.1:8000/FPF/consym/pf_no/");
//         const projects = response.data;
//         // Sort projects by submission date in descending order
//         const sortedProjects = projects.sort((a, b) => new Date(b.submission_date) - new Date(a.submission_date));
//         setTableData(sortedProjects);
//     } catch (error) {
//         console.error("Error fetching projects:", error);
//         setError("Failed to fetch projects. Please try again later."); // Set error message
//     }
// };

// useEffect(() => {
//     fetchProjects();
// }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       setIsLoading(true);

//       const formData = new FormData();
//       formData.append("user_id", 5318);
//       formData.append("conference_name", inputs.conferenceName);
//       formData.append("conference_venue", inputs.venue);
//       formData.append("conference_role", inputs.role);
//       formData.append("conference_start_date", inputs.startDate);
//       formData.append("conference_end_date", inputs.endDate);

//       if(isEdit == false)
//       {
//           const res = await axios.post("http://127.0.0.1:8000/FPF/consym/", formData);
//           console.log(res.data);
//       }
//       else
//       {
//           formData.append("conferencepk2", Id);
//           const res = await axios.post("http://127.0.0.1:8000/FPF/consym/edit", formData);
//           console.log(res.data);
//           setEdit(false);
//           setId(0);
//       }

//       // fetchConferences() // Refresh the list of conferences

//       // Fetch updated project list after submission
//       fetchProjects();

//       // Reset the input fields
//       setInputs({
//         role: '',
//         venue: '',
//         startDate: '',
//         endDate: '',
//         conferenceName: '',
//       });

//     } catch (error) {
//       console.error(error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleEdit = (project) => {
//     // Populate the inputs with the project data for editing
//     setInputs({
//       role: project.role1,
//       venue: project.venue,
//       startDate: project.start_date,
//       endDate: project.end_date,
//       conferenceName: project.name,
//     });

//     setId(project.id);
//     setEdit(true);
//   };

//   const handleDelete = async (projectId) => {
//     console.log(projectId)
//     if (window.confirm("Are you sure you want to delete this Conference/Synopsium?")) {
//       try {
//         await axios.post(`http://127.0.0.1:8000/FPF/emp_consymDelete/`, new URLSearchParams({"pk": projectId})); // Adjust the delete URL as needed
//         fetchProjects(); // Refresh the project list after deletion
//       } catch (error) {
//         console.error("Error deleting project:", error);
//       }
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
//       <h1 className="text-lg font-medium text-gray-800 mb-1">Add a Conference/Symposium</h1>
//       <hr />
//       <form className="space-y-6 my-5" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
//             <input
//               type="text"
//               required
//               id="role"
//               placeholder="Role"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
//               value={inputs.role}
//               onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue</label>
//             <input
//               type="text"
//               required
//               id="venue"
//               placeholder="Venue"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
//               value={inputs.venue}
//               onChange={(e) => setInputs({ ...inputs, venue: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="date"
//               id="startDate"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
//               value={inputs.startDate}
//               onChange={(e) => setInputs({ ...inputs, startDate: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               id="endDate"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
//               value={inputs.endDate}
//               onChange={(e) => setInputs({ ...inputs, endDate: e.target.value })}
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="conferenceName" className="block text-sm font-medium text-gray-700">Conference Name</label>
//           <input
//             type="text"
//             required
//             id="conferenceName"
//             placeholder="Conference Name"
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-light-blue-400"
//             value={inputs.conferenceName}
//             onChange={(e) => setInputs({ ...inputs, conferenceName: e.target.value })}
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-customSaveButtonColor hover:bg-customSaveButtonColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-customSaveButtonColor"
//             disabled={isLoading}
//           >
//             <Save className="w-5 h-5 mr-2" />
//             {isLoading ? 'Loading...' : 'Save'}
//           </button>
//         </div>
//       </form>

//       <h1 className="font-medium text-gray-800 mb-1 mt-6">Report:</h1>
//       <hr className="mb-4" />

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead>
//               <tr>
//               <th className="border border-gray-300 p-2">Conference Name</th>
//               <th className="border border-gray-300 p-2">Venue</th>
//               <th className="border border-gray-300 p-2">Role</th>
//               <th className="border border-gray-300 p-2">Start Date</th>
//               <th className="border border-gray-300 p-2">End Date</th>
//               <th className="border border-gray-300 p-2">Actions</th>
//               </tr>
//           </thead>
//           <tbody>
//               {tableData.length > 0 ? (
//               tableData.map((project) => (
//                   <tr key={project.id}>
//                   <td className="border border-gray-300 p-2">{project.name}</td>
//                   <td className="border border-gray-300 p-2">{project.venue}</td>
//                   <td className="border border-gray-300 p-2">{project.role1}</td>
//                   <td className="border border-gray-300 p-2">{project.start_date}</td>
//                   <td className="border border-gray-300 p-2">{project.end_date}</td>
//                   <td className="border border-gray-300 p-2">
//                       <button
//                       onClick={() => handleEdit(project)}
//                       className="text-blue-500 hover:text-blue-700 mr-2"
//                       >
//                       <Edit className="inline" /> Edit
//                       </button>
//                       <button
//                       onClick={() => handleDelete(project.id)} // Adjust this to match your project ID field
//                       className="text-red-500 hover:text-red-700"
//                       >
//                       <Trash className="inline" /> Delete
//                       </button>
//                   </td>
//                   </tr>
//               ))
//               ) : (
//               <tr>
//                   <td colSpan="7" className="border border-gray-300 p-2 text-center">No Visits found.</td>
//               </tr>
//               )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from "react";
// import { Save, Edit, Trash } from 'lucide-react';
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

export default function ConferenceSymposium() {
  const [inputs, setInputs] = useState({
    role: "",
    venue: "",
    startDate: "",
    endDate: "",
    conferenceName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null); // For error handling
  const [isEdit, setEdit] = useState(false);
  const [Id, setId] = useState(0);

  function seeError() {
    console.log(error);
  }

  seeError();
  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/FPF/consym/pf_no/",
      );
      const projects = response.data;
      // Sort projects by submission date in descending order
      const sortedProjects = projects.sort(
        (a, b) => new Date(b.submission_date) - new Date(a.submission_date),
      );
      setTableData(sortedProjects);
    } catch (e) {
      console.error("Error fetching projects:", e);
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
      formData.append("conference_name", inputs.conferenceName);
      formData.append("conference_venue", inputs.venue);
      formData.append("conference_role", inputs.role);
      formData.append("conference_start_date", inputs.startDate);
      formData.append("conference_end_date", inputs.endDate);

      if (isEdit === false) {
        const res = await axios.post(
          "http://127.0.0.1:8000/FPF/consym/",
          formData,
        );
        console.log(res.data);
      } else {
        formData.append("conferencepk2", Id);
        const res = await axios.post(
          "http://127.0.0.1:8000/FPF/consym/edit",
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
        role: "",
        venue: "",
        startDate: "",
        endDate: "",
        conferenceName: "",
      });
    } catch (e1) {
      console.error(e1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    // Populate the inputs with the project data for editing
    setInputs({
      role: project.role1,
      venue: project.venue,
      startDate: project.start_date,
      endDate: project.end_date,
      conferenceName: project.name,
    });

    setId(project.id);
    setEdit(true);
  };

  const handleDelete = async (projectId) => {
    console.log(projectId);
    if (
      window.confirm(
        "Are you sure you want to delete this Conference/Symposium?",
      )
    ) {
      try {
        await axios.post(
          `http://127.0.0.1:8000/FPF/emp_consymDelete/`,
          new URLSearchParams({ pk: projectId }),
        ); // Adjust the delete URL as needed
        fetchProjects(); // Refresh the project list after deletion
      } catch (e2) {
        console.error("Error deleting project:", e2);
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
          style={{ borderLeft: "8px solid #2185d0" }}
        >
          <Title order={2} mb="sm">
            Add a Conference/Synopsium
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Role"
                  placeholder="Role"
                  value={inputs.pi}
                  onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Venue"
                  placeholder="Venue"
                  value={inputs.pi}
                  onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
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
                  label="End Date"
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
                  label="Conference Name"
                  placeholder="Conference Name"
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
                <th>Conference Name</th>
                <th>Venue</th>
                <th>Role</th>
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
