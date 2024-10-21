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
import { Books } from "@phosphor-icons/react";

export default function ViewJournal() {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null); // For error handling

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/FPF/journal/pf_no/",
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
  //     <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-8xl border-l-8 border-customSaveButtonColor">
  //         <h1 className="text-lg font-medium text-gray-800 mb-1">PG Thesis</h1>
  //         <hr />
  //         {error && <p className="text-red-500">{error}</p>} {/* Error message display */}

  //         <div className="overflow-x-auto">
  //             <table className="min-w-full border border-gray-300">
  //             <thead>
  //                 <tr>
  //                 <th className="border border-gray-300 p-2">Title</th>
  //                 <th className="border border-gray-300 p-2">Roll Number</th>
  //                 <th className="border border-gray-300 p-2">Name</th>
  //                 <th className="border border-gray-300 p-2">Year</th>
  //                 <th className="border border-gray-300 p-2">Month</th>
  //                 </tr>
  //             </thead>
  //             <tbody>
  //                 {tableData.length > 0 ? (
  //                 tableData.map((project) => (
  //                     <tr key={project.id}>
  //                     <td className="border border-gray-300 p-2">{project.title}</td>
  //                     <td className="border border-gray-300 p-2">{project.rollno}</td>
  //                     <td className="border border-gray-300 p-2">{project.s_name}</td>
  //                     <td className="border border-gray-300 p-2">{project.s_year}</td>
  //                     <td className="border border-gray-300 p-2">{project.a_month}</td>
  //                     </tr>
  //                 ))
  //                 ) : (
  //                 <tr>
  //                     <td colSpan="7" className="border border-gray-300 p-2 text-center">No projects found.</td>
  //                 </tr>
  //                 )}
  //             </tbody>
  //             </table>
  //         </div>
  //     </div>
  // );
  // return (
  //   <MantineProvider withGlobalStyles withNormalizeCSS>
  //     <Container size="xl">
  //       <Paper
  //         shadow="sm"
  //         p="md"
  //         withBorder
  //         style={{ borderLeft: "8px solid #228be6" }}
  //       >
  //         <Title
  //           order={2}
  //           mb="sm"
  //           style={{ display: "flex", alignItems: "center", gap: "10px" }}
  //         >
  //           <Books size={24} />
  //           PG Thesis
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
  //                 <th>Roll Number</th>
  //                 <th>Name</th>
  //                 <th>Year</th>
  //                 <th>Month</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {tableData.length > 0 ? (
  //                 tableData.map((project) => (
  //                   <tr key={project.id}>
  //                     <td>{project.title}</td>
  //                     <td>{project.rollno}</td>
  //                     <td>{project.s_name}</td>
  //                     <td>{project.s_year}</td>
  //                     <td>{project.a_month}</td>
  //                   </tr>
  //                 ))
  //               ) : (
  //                 <tr>
  //                   <td colSpan={5} style={{ textAlign: "center" }}>
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
            <Books size={24} />
            Journals
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
                  <th>Author</th>
                  <th>Co-Author</th>
                  <th>Journal Name</th>
                  <th>Year</th>
                  <th>Title</th>
                  <th>Journal File</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((project) => (
                    <tr key={project.id}>
                      <td>{project.title}</td>
                      <td>{project.rollno}</td>
                      <td>{project.s_name}</td>
                      <td>{project.s_year}</td>
                      <td>{project.a_month}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      No theses found.
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
