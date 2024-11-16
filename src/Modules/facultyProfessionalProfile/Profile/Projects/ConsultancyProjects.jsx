// import { useState, useEffect } from "react";

// import {
//   MantineProvider,
//   Container,
//   Title,
//   Paper,
//   Grid,
//   TextInput,
//   Button,
//   Table,
//   ActionIcon,
// } from "@mantine/core";
// import { DatePickerInput } from "@mantine/dates";
// import { FloppyDisk, PencilSimple, Trash } from "@phosphor-icons/react";

// import axios from "axios";

// export default function ConsultancyProjects() {
//   const [inputs, setInputs] = useState({
//     consultant: "",
//     client: "",
//     financialOutlay: "",
//     startDate: "",
//     endDate: "",
//     title: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [tableData, setTableData] = useState([]);
//   const [, setError] = useState(null); // For error handling
//   const [isEdit, setEdit] = useState(false);
//   const [Id, setId] = useState(0);

//   // Function to fetch Consultancy Projects from the backend
//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/eis/consultancy_projects/pf_no/",
//       );
//       const projects = response.data;
//       // Sort projects by submission date in descending order
//       const sortedProjects = projects.sort(
//         (a, b) => new Date(b.submission_date) - new Date(a.submission_date),
//       );
//       setTableData(sortedProjects);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       setError("Failed to fetch projects. Please try again later."); // Set error message
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append("user_id", 5318);
//       formData.append("consultants", inputs.consultant);
//       formData.append("client", inputs.client);
//       formData.append("start", inputs.startDate);
//       formData.append("end", inputs.endDate);
//       formData.append("financial_outlay", Number(inputs.financialOutlay)); // Parse to number
//       formData.append("title", inputs.title);

//       if (isEdit === false) {
//         const res = await axios.post(
//           "http://127.0.0.1:8000/eis/consult_insert/",
//           formData,
//         );
//         console.log(res.data);
//       } else {
//         formData.append("consultancy_id", Id);
//         const res = await axios.post(
//           "http://127.0.0.1:8000/eis/consult_insert/",
//           formData,
//         );
//         console.log(res.data);
//         setEdit(false);
//         setId(0);
//       }

//       // Fetch updated project list after submission
//       fetchProjects();

