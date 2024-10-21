import { useState } from "react";
// import { Save } from "lucide-react";
import axios from "axios";
import {
  MantineProvider,
  Container,
  Paper,
  Title,
  Grid,
  TextInput,
  Select,
  Button,
  Table,
  ActionIcon,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FloppyDisk, PencilSimple, Trash } from "@phosphor-icons/react";

export default function ExpertLecturesForm() {
  const [inputs, setInputs] = useState({
    presentationType: "",
    place: "",
    date: "",
    title: "",
  });
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   // Fetch the existing lectures when the component mounts
  //   useEffect(() => {
  //     const fetchLectures = async () => {
  //       try {
  //         const res = await axios.get('/lectures');
  //         setLectures(res.data); // Assuming the response contains an array of lectures
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchLectures();
  //   }, []); // Empty dependency array ensures it only runs once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("/lecture_insert", inputs);
      console.log(res.data);

      // Add the new entry to the lectures array instead of fetching it again
      setLectures((prevLectures) => [
        ...prevLectures,
        { ...inputs, id: res.data.id }, // Assuming the response contains the new entry's ID
      ]);

      // Clear the input fields
      setInputs({
        presentationType: "",
        place: "",
        date: "",
        title: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // return (
  //   <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
  //     <h1 className="text-lg font-medium text-gray-800 mb-1">Add a Expert Lecture/Invited Talk</h1>
  //     <hr />
  //     <form className="space-y-6 my-5" onSubmit={handleSubmit}>
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //         <div>
  //           <label htmlFor="presentationType" className="block text-sm font-medium text-gray-700">Presentation Type</label>
  //           <select
  //             id="presentationType"
  //             required
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
  //             value={inputs.presentationType}
  //             onChange={(e) => setInputs({ ...inputs, presentationType: e.target.value })}
  //           >
  //             <option value="">Select Presentation Type</option>
  //             <option value="Expert Lecture">Expert Lecture</option>
  //             <option value="Invited Talk">Invited Talk</option>
  //             {/* Add more options if needed */}
  //           </select>
  //         </div>

  //         <div>
  //           <label htmlFor="place" className="block text-sm font-medium text-gray-700">Place</label>
  //           <input
  //             type="text"
  //             required
  //             id="place"
  //             placeholder="Place"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
  //             value={inputs.place}
  //             onChange={(e) => setInputs({ ...inputs, place: e.target.value })}
  //           />
  //         </div>

  //         <div>
  //           <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
  //           <input
  //             type="date"
  //             required
  //             id="date"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
  //             value={inputs.date}
  //             onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
  //           />
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
  //       </div>

  //       <button
  //         type="submit"
  //         className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
  //         disabled={isLoading}
  //       >
  //         {isLoading ? 'Saving...' : 'Save'}
  //       </button>
  //     </form>

  //     {/* Display the list of lectures */}
  //     <h2 className="text-lg font-medium text-gray-800 mb-2">Report:</h2>
  //     <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-md">
  //       <thead className="bg-gray-100">
  //         <tr>
  //           <th className="py-2 px-4 border-b">Sr.</th>
  //           <th className="py-2 px-4 border-b">Presented</th>
  //           <th className="py-2 px-4 border-b">Title</th>
  //           <th className="py-2 px-4 border-b">Place</th>
  //           <th className="py-2 px-4 border-b">Date</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {lectures.map((lecture, index) => (
  //           <tr key={lecture.id}>
  //             <td className="py-2 px-4 border-b">{index + 1}</td>
  //             <td className="py-2 px-4 border-b">{lecture.presentationType}</td>
  //             <td className="py-2 px-4 border-b">{lecture.title}</td>
  //             <td className="py-2 px-4 border-b">{lecture.place}</td>
  //             <td className="py-2 px-4 border-b">{lecture.date}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
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
  //           Add a Expert Lecture/Invited Talk
  //         </Title>
  //         <form onSubmit={handleSubmit}>
  //           <Grid>
  //             <Grid.Col span={4}>
  //               <Select
  //                 label="Presentation Type"
  //                 placeholder="Select Presentation Type"
  //                 data={[
  //                   { value: "Expert Lectures", label: "Expert Lectures" },
  //                   { value: "Invited Talks", label: "Invited Talks" },
  //                 ]}
  //                 value={inputs.presentationType}
  //                 onChange={(value) =>
  //                   setInputs({ ...inputs, presentationType: value || "" })
  //                 }
  //                 required
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={4}>
  //               <TextInput
  //                 label="Place"
  //                 placeholder="Place"
  //                 value={inputs.place}
  //                 onChange={(e) =>
  //                   setInputs({ ...inputs, place: e.target.value })
  //                 }
  //                 required
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={4}>
  //               <DateInput
  //                 label="Date"
  //                 placeholder="Select date"
  //                 value={inputs.date}
  //                 onChange={(value) => setInputs({ ...inputs, date: value })}
  //                 required
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={12}>
  //               <TextInput
  //                 label="Title"
  //                 placeholder="Title"
  //                 value={inputs.title}
  //                 onChange={(e) =>
  //                   setInputs({ ...inputs, title: e.target.value })
  //                 }
  //                 required
  //               />
  //             </Grid.Col>
  //             <Grid.Col
  //               span={12}
  //               style={{ display: "flex", justifyContent: "flex-end" }}
  //             >
  //               <Button
  //                 type="submit"
  //                 loading={isLoading}
  //                 leftIcon={<FloppyDisk size={16} />}
  //               >
  //                 Save
  //               </Button>
  //             </Grid.Col>
  //           </Grid>
  //         </form>
  //       </Paper>

  //       <Paper mt="xl" p="md" withBorder>
  //         <Title order={3} mb="sm">
  //           Report:
  //         </Title>
  //         <div style={{ overflowX: "auto", maxHeight: "400px" }}>
  //           {lectures.length === 0 ? (
  //             <p>No Lectures/Talks Recorded Yet</p>
  //           ) : (
  //             <Table striped highlightOnHover>
  //               <thead>
  //                 <tr>
  //                   <th>Sr.</th>
  //                   <th>Presented</th>
  //                   <th>Title</th>
  //                   <th>Place</th>
  //                   <th>Date</th>
  //                   <th>Action</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {lectures.map((lecture, index) => (
  //                   <tr key={index}>
  //                     <td>{index + 1}</td>
  //                     <td>{lecture.presentationType}</td>
  //                     <td>{lecture.title}</td>
  //                     <td>{lecture.place}</td>
  //                     <td>
  //                       {lecture.date instanceof Date
  //                         ? lecture.date.toLocaleDateString()
  //                         : ""}
  //                     </td>
  //                     <td>
  //                       <Button
  //                         variant="subtle"
  //                         color="red"
  //                         compact
  //                         leftIcon={<Trash size={14} />}
  //                         onClick={() => handleDelete(index)}
  //                       >
  //                         Delete
  //                       </Button>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </Table>
  //           )}
  //         </div>
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
            Add an Expert Lecture/Invited Talk
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={4}>
                <Select
                  label="Presentation Type"
                  placeholder="Select Presentation Type"
                  data={[
                    { value: "Expert Lectures", label: "Expert Lectures" },
                    { value: "Invited Talks", label: "Invited Talks" },
                  ]}
                  value={inputs.presentationType}
                  onChange={(value) =>
                    setInputs({ ...inputs, presentationType: value || "" })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Place"
                  placeholder="Place"
                  value={inputs.place}
                  onChange={(e) =>
                    setInputs({ ...inputs, place: e.target.value })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <DateInput
                  label="Date"
                  placeholder="Select date"
                  value={inputs.date}
                  onChange={(value) => setInputs({ ...inputs, date: value })}
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Title"
                  placeholder="Title"
                  value={inputs.title}
                  onChange={(e) =>
                    setInputs({ ...inputs, title: e.target.value })
                  }
                  required
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
          <Title order={3} mb="sm">
            Report:
          </Title>
          <Table>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Presented</th>
                <th>Title</th>
                <th>Place</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lectures.length === 0 ? (
                <tr>
                  <td colSpan={6}>No Lectures/Talks Recorded Yet</td>
                </tr>
              ) : (
                lectures.map((lecture, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{lecture.presentationType}</td>
                    <td>{lecture.title}</td>
                    <td>{lecture.place}</td>
                    <td>
                      {lecture.date instanceof Date
                        ? lecture.date.toLocaleDateString()
                        : ""}
                    </td>
                    <td>
                      <ActionIcon
                        color="blue"
                        onClick={() => console.log("Edit", lecture)}
                      >
                        <PencilSimple size={16} />
                      </ActionIcon>
                      {/* <ActionIcon
                        color="red"
                        onClick={() => handleDelete(index)}
                      > */}
                      <ActionIcon color="red">
                        <Trash size={16} />
                      </ActionIcon>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Paper>
      </Container>
    </MantineProvider>
  );
}
