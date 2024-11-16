// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   MantineProvider,
//   Container,
//   Paper,
//   Title,
//   Grid,
//   TextInput,
//   Select,
//   Button,
//   Table,
// } from "@mantine/core";
// import { FloppyDisk, Trash, Pencil } from "@phosphor-icons/react";

// export default function Books() {
//   const [inputs, setInputs] = useState({
//     publishType: "",
//     author: "",
//     publisher: "",
//     year: "",
//     title: "",
//   });
//   const [achievements, setAchievements] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null); // For editing

//   // Fetch achievements on component mount
//   useEffect(() => {
//     const fetchAchievements = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/eis/fetch_book");
//         setAchievements(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchAchievements();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       if (editingId) {
//         // Update the book
//         const formData = new FormData();
//         formData.append("user_id", 5318); // Adjust this as needed
//         formData.append("book_p_type", inputs.publishType);
//         formData.append("book_author", inputs.author);
//         formData.append("book_publisher", inputs.publisher);
//         formData.append("book_year", inputs.year);
//         formData.append("book_title", inputs.title);
//         formData.append("bookspk", editingId);
//         await axios.put("http://127.0.0.1:8000/eis/books/edit", formData);
//       } else {
//         // Create a new book
//         const formData = new FormData();
//         formData.append("user_id", 5318); // Adjust this as needed
//         formData.append("book_p_type", inputs.publishType);
//         formData.append("book_author", inputs.author);
//         formData.append("book_publisher", inputs.publisher);
//         formData.append("book_year", inputs.year);
//         formData.append("book_title", inputs.title);
//         await axios.post("http://127.0.0.1:8000/eis/book/", formData);
//       }
//       setInputs({
//         publishType: "",
//         author: "",
//         publisher: "",
//         year: "",
//         title: "",
//       });
//       setEditingId(null); // Reset editing ID
//       // Refresh the list of achievements
//       const res = await axios.get("http://127.0.0.1:8000/eis/fetch_book");
//       setAchievements(res.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (achievement) => {
//     setInputs({
//       publishType: achievement.publishType,
//       author: achievement.author,
//       publisher: achievement.publisher,
//       year: achievement.year,
//       title: achievement.title,
//     });
//     setEditingId(achievement.id); // Store the ID of the book being edited
//   };

//   const years = Array.from({ length: 31 }, (_, i) => (2000 + i).toString());

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
//             {editingId ? "Edit Book/Book Chapter" : "Add a Book/Book Chapter"}
//           </Title>
//           <form onSubmit={handleSubmit}>
//             <Grid>
//               <Grid.Col span={6}>
//                 <Select
//                   label="Publish Type"
//                   placeholder="Select Type"
//                   data={[
//                     { value: "book", label: "Book" },
//                     { value: "monograph", label: "Monograph" },
//                     { value: "book-chapter", label: "Book Chapter" },
//                     { value: "handbook", label: "Handbook" },
//                     { value: "technical-report", label: "Technical Report" },
//                   ]}
//                   value={inputs.publishType}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, publishType: e.target.value || "" })
//                   }
//                   required
//                 />
//               </Grid.Col>
//               <Grid.Col span={6}>
//                 <TextInput
//                   label="Author"
//                   placeholder="Author"
//                   value={inputs.author}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, author: e.target.value })
//                   }
//                   required
//                 />
//               </Grid.Col>
//               <Grid.Col span={6}>
//                 <TextInput
//                   label="Publisher"
//                   placeholder="Publisher"
//                   value={inputs.publisher}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, publisher: e.target.value })
//                   }
//                   required
//                 />
//               </Grid.Col>
//               <Grid.Col span={6}>
//                 <Select
//                   label="Publishing Year"
//                   placeholder="Select Year"
//                   data={years}
//                   value={inputs.year}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, year: e.target.value || "" })
//                   }
//                   required
//                 />
//               </Grid.Col>
//               <Grid.Col span={12}>
//                 <TextInput
//                   label="Title"
//                   placeholder="Title"
//                   value={inputs.title}
//                   onChange={(e) =>
//                     setInputs({ ...inputs, title: e.target.value })
//                   }
//                   required
//                 />
//               </Grid.Col>
//               <Grid.Col
//                 span={12}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//               >
//                 <Button
//                   type="submit"
//                   loading={isLoading}
//                   leftIcon={<FloppyDisk size={16} />}
//                 >
//                   Save
//                 </Button>
//               </Grid.Col>
//             </Grid>
//           </form>
//         </Paper>

//         <Paper mt="xl" p="md" withBorder>
//           <Title order={3} mb="sm">
//             Report:
//           </Title>
//           {achievements.length === 0 ? (
//             <p>No Books Recorded Yet</p>
//           ) : (
//             <Table>
//               <thead>
//                 <tr>
//                   <th>Sr</th>
//                   <th>Title of Book</th>
//                   <th>Authors</th>
//                   <th>Publish Type</th>
//                   <th>Year</th>
//                   <th>Publisher</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {achievements.map((achievement, index) => (
//                   <tr key={achievement.id}>
//                     <td>{index + 1}</td>
//                     <td>{achievement.title}</td>
//                     <td>{achievement.author}</td>
//                     <td>{achievement.publishType}</td>
//                     <td>{achievement.year}</td>
//                     <td>{achievement.publisher}</td>
//                     <td>
//                       <Button
//                         variant="subtle"
//                         color="blue"
//                         leftIcon={<Pencil size={16} />}
//                         onClick={() => handleEdit(achievement)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="subtle"
//                         color="red"
//                         leftIcon={<Trash size={16} />}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </Paper>
//       </Container>
//     </MantineProvider>
//   );
// }

