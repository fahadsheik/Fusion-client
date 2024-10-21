import { useState, useEffect } from "react";
import axios from "axios";
import {
  MantineProvider,
  Container,
  Paper,
  Title,
  Text,
  Table,
  ScrollArea,
} from "@mantine/core";
import { Briefcase } from "@phosphor-icons/react";

export default function ViewConsultancyProject() {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null); // For error handling

  // Function to fetch Consultancy Projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/FPF/consultancy_projects/pf_no/",
      );
      const projects = response.data;
      // Sort projects by submission date in descending order
      const sortedProjects = projects.sort(
        (a, b) => new Date(b.submission_date) - new Date(a.submission_date),
      );
      setTableData(sortedProjects);
    } catch (e) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects. Please try again later."); // Set error message
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // return (
  //   <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
  //     <h1 className="text-lg font-medium text-gray-800 mb-1">Consultancy Projects</h1>
  //     <hr />

  //     {/* Display error message if exists */}
  //     {error && <p className="text-red-500">{error}</p>}

  //     <div className="overflow-x-auto">
  //       <table className="min-w-full border border-gray-300">
  //         <thead>
  //           <tr>
  //             <th className="border border-gray-300 p-2">Title</th>
  //             <th className="border border-gray-300 p-2">Consultant</th>
  //             <th className="border border-gray-300 p-2">Client</th>
  //             <th className="border border-gray-300 p-2">Start Date</th>
  //             <th className="border border-gray-300 p-2">End Date</th>
  //             <th className="border border-gray-300 p-2">Financial Outlay</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {tableData.length > 0 ? (
  //             tableData.map((project) => (
  //               <tr key={project.id}>
  //                 <td className="border border-gray-300 p-2">{project.title}</td>
  //                 <td className="border border-gray-300 p-2">{project.consultants}</td>
  //                 <td className="border border-gray-300 p-2">{project.client}</td>
  //                 <td className="border border-gray-300 p-2">{new Date(project.start_date).toLocaleDateString()}</td>
  //                 <td className="border border-gray-300 p-2">{new Date(project.end_date).toLocaleDateString()}</td>
  //                 <td className="border border-gray-300 p-2">{project.financial_outlay}</td>
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
  //   <MantineProvider withGlobalStyles withNormalizeCSS>
  //     <Container size="xl" p={0}>
  //       <Paper shadow="sm" p="md" withBorder style={{ borderLeft: '8px solid #228be6', maxWidth: '4910px', width: '100%' }}>
  //         <Title order={2} mb="sm" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  //           <Briefcase size={24} />
  //           Consultancy Projects
  //         </Title>
  //         {error && <Text color="red" mb="sm">{error}</Text>}
  //         <ScrollArea>
  //           <Table striped highlightOnHover style={{ minWidth: '100%' }}>
  //             <thead>
  //               <tr>
  //                 <th>Title</th>
  //                 <th>Consultant</th>
  //                 <th>Client</th>
  //                 <th>Start Date</th>
  //                 <th>End Date</th>
  //                 <th>Financial Outlay</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {tableData.length > 0 ? (
  //                 tableData.map((project) => (
  //                   <tr key={project.id}>
  //                     <td>{project.title}</td>
  //                     <td>{project.consultants}</td>
  //                     <td>{project.client}</td>
  //                     <td>{new Date(project.start_date).toLocaleDateString()}</td>
  //                     <td>{new Date(project.end_date).toLocaleDateString()}</td>
  //                     <td>{project.financial_outlay}</td>
  //                   </tr>
  //                 ))
  //               ) : (
  //                 <tr>
  //                   <td colSpan={6} style={{ textAlign: 'center' }}>No projects found.</td>
  //                 </tr>
  //               )}
  //             </tbody>
  //           </Table>
  //         </ScrollArea>
  //       </Paper>
  //     </Container>
  //   </MantineProvider>
  // );
  // return (
  //   <MantineProvider withGlobalStyles withNormalizeCSS>
  //     <Container size="xl" p={0}>
  //       <Paper
  //         shadow="sm"
  //         p="md"
  //         withBorder
  //         style={{
  //           borderLeft: "8px solid #228be6",
  //           maxWidth: "4910px",
  //           width: "100%",
  //         }}
  //       >
  //         <Title
  //           order={2}
  //           mb="sm"
  //           style={{ display: "flex", alignItems: "center", gap: "10px" }}
  //         >
  //           <Briefcase size={24} />
  //           Consultancy Projects
  //         </Title>
  //         {error && (
  //           <Text color="red" mb="sm">
  //             {error}
  //           </Text>
  //         )}
  //         <ScrollArea>
  //           <Table striped highlightOnHover style={{ minWidth: "100%" }}>
  //             <thead>
  //               <tr>
  //                 <th>Title</th>
  //                 <th>Consultant</th>
  //                 <th>Client</th>
  //                 <th>Start Date</th>
  //                 <th>End Date</th>
  //                 <th>Financial Outlay</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {tableData.length > 0 ? (
  //                 tableData.map((project) => (
  //                   <tr key={project.id}>
  //                     <td>{project.title}</td>
  //                     <td>{project.consultants}</td>
  //                     <td>{project.client}</td>
  //                     <td>
  //                       {new Date(project.start_date).toLocaleDateString()}
  //                     </td>
  //                     <td>{new Date(project.end_date).toLocaleDateString()}</td>
  //                     <td>{project.financial_outlay}</td>
  //                   </tr>
  //                 ))
  //               ) : (
  //                 <tr>
  //                   <td colSpan={6} style={{ textAlign: "center" }}>
  //                     No projects found.
  //                   </td>
  //                 </tr>
  //               )}
  //             </tbody>
  //           </Table>
  //         </ScrollArea>
  //       </Paper>
  //     </Container>
  //   </MantineProvider>
  // );
  // return (
  //   <MantineProvider withGlobalStyles withNormalizeCSS>
  //     <Container size="xl" p={0}>
  //       <Paper
  //         shadow="sm"
  //         p="md"
  //         withBorder
  //         style={{
  //           borderLeft: "8px solid #228be6",
  //           maxWidth: "4910px",
  //           width: "100%",
  //         }}
  //       >
  //         <Title
  //           order={2}
  //           mb="sm"
  //           style={{ display: "flex", alignItems: "center", gap: "10px" }}
  //         >
  //           <Briefcase size={24} />
  //           Consultancy Projects
  //         </Title>
  //         {error && (
  //           <Text color="red" mb="sm">
  //             {error}
  //           </Text>
  //         )}
  //         <ScrollArea>
  //           <Table striped highlightOnHover style={{ minWidth: "100%" }}>
  //             <thead>
  //               <tr>
  //                 <th>Title</th>
  //                 <th>Consultant</th>
  //                 <th>Client</th>
  //                 <th>Start Date</th>
  //                 <th>End Date</th>
  //                 <th>Financial Outlay</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {tableData.length > 0 ? (
  //                 tableData.map((project) => (
  //                   <tr key={project.id}>
  //                     <td>{project.title}</td>
  //                     <td>{project.consultants}</td>
  //                     <td>{project.client}</td>
  //                     <td>{new Date(project.start_date).toLocaleDateString()}</td>
  //                     <td>{new Date(project.end_date).toLocaleDateString()}</td>
  //                     <td>{project.financial_outlay}</td>
  //                   </tr>
  //                 ))
  //               ) : (
  //                 <tr>
  //                   <td colSpan={6} style={{ textAlign: "center" }}>
  //                     No projects found.
  //                   </td>
  //                 </tr>
  //               )}
  //             </tbody>
  //           </Table>
  //         </ScrollArea>
  //       </Paper>
  //     </Container>
  //   </MantineProvider>
  // );
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="xl" mt="xl">
        <Paper
          shadow="sm"
          p="md"
          withBorder
          style={{ borderLeft: "8px solid #228be6" }}
        >
          <Title
            order={2}
            mb="md"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Briefcase size={24} />
            Consultancy Projects
          </Title>
          {error && (
            <Text color="red" mb="sm">
              {error}
            </Text>
          )}
          <ScrollArea>
            <Table striped highlightOnHover style={{ minWidth: "100%" }}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Consultant</th>
                  <th>Client</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Financial Outlay</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((project) => (
                    <tr key={project.id}>
                      <td>{project.title}</td>
                      <td>{project.consultants}</td>
                      <td>{project.client}</td>
                      <td>
                        {new Date(project.start_date).toLocaleDateString()}
                      </td>
                      <td>{new Date(project.end_date).toLocaleDateString()}</td>
                      <td>{project.financial_outlay}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Container>
    </MantineProvider>
  );
}