//       // Reset the input fields
//       setInputs({
//         consultant: "",
//         client: "",
//         financialOutlay: "",
//         startDate: "",
//         endDate: "",
//         title: "",
//       });
//     } catch (error) {
//       console.error(error);
//       setError("Failed to save project. Please try again."); // Set error message
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (project) => {
//     // Populate the inputs with the project data for editing
//     setInputs({
//       consultant: project.consultants,
//       client: project.client,
//       financialOutlay: project.financial_outlay, // Ensure correct field
//       startDate: project.start_date ? new Date(project.start_date) : null, // Ensure correct field
//       endDate: project.end_date ? new Date(project.end_date) : null, // Ensure correct field
//       title: project.title,
//     });

//     setId(project.id);
//     setEdit(true);
//   };

//   const handleDelete = async (projectId) => {
//     console.log(projectId);
//     if (window.confirm("Are you sure you want to delete this project?")) {
//       try {
//         await axios.post(
//           `http://127.0.0.1:8000/eis/emp_consultancy_projectsDelete/`,
//           new URLSearchParams({ pk: projectId }),
//         ); // Adjust the delete URL as needed
//         fetchProjects(); // Refresh the project list after deletion
//       } catch (error) {
//         console.error("Error deleting project:", error);
//       }
//     }
//   };

//   // return (
//   //   <div className="bg-white p-6 rounded-lg shadow-inner w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
//   //     <h1 className="text-lg font-medium text-gray-800 mb-1">Add a Consultancy Project</h1>
//   //     <hr />
//   //     <form className="space-y-6 my-5" onSubmit={handleSubmit}>
//   //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//   //         <div>
//   //           <label htmlFor="consultant" className="block text-sm font-medium text-gray-700">Consultant</label>
//   //           <input
//   //             type="text"
//   //             required
//   //             id="consultant"
//   //             placeholder="Consultant"
//   //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//   //             value={inputs.consultant}
//   //             onChange={(e) => setInputs({ ...inputs, consultant: e.target.value })}
//   //           />
//   //         </div>
//   //         <div>
//   //           <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client</label>
//   //           <input
//   //             type="text"
//   //             required
//   //             id="client"
//   //             placeholder="Client"
//   //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//   //             value={inputs.client}
//   //             onChange={(e) => setInputs({ ...inputs, client: e.target.value })}
//   //           />
//   //         </div>
//   //       </div>

//   //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//   //         <div>
//   //           <label htmlFor="financial-outlay" className="block text-sm font-medium text-gray-700">Financial Outlay</label>
//   //           <input
//   //             type="number"
//   //             required
//   //             id="financial-outlay"
//   //             placeholder="Financial Outlay"
//   //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//   //             value={inputs.financialOutlay}
//   //             onChange={(e) => setInputs({ ...inputs, financialOutlay: e.target.value })}
//   //           />
//   //         </div>
//   //         <div>
//   //           <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
//   //           <input
//   //             type="date"
//   //             id="start-date"
//   //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//   //             value={inputs.startDate}
//   //             onChange={(e) => setInputs({ ...inputs, startDate: e.target.value })}
//   //           />
//   //         </div>
//   //         <div>
//   //           <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
//   //           <input
//   //             type="date"
//   //             id="end-date"
//   //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//   //             value={inputs.endDate}
//   //             onChange={(e) => setInputs({ ...inputs, endDate: e.target.value })}
//   //           />
//   //         </div>
//   //       </div>

//   //       <div>
//   //         <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//   //         <input
//   //           type="text"
//   //           required
//   //           id="title"
//   //           placeholder="Title"
//   //           className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//   //           value={inputs.title}
//   //           onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
//   //         />
//   //       </div>

//   //       <div className="flex justify-end">
//   //         <button
//   //           type="submit"
//   //           className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-customSaveButtonColor"
//   //           disabled={isLoading}
//   //         >
//   //           <Save className="w-5 h-5 mr-2" />
//   //           {isLoading ? "Loading..." : "Save"}
//   //         </button>
//   //       </div>
//   //     </form>

//   //     {/* Display error message if exists */}
//   //     {error && <p className="text-red-500">{error}</p>}

//   //     <h1 className="font-medium text-gray-800 mb-1 mt-6">Report:</h1>
//   //     <hr className="mb-4" />

//   //     <div className="overflow-x-auto">
//   //       <table className="min-w-full border border-gray-300">
//   //         <thead>
//   //           <tr>
//   //             <th className="border border-gray-300 p-2">Title</th>
//   //             <th className="border border-gray-300 p-2">Consultant</th>
//   //             <th className="border border-gray-300 p-2">Client</th>
//   //             <th className="border border-gray-300 p-2">Start Date</th>
//   //             <th className="border border-gray-300 p-2">End Date</th>
//   //             <th className="border border-gray-300 p-2">Financial Outlay</th>
//   //             <th className="border border-gray-300 p-2">Actions</th>
//   //           </tr>
//   //         </thead>
//   //         <tbody>
//   //           {tableData.length > 0 ? (
//   //             tableData.map((project) => (
//   //               <tr key={project.id}>
//   //                 <td className="border border-gray-300 p-2">{project.title}</td>
//   //                 <td className="border border-gray-300 p-2">{project.consultants}</td>
//   //                 <td className="border border-gray-300 p-2">{project.client}</td>
//   //                 <td className="border border-gray-300 p-2">{project.start_date}</td>
//   //                 <td className="border border-gray-300 p-2">{project.end_date}</td>
//   //                 <td className="border border-gray-300 p-2">{project.financial_outlay}</td>
//   //                 <td className="border border-gray-300 p-2">
//   //                   <button
//   //                     onClick={() => handleEdit(project)}
//   //                     className="text-blue-500 hover:text-blue-700 mr-2"
//   //                   >
//   //                     <Edit className="inline" /> Edit
//   //                   </button>
//   //                   <button
//   //                     onClick={() => handleDelete(project.id)} // Adjust this to match your project ID field
//   //                     className="text-red-500 hover:text-red-700"
//   //                   >
//   //                     <Trash className="inline" /> Delete
//   //                   </button>
//   //                 </td>
//   //               </tr>
//   //             ))
//   //           ) : (
//   //             <tr>
//   //               <td colSpan="7" className="border border-gray-300 p-2 text-center">No projects found.</td>
//   //             </tr>
//   //           )}
//   //         </tbody>
//   //       </table>
//   //     </div>
//   //   </div>
//   // );

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
//             Add a Consultancy Project
//           </Title>
//           <form onSubmit={handleSubmit}>
//             <Grid gutter="md">
//               <Grid.Col span={6}>
//                 <TextInput
//                   required
//                   label="Consultant"
//                   placeholder="Consultant"
//                   value={inputs.pi}
//                   onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
//                 />
//               </Grid.Col>
//               <Grid.Col span={6}>
//                 <TextInput
//                   required
//                   label="Client"
//                   placeholder="Client"
//                   value={inputs.pi}
//                   onChange={(e) => setInputs({ ...inputs, pi: e.target.value })}
//                 />
//               </Grid.Col>
//               <Grid.Col span={3}>
//                 <TextInput
//                   required
//                   label="Financial Outlay"
//                   placeholder="Financial Outlay"
//                   value={inputs.financialOutlay}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, financial_outlay: e.target.value })
//                   }
//                 />
//               </Grid.Col>
//               <Grid.Col span={4}>
//                 <DatePickerInput
//                   label="Start Date"
//                   placeholder="Select date"
//                   value={inputs.start_date}
//                   onChange={(date) =>
//                     setInputs({ ...inputs, start_date: date })
//                   }
//                   valueFormat="YYYY-MM-DD"
//                 />
//               </Grid.Col>
//               <Grid.Col span={4}>
//                 <DatePickerInput
//                   label="End Date"
//                   placeholder="Select date"
//                   value={inputs.finish_date}
//                   onChange={(date) =>
//                     setInputs({ ...inputs, finish_date: date })
//                   }
//                   valueFormat="YYYY-MM-DD"
//                 />
//               </Grid.Col>
//               <Grid.Col span={12}>
//                 <TextInput
//                   required
//                   label="Title"
//                   placeholder="Project Title"
//                   value={inputs.title}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, title: e.target.value })
//                   }
//                 />
//               </Grid.Col>
//             </Grid>
//             <Button
//               type="submit"
//               mt="md"
//               loading={isLoading}
//               leftIcon={<FloppyDisk size={16} />}
//             >
//               Save
//             </Button>
//           </form>
//         </Paper>

//         <Paper mt="xl" p="md" withBorder>
//           <Table>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Consultant</th>
//                 <th>Client</th>
//                 <th>Start Date</th>
//                 <th>Expected Finish Date</th>
//                 <th>Financial Outlay</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((project) => (
//                 <tr key={project.id}>
//                   <td>{project.title}</td>
//                   <td>{project.pi}</td>
//                   <td>{project.co_pi}</td>
//                   <td>{project.funding_agency}</td>
//                   <td>{project.status}</td>
//                   <td>{project.date_submission}</td>
//                   <td>{project.start_date}</td>
//                   <td>{project.finish_date}</td>
//                   <td>{project.financial_outlay}</td>
//                   <td>
//                     <ActionIcon
//                       color="blue"
//                       onClick={() => handleEdit(project)}
//                     >
//                       <PencilSimple size={16} />
//                     </ActionIcon>
//                     <ActionIcon
//                       color="red"
//                       onClick={() => handleDelete(project.id)}
//                     >
//                       <Trash size={16} />
//                     </ActionIcon>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Paper>
//       </Container>
//     </MantineProvider>
//   );
// }

// import { useState } from "react";
// import { Save, Edit, Trash } from "lucide-react";
// import axios from "axios";

// export default function ConsultancyProjects() {
//   const [inputs, setInputs] = useState({
//     consultant: "",
//     client: "",
//     financialOutlay: "",
//     startDate: "",
//     endDate: "",
//     title: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [tableData, setTableData] = useState([]);

//   // Function to fetch Consultancy_Projects from the backend
//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/FPF/consultancy_projects/pf_no/");
//       const projects = response.data;
//       // Sort projects by submission date in descending order
//       const sortedProjects = projects.sort((a, b) => new Date(b.submission_date) - new Date(a.submission_date));
//       setTableData(sortedProjects);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleSubmit = async (e) => {
//     console.log(inputs);
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       // Make sure to add your backend URL here
//       const formData = new FormData();
//       formData.append("user_id", 5318);
//       formData.append("consultants", inputs.consultant);
//       formData.append("client", inputs.client);
//       formData.append("start_date", inputs.startDate);
//       formData.append("end_date", inputs.endDate);
//       formData.append("financial_outlay", inputs.financialOutlay);
//       formData.append("title", inputs.title);

//       const res = await axios.post("http://127.0.0.1:8000/FPF/consult_insert/", formData);
//       console.log(res.data);

//       // Fetch updated project list after submission
//       fetchProjects();

//       // Reset the input fields
//       setInputs({
//         consultant: "",
//         client: "",
//         financialOutlay: "",
//         startDate: "",
//         endDate: "",
//         title: "",
//       });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (project) => {
//     // Populate the inputs with the project data for editing
//     setInputs({
//       consultant: project.consultant,
//       client: project.client,
//       financialOutlay: project.financialOutlay,
//       startDate: project.startDate,
//       endDate: project.endDate,
//       title: project.title,
//     });
//   };

//   const handleDelete = async (projectId) => {
//     if (window.confirm("Are you sure you want to delete this project?")) {
//       try {
//         await axios.delete(http://127.0.0.1:8000/FPF/project/${projectId}/); // Adjust the delete URL as needed
//         fetchProjects(); // Refresh the project list after deletion
//       } catch (error) {
//         console.error("Error deleting project:", error);
//       }
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-inner w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
//       <h1 className="text-lg font-medium text-gray-800 mb-1">Add a Consultancy Project</h1>
//       <hr />
//       <form className="space-y-6 my-5" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="consultant" className="block text-sm font-medium text-gray-700">Consultant</label>
//             <input
//               type="text"
//               required
//               id="consultant"
//               placeholder="Consultant"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//               value={inputs.consultant}
//               onChange={(e) => setInputs({ ...inputs, consultant: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client</label>
//             <input
//               type="text"
//               required
//               id="client"
//               placeholder="Client"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//               value={inputs.client}
//               onChange={(e) => setInputs({ ...inputs, client: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label htmlFor="financial-outlay" className="block text-sm font-medium text-gray-700">Financial Outlay</label>
//             <input
//               type="number"
//               required
//               id="financial-outlay"
//               placeholder="Financial Outlay"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//               value={inputs.financialOutlay}
//               onChange={(e) => setInputs({ ...inputs, financialOutlay: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="date"
//               id="start-date"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//               value={inputs.startDate}
//               onChange={(e) => setInputs({ ...inputs, startDate: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="date"
//               id="end-date"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//               value={inputs.endDate}
//               onChange={(e) => setInputs({ ...inputs, endDate: e.target.value })}
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//           <input
//             type="text"
//             required
//             id="title"
//             placeholder="Title"
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//             value={inputs.title}
//             onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-customSaveButtonColor"
//             disabled={isLoading}
//           >
//             <Save className="w-5 h-5 mr-2" />
//             {isLoading ? "Loading..." : "Save"}
//           </button>
//         </div>
//       </form>

//       <h1 className="font-medium text-gray-800 mb-1 mt-6">Report:</h1>
//       <hr className="mb-4" />

//       {/* <div className="overflow-x-auto max-h-[400px]">
//         <table className="min-w-full table-auto border-collapse border border-gray-200 text-left">
//           <thead className="sticky top-0 bg-gray-400">
//             <tr className="font-semibold text-gray-800">
//               <th className="border border-gray-300 px-4 py-2">Sr</th>
//               <th className="border border-gray-300 px-4 py-2">Consultant(s)</th>
//               <th className="border border-gray-300 px-4 py-2">Title</th>
//               <th className="border border-gray-300 px-4 py-2">Client</th>
//               <th className="border border-gray-300 px-4 py-2">Financial Outlay</th>
//               <th className="border border-gray-300 px-4 py-2">Period</th>
//               <th className="border border-gray-300 px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.length > 0 ? (
//               tableData.map((data, index) => (
//                 <tr key={index} className={${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200}>
//                   <td className="border border-gray-300 px-4 py-2">{data.id}</td>
//                   <td className="border border-gray-300 px-4 py-2">{data.consultant}</td>
//                   <td className="border border-gray-300 px-4 py-2">{data.title}</td>
//                   <td className="border border-gray-300 px-4 py-2">{data.client}</td>
//                   <td className="border border-gray-300 px-4 py-2">{data.financialOutlay}</td>
//                   <td className="border border-gray-300 px-4 py-2">{data.period}</td>
//                   <td className="border border-gray-300 px-4 py-2 text-left">
//                     <button
//                       className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
//                       onClick={() => handleDelete(data.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center p-4">No Data Available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div> */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">Title</th>
//               <th className="border border-gray-300 p-2">Consultant</th>
//               <th className="border border-gray-300 p-2">Client</th>
//               <th className="border border-gray-300 p-2">Start Date</th>
//               <th className="border border-gray-300 p-2">End Date</th>
//               <th className="border border-gray-300 p-2">Financial Outlay</th>
//               <th className="border border-gray-300 p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((project, index) => (
//               <tr key={index}>
//                 <td className="border border-gray-300 p-2">{project.title}</td>
//                 <td className="border border-gray-300 p-2">{project.consultant}</td>
//                 <td className="border border-gray-300 p-2">{project.client}</td>
//                 <td className="border border-gray-300 p-2">{new Date(project.startDate).toLocaleDateString()}</td>
//                 <td className="border border-gray-300 p-2">{new Date(project.endDate).toLocaleDateString()}</td>
//                 <td className="border border-gray-300 p-2">{project.financial_outlay}</td>
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
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
// import { Save, Edit, Trash } from "lucide-react";
// import { Save, Edit, Trash } from '@phosphor-icons/react'; // Phosphor icons

// import { FloppyDisk, PencilSimple, Trash } from '@phosphor-icons/react';

// import {
//   Button,
//   TextInput,
//   Grid,
//   Paper,
//   Table,
//   ScrollArea,
//   Text,
//   Divider,
//   Loader,
// } from '@mantine/core';

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

import axios from "axios";

export default function ConsultancyProjects() {
  const [inputs, setInputs] = useState({
    consultant: "",
    client: "",
    financialOutlay: "",
    startDate: "",
    endDate: "",
    title: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [, setError] = useState(null); // For error handling
  const [isEdit, setEdit] = useState(false);
  const [Id, setId] = useState(0);

  // Function to fetch Consultancy Projects from the backend
  const fetchProjects = async () => {
    try {
      // const formData = new FormData();
      // formData.append("user_id", 5318);
      const response = await axios.get(
        "http://127.0.0.1:8000/eis/consultancy_projects/pf_no/",
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
      formData.append("consultants", inputs.consultant);
      formData.append("client", inputs.client);
      formData.append("start", inputs.startDate);
      formData.append("end", inputs.endDate);
      formData.append("financial_outlay", Number(inputs.financialOutlay)); // Parse to number
      formData.append("title", inputs.title);

      if (isEdit === false) {
        const res = await axios.post(
          "http://127.0.0.1:8000/eis/consult_insert/",
          formData,
        );
        console.log(res.data);
      } else {
        formData.append("consultancy_id", Id);
        const res = await axios.post(
          "http://127.0.0.1:8000/eis/consult_insert/",
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
        consultant: "",
        client: "",
        financialOutlay: "",
        startDate: "",
        endDate: "",
        title: "",
      });
    } catch (error) {
      console.error(error);
      setError("Failed to save project. Please try again."); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    // Populate the inputs with the project data for editing
    setInputs({
      consultant: project.consultants,
      client: project.client,
      financialOutlay: project.financial_outlay, // Ensure correct field
      startDate: project.start_date ? new Date(project.start_date) : null, // Ensure correct field
      endDate: project.end_date ? new Date(project.end_date) : null, // Ensure correct field
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
          "http://127.0.0.1:8000/eis/emp_consultancy_projectsDelete/",
          new URLSearchParams({ pk: projectId }),
        ); // Adjust the delete URL as needed
        fetchProjects(); // Refresh the project list after deletion
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="2xl" mt="xl">
        <Paper
          shadow="xs"
          p="lg" // Increased padding for a more spacious layout
          withBorder
          style={{ borderLeft: "8px solid #2185d0", backgroundColor: "#f9fafb" }} // Light background for contrast
        >
          <Title order={2} mb="lg" style={{ color: "#2185d0" }}> {/* Consistent color with border */}
            Add a Consultancy Project
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Consultant"
                  placeholder="Consultant"
                  value={inputs.consultant}
                  onChange={(e) => setInputs({ ...inputs, consultant: e.target.value })}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  label="Client"
                  placeholder="Client"
                  value={inputs.client}
                  onChange={(e) => setInputs({ ...inputs, client: e.target.value })}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  required
                  label="Financial Outlay"
                  placeholder="Financial Outlay"
                  value={inputs.financialOutlay}
                  onChange={(e) =>
                    setInputs({ ...inputs, financialOutlay: e.target.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <DatePickerInput
                  label="Start Date"
                  placeholder="Select date"
                  value={inputs.startDate}
                  onChange={(date) =>
                    setInputs({ ...inputs, startDate: date })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <DatePickerInput
                  label="End Date"
                  placeholder="Select date"
                  value={inputs.endDate}
                  onChange={(date) =>
                    setInputs({ ...inputs, endDate: date })
                  }
                  required
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
              <Grid.Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  mt="md"
                  loading={isLoading}
                  leftIcon={<FloppyDisk size={16} />}
                  style={{ backgroundColor: "#2185d0", color: "#fff" }} // Custom button styling
                >
                  Save
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
  
        <Paper mt="xl" p="lg" withBorder shadow="sm" style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
          <Title order={3} mb="lg" style={{ color: "#2185d0" }}> {/* Consistent color with border */}
            Projects Report:
          </Title>
          <Table striped highlightOnHover withBorder style={{ minWidth: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            {["Title", "Consultant", "Client", "Start Date", "End Date", "Financial Outlay", "Actions"].map((header, index) => (
              <th
                key={index}
                style={{
                  textAlign: "center",
                  padding: "12px",
                  color: "#495057",
                  fontWeight: "600",
                  border: "1px solid #dee2e6",
                  backgroundColor: "#f1f3f5",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((project) => (
              <tr key={project.id} style={{ backgroundColor: "#fff" }}>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.title}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.consultants}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.client}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.start_date}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>{project.end_date}</td>
                <td style={{ padding: "12px", textAlign: "center", color: "#0d6efd", fontWeight: "500", border: "1px solid #dee2e6" }}>
                  {project.financial_outlay}
                </td>
                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #dee2e6" }}>
                  <ActionIcon color="blue" onClick={() => handleEdit(project)} variant="light" style={{ marginRight: "8px" }}>
                    <PencilSimple size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDelete(project.id)} variant="light">
                    <Trash size={16} />
                  </ActionIcon>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "20px", color: "#6c757d", border: "1px solid #dee2e6" }}>
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
        </Paper>
      </Container>
    </MantineProvider>
  );
  
}
