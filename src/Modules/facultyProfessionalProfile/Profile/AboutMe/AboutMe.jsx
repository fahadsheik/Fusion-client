// import React, { useState } from 'react';
// import { MantineProvider, Container, Paper, Title, Button, TextInput, Textarea, Grid } from '@mantine/core';
// import { FloppyDisk, PencilSimple, Phone, EnvelopeSimple, LinkedinLogo, GithubLogo } from '@phosphor-icons/react';

// export default function AboutMePage() {
//   const [inputs, setInputs] = useState({
//     aboutMe: '',
//     dateOfJoining: '',
//     pensionFund: '',
//     education: '',
//     interestAreas: '',
//     contact: '',
//     email: 'atul@iiitdmj.ac.in',
//     linkedIn: '',
//     github: ''
//   });
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [tableData, setTableData] = useState([]);
//   const [, setError] = useState(null); // For error handling
//   const [isEdit, setIsEdit] = useState(false);
//   const [id, setId] = useState(0);
  
//   // Fetch user data from the backend
//   const fetchUserData = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("user_id", 5318); // Adjust this as needed
//       const response = await axios.get("http://127.0.0.1:8000/eis/get_personal_info/", formData);
//       setTableData(response.data); // Assuming response data contains the user data
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to fetch data. Please try again later.");
//     }
//   };
  
//   useEffect(() => {
//     fetchUserData();
//   }, []);
  
//   // Handle form submission (save or update user info)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
  
//       const formData = new FormData();
//       formData.append("user_id", 5318); // Adjust this as needed
//       formData.append("about_me", inputs.aboutMe);
//       formData.append("date_of_joining", inputs.dateOfJoining);
//       formData.append("pension_fund", inputs.pensionFund);
//       formData.append("education", inputs.education);
//       formData.append("interest_areas", inputs.interestAreas);
//       formData.append("contact", inputs.contact);
//       formData.append("email", inputs.email);
//       formData.append("linkedIn", inputs.linkedIn);
//       formData.append("github", inputs.github);
  
//       if (!isEdit) {
//         const res = await axios.post("http://127.0.0.1:8000/eis/persinfo/", formData);
//         console.log(res.data);
//       } else {
//         formData.append("id", id); // Include ID for editing existing data
//         const res = await axios.post(`http://127.0.0.1:8000/eis/persinfo/`, formData);
//         console.log(res.data);
//         setIsEdit(false);
//         setId(0);
//       }
  
//       // Fetch updated data after submission
//       fetchUserData();
  
//       // Reset input fields after submission
//       setInputs({
//         aboutMe: '',
//         dateOfJoining: '',
//         pensionFund: '',
//         education: '',
//         interestAreas: '',
//         contact: '',
//         email: 'atul@iiitdmj.ac.in',
//         linkedIn: '',
//         github: ''
//       });
//     } catch (error) {
//       console.error(error);
//       setError("Failed to submit data. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Handle editing an existing entry
//   const handleEdit = (data) => {
//     // Populate the input fields with the existing data
//     setInputs({
//       aboutMe: data.aboutMe,
//       dateOfJoining: data.dateOfJoining,
//       pensionFund: data.pensionFund,
//       education: data.education,
//       interestAreas: data.interestAreas,
//       contact: data.contact,
//       email: data.email,
//       linkedIn: data.linkedIn,
//       github: data.github
//     });
  
//     setId(data.id);
//     setIsEdit(true);
//   };
  
