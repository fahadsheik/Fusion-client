import { useState, useEffect } from "react";
import axios from "axios";
import {
  MantineProvider,
  Container,
  Paper,
  Title,
  Table,
  ScrollArea,
} from "@mantine/core";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function ViewResearchProject() {
  const [tableData, setTableData] = useState([
    {
      title: "AI in Healthcare",
      pi: "Dr. Jane Smith",
      co_pi: "Dr. John Doe",
      funding_agency: "National Science Foundation",
      status: "Ongoing",
      submission_date: "2023-01-15",
      start_date: "2023-03-01",
      expected_finish_date: "2025-02-28",
      financial_outlay: "$500,000",
    },
    {
      title: "Renewable Energy Solutions",
      pi: "Dr. Alex Johnson",
      co_pi: "Dr. Emily Brown",
      funding_agency: "Department of Energy",
      status: "Completed",
      submission_date: "2022-06-10",
      start_date: "2022-09-01",
      expected_finish_date: "2023-08-31",
      financial_outlay: "$750,000",
    },
  ]);

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

  // return (
  //   <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
  //     <h1 className="text-lg font-medium text-gray-800 mb-1">Research Projects</h1>
  //     <hr />

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
  //               <td className="border border-gray-300 p-2">{new Date(project.submission_date).toLocaleDateString()}</td>
  //               <td className="border border-gray-300 p-2">{new Date(project.start_date).toLocaleDateString()}</td>
  //               <td className="border border-gray-300 p-2">{new Date(project.expected_finish_date).toLocaleDateString()}</td>
  //               <td className="border border-gray-300 p-2">{project.financial_outlay}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
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
  //         <Title order={2} mb="sm">
  //           Research Projects
  //         </Title>
  //         <ScrollArea>
  //           <Table striped highlightOnHover style={{ minWidth: "100%" }}>
  //             <thead>
  //               <tr>
  //                 <th>Title</th>
  //                 <th>PI</th>
  //                 <th>Co-PI</th>
  //                 <th>Funding Agency</th>
  //                 <th>Status</th>
  //                 <th>Submission Date</th>
  //                 <th>Start Date</th>
  //                 <th>Expected Finish Date</th>
  //                 <th>Financial Outlay</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {tableData.map((project, index) => (
  //                 <tr key={index}>
  //                   <td>{project.title}</td>
  //                   <td>{project.pi}</td>
  //                   <td>{project.co_pi}</td>
  //                   <td>{project.funding_agency}</td>
  //                   <td>{project.status}</td>
  //                   <td>
  //                     {new Date(project.submission_date).toLocaleDateString()}
  //                   </td>
  //                   <td>{new Date(project.start_date).toLocaleDateString()}</td>
  //                   <td>
  //                     {new Date(
  //                       project.expected_finish_date,
  //                     ).toLocaleDateString()}
  //                   </td>
  //                   <td>{project.financial_outlay}</td>
  //                 </tr>
  //               ))}
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
            <MagnifyingGlass size={24} />
            Research Projects
          </Title>
          <ScrollArea>
            <Table striped highlightOnHover style={{ minWidth: "100%" }}>
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
                </tr>
              </thead>
              <tbody>
                {tableData.map((project, index) => (
                  <tr key={index}>
                    <td>{project.title}</td>
                    <td>{project.pi}</td>
                    <td>{project.co_pi}</td>
                    <td>{project.funding_agency}</td>
                    <td>{project.status}</td>
                    <td>
                      {new Date(project.submission_date).toLocaleDateString()}
                    </td>
                    <td>{new Date(project.start_date).toLocaleDateString()}</td>
                    <td>
                      {new Date(
                        project.expected_finish_date,
                      ).toLocaleDateString()}
                    </td>
                    <td>{project.financial_outlay}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Container>
    </MantineProvider>
  );
}
