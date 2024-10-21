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
import { FloppyDisk, PencilSimple, Trash } from "@phosphor-icons/react";

export default function AchievementsForm() {
  const [inputs, setInputs] = useState({
    day: "",
    month: "",
    year: "",
    achievementType: "",
    title: "",
  });
  const [achievements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // function changeAchievements() {
  //   setAchievements(1);
  // }
  // changeAchievements();

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month) => ({ value: month, label: month }));
  const years = Array.from({ length: 50 }, (_, i) => ({
    value: (new Date().getFullYear() - i).toString(),
    label: (new Date().getFullYear() - i).toString(),
  }));
  const achievementTypes = [
    "Award",
    "Publication",
    "Presentation",
    "Other",
  ].map((type) => ({ value: type, label: type }));

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

      const res = await axios.post("/achievement_insert", formData);
      console.log(res.data);

      // fetchAchievements() // Refresh the list of achievements
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchAchievements = async () => {
  //   try {
  //     const res = await axios.get("/achievements");
  //     setAchievements(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // Use useEffect to fetch the achievements not the handleClick event

  // return (
  //   <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
  //     <h1 className="text-lg font-medium text-gray-800 mb-1">Add an Achievement</h1>
  //     <hr />
  //     <form className="space-y-6 my-5" onSubmit={handleSubmit}>
  //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  //         <div>
  //           <label htmlFor="day" className="block text-sm font-medium text-gray-700">Day</label>
  //           <select
  //             id="day"
  //             required
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
  //             value={inputs.day}
  //             onChange={(e) => setInputs({ ...inputs, day: e.target.value })}
  //           >
  //             <option value="">Select Day</option>
  //             {/* Add options for days */}
  //             {Array.from({ length: 31 }, (_, i) => (
  //               <option key={i + 1} value={i + 1}>{i + 1}</option>
  //             ))}
  //           </select>
  //         </div>
  //         <div>
  //           <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
  //           <select
  //             id="month"
  //             required
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
  //             value={inputs.month}
  //             onChange={(e) => setInputs({ ...inputs, month: e.target.value })}
  //           >
  //             <option value="">Select Month</option>
  //             {/* Add options for months */}
  //             {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
  //               <option key={index} value={month}>{month}</option>
  //             ))}
  //           </select>
  //         </div>
  //         <div>
  //           <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
  //           <input
  //             type="number"
  //             required
  //             id="year"
  //             placeholder="Year"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
  //             value={inputs.year}
  //             onChange={(e) => setInputs({ ...inputs, year: e.target.value })}
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="achievementType" className="block text-sm font-medium text-gray-700">Achievement Type</label>
  //           <input
  //             type="text"
  //             required
  //             id="achievementType"
  //             placeholder="Achievement Type"
  //             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
  //             value={inputs.achievementType}
  //             onChange={(e) => setInputs({ ...inputs, achievementType: e.target.value })}
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
  //         <input
  //           type="text"
  //           required
  //           id="title"
  //           placeholder="Title"
  //           className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
  //           value={inputs.title}
  //           onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
  //         />
  //       </div>

  //       <div className="flex justify-end">
  //         <button
  //           type="submit"
  //           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-customSaveButtonColor hover:bg-customSaveButtonColor focus:outline-none"
  //           disabled={isLoading}
  //         >
  //           <Save className="w-5 h-5 mr-2" />
  //           {isLoading ? 'Loading...' : 'Save'}
  //         </button>
  //       </div>
  //     </form>

  //     <h1 className="font-medium text-gray-800 mb-1 mt-6">Report:</h1>
  //     <hr className="mb-4" />

  //     <div className="overflow-x-auto max-h-[400px]">
  //       {achievements.length === 0 ? (
  //         <p className="text-gray-500">No Achievements Recorded Yet</p>
  //       ) : (
  //         <table className="min-w-full table-auto border-collapse border border-gray-200 text-left">
  //           <thead className="sticky top-0 bg-gray-400">
  //             <tr className="font-semibold text-gray-800">
  //               <th className="border border-gray-300 px-4 py-2">Sr</th>
  //               <th className="border border-gray-300 px-4 py-2">Achievement Type</th>
  //               <th className="border border-gray-300 px-4 py-2">Title</th>
  //               <th className="border border-gray-300 px-4 py-2">Date</th>
  //               <th className="border border-gray-300 px-4 py-2">Action</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {achievements.map((achievement, index) => (
  //               <tr
  //                 key={index}
  //                 className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
  //               >
  //                 <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
  //                 <td className="border border-gray-300 px-4 py-2">{achievement.achievementType}</td>
  //                 <td className="border border-gray-300 px-4 py-2">{achievement.title}</td>
  //                 <td className="border border-gray-300 px-4 py-2">
  //                   {achievement.day}/{achievement.month}/{achievement.year}
  //                 </td>
  //                 <td className="border border-gray-300 px-4 py-2 text-left">
  //                   <button className="text-red-600 hover:text-red-900">Delete</button>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       )}
  //     </div>
  //   </div>
  // )
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
  //           Add an Achievement
  //         </Title>
  //         <form onSubmit={handleSubmit}>
  //           <Grid mb="md">
  //             <Grid.Col span={3}>
  //               <Select
  //                 label="Day"
  //                 placeholder="Select Day"
  //                 data={days}
  //                 value={inputs.day}
  //                 onChange={(value) =>
  //                   setInputs({ ...inputs, day: value || "" })
  //                 }
  //                 required
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={3}>
  //               <Select
  //                 label="Month"
  //                 placeholder="Select Month"
  //                 data={months}
  //                 value={inputs.month}
  //                 onChange={(value) =>
  //                   setInputs({ ...inputs, month: value || "" })
  //                 }
  //                 required
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={3}>
  //               <Select
  //                 label="Year"
  //                 placeholder="Select Year"
  //                 data={years}
  //                 value={inputs.year}
  //                 onChange={(value) =>
  //                   setInputs({ ...inputs, year: value || "" })
  //                 }
  //                 required
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={3}>
  //               <Select
  //                 label="Achievement Type"
  //                 placeholder="Select Type"
  //                 data={achievementTypes}
  //                 value={inputs.achievementType}
  //                 onChange={(value) =>
  //                   setInputs({ ...inputs, achievementType: value || "" })
  //                 }
  //                 required
  //               />
  //             </Grid.Col>
  //           </Grid>
  //           <TextInput
  //             label="Title"
  //             placeholder="Title"
  //             value={inputs.title}
  //             onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
  //             required
  //             mb="md"
  //           />
  //           <div style={{ display: "flex", justifyContent: "flex-end" }}>
  //             <Button
  //               type="submit"
  //               loading={isLoading}
  //               leftIcon={<FloppyDisk size={16} />}
  //             >
  //               Save
  //             </Button>
  //           </div>
  //         </form>
  //       </Paper>

  //       <Paper mt="xl" p="md" withBorder>
  //         <Title order={3} mb="sm">
  //           Report:
  //         </Title>
  //         <div style={{ overflowX: "auto", maxHeight: "400px" }}>
  //           {achievements.length === 0 ? (
  //             <p>No Achievements Recorded Yet</p>
  //           ) : (
  //             <Table striped highlightOnHover>
  //               <thead>
  //                 <tr>
  //                   <th>Sr.</th>
  //                   <th>Achievement</th>
  //                   <th>Title</th>
  //                   <th>Day/Month/Year</th>
  //                   <th>Action</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {achievements.map((achievement, index) => (
  //                   <tr key={index}>
  //                     <td>{index + 1}</td>
  //                     <td>{achievement.achievementType}</td>
  //                     <td>{achievement.title}</td>
  //                     <td>{`${achievement.day}/${achievement.month}/${achievement.year}`}</td>
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
            Add an Achievement
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={3}>
                <Select
                  label="Day"
                  placeholder="Select Day"
                  data={days}
                  value={inputs.day}
                  onChange={(value) =>
                    setInputs({ ...inputs, day: value || "" })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label="Month"
                  placeholder="Select Month"
                  data={months}
                  value={inputs.month}
                  onChange={(value) =>
                    setInputs({ ...inputs, month: value || "" })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label="Year"
                  placeholder="Select Year"
                  data={years}
                  value={inputs.year}
                  onChange={(value) =>
                    setInputs({ ...inputs, year: value || "" })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label="Achievement Type"
                  placeholder="Select Type"
                  data={achievementTypes}
                  value={inputs.achievementType}
                  onChange={(value) =>
                    setInputs({ ...inputs, achievementType: value || "" })
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  required
                  label="Title"
                  placeholder="Title"
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
          <Title order={3} mb="sm">
            Report:
          </Title>
          <Table>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Achievement</th>
                <th>Title</th>
                <th>Day/Month/Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {achievements.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Achievements Recorded Yet</td>
                </tr>
              ) : (
                achievements.map((achievement, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{achievement.achievementType}</td>
                    <td>{achievement.title}</td>
                    <td>{`${achievement.day}/${achievement.month}/${achievement.year}`}</td>
                    <td>
                      <ActionIcon
                        color="blue"
                        onClick={() => console.log("Edit", achievement)}
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