//   // Handle input change
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setInputs((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   return (
//     <MantineProvider withGlobalStyles withNormalizeCSS>
//       <Container size="md" mt="xl">
//         <Paper shadow="xs" p="md" withBorder style={{ borderLeft: '8px solid #2185d0', marginBottom: '1rem' }}>
//           <Grid align="center">
//             <Grid.Col span={10}>
//               <Title order={2}>Profile</Title>
//             </Grid.Col>
//             <Grid.Col span={1}>
//               <Button variant="filled" color={isEditing ? 'green' : 'blue'} compact onClick={() => setIsEditing(!isEditing)}>
//                 {isEditing ? <FloppyDisk size={16} /> : <PencilSimple size={16} />}
//                 {isEditing ? ' Save' : ' Edit'}
//               </Button>
//             </Grid.Col>
//           </Grid>

//           {/* About Me Section */}
//           <Textarea
//             label="About Me"
//             name="aboutMe"
//             value={formData.aboutMe}
//             onChange={handleInputChange}
//             placeholder="Enter your 'About Me' content here"
//             minRows={4}
//             mt="md"
//             disabled={!isEditing}
//           />

//           {/* Details Section */}
//           <Grid mt="md" gutter="md">
//             <Grid.Col span={6}>
//               <TextInput
//                 label="Date Of Joining"
//                 name="dateOfJoining"
//                 value={formData.dateOfJoining}
//                 onChange={handleInputChange}
//                 placeholder="Select Date"
//                 type="date"
//                 disabled={!isEditing}
//               />
//             </Grid.Col>
//             <Grid.Col span={6}>
//               <TextInput
//                 label="Pension Fund #"
//                 name="pensionFund"
//                 value={formData.pensionFund}
//                 onChange={handleInputChange}
//                 placeholder="Enter Pension Fund #"
//                 disabled={!isEditing}
//               />
//             </Grid.Col>
//             <Grid.Col span={6}>
//               <TextInput
//                 label="Education"
//                 name="education"
//                 value={formData.education}
//                 onChange={handleInputChange}
//                 placeholder="Enter Education details"
//                 disabled={!isEditing}
//               />
//             </Grid.Col>
//             <Grid.Col span={6}>
//               <TextInput
//                 label="Interest Areas"
//                 name="interestAreas"
//                 value={formData.interestAreas}
//                 onChange={handleInputChange}
//                 placeholder="Enter your interest areas"
//                 disabled={!isEditing}
//               />
//             </Grid.Col>
//           </Grid>

//           {/* Contact Details Section */}
//           <Grid mt="md" gutter="md">
//             <Grid.Col span={6}>
//               <TextInput
//                 label="Contact"
//                 name="contact"
//                 value={formData.contact}
//                 onChange={handleInputChange}
//                 placeholder="Enter your contact number"
//                 disabled={!isEditing}
//                 icon={<Phone size={16} />}
//               />
//             </Grid.Col>
//             <Grid.Col span={6}>
//               <TextInput
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter your email"
//                 disabled={!isEditing}
//                 icon={<EnvelopeSimple size={16} />}
//               />
//             </Grid.Col>
//             <Grid.Col span={6}>
//               <TextInput
//                 label="LinkedIn"
//                 name="linkedIn"
//                 value={formData.linkedIn}
//                 onChange={handleInputChange}
//                 placeholder="Enter your LinkedIn profile"
//                 disabled={!isEditing}
//                 icon={<LinkedinLogo size={16} />}
//               />
//             </Grid.Col>
//             <Grid.Col span={6}>
//               <TextInput
//                 label="Github ID"
//                 name="github"
//                 value={formData.github}
//                 onChange={handleInputChange}
//                 placeholder="Enter your Github ID"
//                 disabled={!isEditing}
//                 icon={<GithubLogo size={16} />}
//               />
//             </Grid.Col>
//           </Grid>
//         </Paper>

//         {isEditing && (
//           <Button fullWidth variant="filled" color="green" onClick={handleSaveClick} mt="xl">
//             Save Profile
//           </Button>
//         )}
//       </Container>
//     </MantineProvider>
//   );
// }








import React, { useState, useEffect } from 'react';
import { MantineProvider, Container, Paper, Title, Button, TextInput, Textarea, Grid, Loader, Text } from '@mantine/core';
import { FloppyDisk, PencilSimple, Phone, EnvelopeSimple, LinkedinLogo, GithubLogo } from '@phosphor-icons/react';
import axios from 'axios';

export default function AboutMePage() {
  const [inputs, setInputs] = useState({
    aboutMe: 'CSE Prof.',
    dateOfJoining: '12-12-2012',
    pensionFund: '#PF',
    education: 'PhD',
    interestAreas: 'Teaching',
    contact: '+919876543210',
    email: 'atul@iiitdmj.ac.in',
    linkedIn: 'linkedin',
    github: 'github'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);

  // Fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const formData = new FormData();
      formData.append("user_id", 5318);
      const response = await axios.get("http://127.0.0.1:8000/eis/get_personal_info/", formData);
      setTableData(response.data); // Assuming response data contains the user data
      console.log(tableData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    }
  };

  

  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle form submission (save or update user info)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("user_id", 5318); // Adjust this as needed
      formData.append("about_me", inputs.aboutMe);
      formData.append("date_of_joining", inputs.dateOfJoining);
      formData.append("pension_fund", inputs.pensionFund);
      formData.append("education", inputs.education);
      formData.append("interest_areas", inputs.interestAreas);
      formData.append("contact", inputs.contact);
      formData.append("email", inputs.email);
      formData.append("linkedIn", inputs.linkedIn);
      formData.append("github", inputs.github);

      if (!isEdit) {
        const res = await axios.post("http://127.0.0.1:8000/eis/persinfo/", formData);
        console.log(res.data);
      } else {
        formData.append("id", id); // Include ID for editing existing data
        const res = await axios.post(`http://127.0.0.1:8000/eis/persinfo/`, formData);
        console.log(res.data);
        setIsEdit(false);
        setId(0);
      }

      // Fetch updated data after submission
      fetchUserData();

      // Reset input fields after submission
      setInputs({
        aboutMe: '',
        dateOfJoining: '',
        pensionFund: '',
        education: '',
        interestAreas: '',
        contact: '',
        email: 'atul@iiitdmj.ac.in',
        linkedIn: '',
        github: ''
      });
    } catch (error) {
      console.error(error);
      setError("Failed to submit data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle editing an existing entry
  const handleEdit = (data) => {
    setInputs({
      aboutMe: data.aboutMe,
      dateOfJoining: data.dateOfJoining,
      pensionFund: data.pensionFund,
      education: data.education,
      interestAreas: data.interestAreas,
      contact: data.contact,
      email: data.email,
      linkedIn: data.linkedIn,
      github: data.github
    });

    setId(data.id);
    setIsEdit(true);
  };

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="md" mt="xl">
        <Paper shadow="xs" p="md" withBorder style={{ borderLeft: '8px solid #2185d0', marginBottom: '1rem' }}>
          <Grid align="center">
            <Grid.Col span={10}>
              <Title order={2}>Profile</Title>
            </Grid.Col>
            <Grid.Col span={1}>
              <Button variant="filled" color={isEdit ? 'green' : 'blue'} compact onClick={() => setIsEdit(!isEdit)}>
                {isEdit ? <FloppyDisk size={16} /> : <PencilSimple size={16} />}
                {isEdit ? ' Save' : ' Edit'}
              </Button>
            </Grid.Col>
          </Grid>

          {/* About Me Section */}
          <Textarea
            label="About Me"
            name="aboutMe"
            value={inputs.aboutMe}
            onChange={handleInputChange}
            placeholder="Enter your 'About Me' content here"
            minRows={4}
            mt="md"
            disabled={!isEdit}
          />

          {/* Details Section */}
          <Grid mt="md" gutter="md">
            <Grid.Col span={6}>
              <TextInput
                label="Date Of Joining"
                name="dateOfJoining"
                value={inputs.dateOfJoining}
                onChange={handleInputChange}
                placeholder="Select Date"
                type="date"
                disabled={!isEdit}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Pension Fund #"
                name="pensionFund"
                value={inputs.pensionFund}
                onChange={handleInputChange}
                placeholder="Enter Pension Fund #"
                disabled={!isEdit}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Education"
                name="education"
                value={inputs.education}
                onChange={handleInputChange}
                placeholder="Enter Education details"
                disabled={!isEdit}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Interest Areas"
                name="interestAreas"
                value={inputs.interestAreas}
                onChange={handleInputChange}
                placeholder="Enter your interest areas"
                disabled={!isEdit}
              />
            </Grid.Col>
          </Grid>

          {/* Contact Details Section */}
          <Grid mt="md" gutter="md">
            <Grid.Col span={6}>
              <TextInput
                label="Contact"
                name="contact"
                value={inputs.contact}
                onChange={handleInputChange}
                placeholder="Enter your contact number"
                disabled={!isEdit}
                icon={<Phone size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Email"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                disabled={!isEdit}
                icon={<EnvelopeSimple size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="LinkedIn"
                name="linkedIn"
                value={inputs.linkedIn}
                onChange={handleInputChange}
                placeholder="Enter your LinkedIn profile"
                disabled={!isEdit}
                icon={<LinkedinLogo size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Github"
                name="github"
                value={inputs.github}
                onChange={handleInputChange}
                placeholder="Enter your GitHub profile"
                disabled={!isEdit}
                icon={<GithubLogo size={16} />}
              />
            </Grid.Col>
          </Grid>

          {/* Submit Button */}
          <Button variant="filled" color="blue" onClick={handleSubmit} disabled={isLoading} mt="md">
            {isLoading ? <Loader size="sm" /> : 'Save Changes'}
          </Button>
        </Paper>
      </Container>
    </MantineProvider>
  );
}