import { useState, useEffect } from "react";
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
} from "@mantine/core";
import { FloppyDisk, Trash, Pencil } from "@phosphor-icons/react";

export default function Books() {
  const [inputs, setInputs] = useState({
    publishType: "",
    author: "",
    publisher: "",
    year: "",
    title: "",
  });
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); // For editing

  const fetchAchievements = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/eis/fetch_book");
      setAchievements(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Fetch achievements on component mount
  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("user_id", 5318); // Adjust this as needed
      formData.append("book_p_type", inputs.publishType);
      formData.append("book_author", inputs.author);
      formData.append("book_publisher", inputs.publisher);
      formData.append("book_year", inputs.year);
      formData.append("book_title", inputs.title);
      if (editingId) {
        // Update the book
        formData.append("bookspk", editingId);
        await axios.post("http://127.0.0.1:8000/eis/books/edit", formData);
      } else {
        // Create a new book
        await axios.post("http://127.0.0.1:8000/eis/book/", formData);
      }
      setInputs({
        publishType: "",
        author: "",
        publisher: "",
        year: "",
        title: "",
      });
      setEditingId(null); // Reset editing ID
      // Refresh the list of achievements
      const res = await axios.get("http://127.0.0.1:8000/eis/fetch_book");
      setAchievements(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (achievement) => {
    setInputs({
      publishType: achievement.p_type,
      author: achievement.authors,
      publisher: achievement.publisher,
      year: achievement.pyear,
      title: achievement.title,
    });
    setEditingId(achievement.id); // Store the ID of the book being edited
  };

  const handleDelete = async (achievement) => {
    if (window.confirm("Are you sure you want to delete this Book?")) {
      try {
        await axios.post(
          "http://127.0.0.1:8000/eis/emp_published_booksDelete/",
          new URLSearchParams({ pk: achievement.id }),
        ); // Adjust the delete URL as needed
        fetchAchievements(); // Refresh the project list after deletion
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  }

  const years = Array.from({ length: 31 }, (_, i) => (2000 + i).toString());

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="2xl" mt="xl">
        <Paper
          shadow="xs"
          p="md"
          withBorder
          style={{ borderLeft: "8px solid #2185d0", backgroundColor: "#f9fafb" }} // Light background for contrast
        >
          <Title order={2} mb="sm" style={{ color: "#2185d0" }}>
            {editingId ? "Edit Book/Book Chapter" : "Add a Book/Book Chapter"}
          </Title>
          <form onSubmit={handleSubmit}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <Select
                  label="Publish Type"
                  placeholder="Select Type"
                  data={[
                    { value: "book", label: "Book" },
                    { value: "monograph", label: "Monograph" },
                    { value: "book-chapter", label: "Book Chapter" },
                    { value: "handbook", label: "Handbook" },
                    { value: "technical-report", label: "Technical Report" },
                  ]}
                  value={inputs.publishType}
                  onChange={(value) =>
                    setInputs({ ...inputs, publishType: value })
                  }
                  required
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Author"
                  placeholder="Author"
                  value={inputs.author}
                  onChange={(e) =>
                    setInputs({ ...inputs, author: e.target.value })
                  }
                  required
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Publisher"
                  placeholder="Publisher"
                  value={inputs.publisher}
                  onChange={(e) =>
                    setInputs({ ...inputs, publisher: e.target.value })
                  }
                  required
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Publishing Year"
                  placeholder="Select Year"
                  data={years}
                  value={inputs.year}
                  onChange={(value) =>
                    setInputs({ ...inputs, year: value })
                  }
                  required
                  style={{ padding: "10px" }} // Consistent padding
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
                  style={{ padding: "10px" }} // Consistent padding
                />
              </Grid.Col>
              <Grid.Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
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
  
        <Paper mt="xl" p="md" withBorder>
          <Title order={3} mb="sm" style={{ color: "#2185d0" }}>
            Report:
          </Title>
          {achievements.length === 0 ? (
            <p>No Books Recorded Yet</p>
          ) : (
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px", color: "#2185d0" }}>Sr</th>
                  <th style={{ textAlign: "left", padding: "10px", color: "#2185d0" }}>Title of Book</th>
                  <th style={{ textAlign: "left", padding: "10px", color: "#2185d0" }}>Authors</th>
                  <th style={{ textAlign: "left", padding: "10px", color: "#2185d0" }}>Publish Type</th>
                  <th style={{ textAlign: "left", padding: "10px", color: "#2185d0" }}>Year</th>
                  <th style={{ textAlign: "left", padding: "10px", color: "#2185d0" }}>Publisher</th>
                  <th style={{ textAlign: "left", padding: "10px", color: "#2185d0" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((achievement, index) => (
                  <tr key={achievement.id}>
                    <td style={{ textAlign: "left", padding: "10px" }}>{index + 1}</td>
                    <td style={{ textAlign: "left", padding: "10px" }}>{achievement.title}</td>
                    <td style={{ textAlign: "left", padding: "10px" }}>{achievement.authors}</td>
                    <td style={{ textAlign: "left", padding: "10px" }}>{achievement.p_type}</td>
                    <td style={{ textAlign: "left", padding: "10px" }}>{achievement.pyear}</td>
                    <td style={{ textAlign: "left", padding: "10px" }}>{achievement.publisher}</td>
                    <td style={{ textAlign: "left", padding: "10px" }}>
                      <Button
                        variant="subtle"
                        color="blue"
                        leftIcon={<Pencil size={16} />}
                        onClick={() => handleEdit(achievement)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="subtle"
                        color="red"
                        leftIcon={<Trash size={16} />}
                        onClick={() => handleDelete(achievement)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Paper>
      </Container>
    </MantineProvider>
  );
  
}
