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
import { Chalkboard } from "@phosphor-icons/react";

export default function ViewEvents() {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null); // For error handling

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/FPF/event/pf_no/",
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
  //     <h1 className="text-lg font-medium text-gray-800 mb-1">Workshops / Training Programs</h1>
  //     <hr />

  //     <div className="overflow-x-auto">
  //       <table className="min-w-full border border-gray-300">
  //         <thead>
  //             <tr>
  //             <th className="border border-gray-300 p-2">Name</th>
  //             <th className="border border-gray-300 p-2">Role</th>
  //             <th className="border border-gray-300 p-2">Sponsoring Agency</th>
  //             <th className="border border-gray-300 p-2">Event Type</th>
  //             <th className="border border-gray-300 p-2">Vanue</th>
  //             <th className="border border-gray-300 p-2">Start Date</th>
  //             <th className="border border-gray-300 p-2">End Date</th>
  //             </tr>
  //         </thead>
  //         <tbody>
  //             {tableData.length > 0 ? (
  //             tableData.map((project) => (
  //                 <tr key={project.id}>
  //                 <td className="border border-gray-300 p-2">{project.name}</td>
  //                 <td className="border border-gray-300 p-2">{project.role}</td>
  //                 <td className="border border-gray-300 p-2">{project.sponsoring_agency}</td>
  //                 <td className="border border-gray-300 p-2">{project.type}</td>
  //                 <td className="border border-gray-300 p-2">{project.venue}</td>
  //                 <td className="border border-gray-300 p-2">{project.start_date}</td>
  //                 <td className="border border-gray-300 p-2">{project.end_date}</td>
  //                 </tr>
  //             ))
  //             ) : (
  //             <tr>
  //                 <td colSpan="7" className="border border-gray-300 p-2 text-center">No projects found.</td>
  //             </tr>
  //             )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // )
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {/* <Container size="xl" p={0}>
        <Paper
          shadow="sm"
          p="md"
          withBorder
          style={{
            borderLeft: "8px solid #228be6",
            maxWidth: "4910px",
            width: "100%",
          }}
        > */}
      <Container size="xl" mt="xl">
        <Paper
          shadow="sm"
          p="md"
          withBorder
          style={{ borderLeft: "8px solid #228be6" }}
        >
          <Title
            order={2}
            mb="sm"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Chalkboard size={24} />
            Workshops / Training Programs
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
                  <th>Name</th>
                  <th>Role</th>
                  <th>Sponsoring Agency</th>
                  <th>Event Type</th>
                  <th>Venue</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((project) => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.role}</td>
                      <td>{project.sponsoring_agency}</td>
                      <td>{project.type}</td>
                      <td>{project.venue}</td>
                      <td>{project.start_date}</td>
                      <td>{project.end_date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center" }}>
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
