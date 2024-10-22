// import { Routes, Route, Link, NavLink } from 'react-router-dom';
// import ProjectsMaster from '../Profile/Projects/ProjectMaster';
// import ConsultancyProjects from '../Profile/Projects/ConsultancyProjects';
// import Patents from '../Profile/Projects/Patents';
// import WorkshopForm from '../Profile/EventsOrganised/Workshop';
// import EventMaster from '../Profile/EventsOrganised/EventMaster';
// import VisitsMaster from '../Profile/Visits/VisitsMaster';
// import ForeignVisits from '../Profile/Visits/ForeignVisits';
// import IndianVisits from '../Profile/Visits/IndianVisits';
// import ConferenceSymposium from '../Profile/Conference/Conference';
// import ConferenceMaster from '../Profile/Conference/ConferenceMaster';
// import AchievementsForm from '../Profile/Others/Achievements';
// import ExpertLecturesForm from '../Profile/Others/ExpertLectures';
// import OtherMaster from '../Profile/Others/OtherMaster';
// import ResearchProjects from '../Profile/Projects/ResearchProjects';
// import Journal from '../Profile/Publications/Journal';
// import Conference from '../Profile/Publications/Conference';
// import Books from '../Profile/Publications/Books';
// import PublicationsMaster from '../Profile/Publications/PublicationsMaster';
// import ThesisSupervisionMaster from '../Profile/ThesisSupervision/ThesisSupervisionMaster';
// import PgThesis from '../Profile/ThesisSupervision/PgThesis';
// import PhdThesisForm from '../Profile/ThesisSupervision/PhdThesis';
// import ProfileForm from '../Profile/PersonalDetails/ProfileForm';
// import MyProfileMaster from '../Profile/MyProfile/MyProfileMaster';
// import ViewConsultancyProject from '../Profile/MyProfile/ViewConsultancyProject';
// import ViewConSym from '../Profile/MyProfile/ViewConSym';
// import ViewEvents from '../Profile/MyProfile/ViewEvents';
// import ViewForeignVisits from '../Profile/MyProfile/ViewForeignVisits';
// import ViewIndianVisits from '../Profile/MyProfile/ViewIndianVisits';
// import ViewPGThesis from '../Profile/MyProfile/ViewPGThesis';
// import ViewPatent from '../Profile/MyProfile/ViewPatent';
// import ViewPhDThesis from '../Profile/MyProfile/ViewPhDThesis';
// import ViewResearchProject from '../Profile/MyProfile/ViewResearchProject';
// import { useRef, useState } from 'react';
// import CustomBreadcrumbs from '../../../components/Breadcrumbs';
// import { Button, Flex, Tabs } from '@mantine/core';
// import { CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react';
// import classes from "../../Dashboard/Dashboard.module.css";

// function ProfileButtons() {

//   const [activeTab, setActiveTab] = useState("0");
//   const tabsListRef = useRef(null);
//   const tabItems = [
//     // { title: "Personal Details", component: <ProjectsMaster /> },
//     // {
//     //   title: "Publications",
//     //   component: <CreateRequest setActiveTab={setActiveTab} />,
//     // },
//     { title: "Projects", component: <ProjectsMaster /> },
//     { title: "Thesis Supervision", component: <ThesisSupervisionMaster /> },
//     // { title: "Events", component: <RejectedRequests /> },
//     // { title: "Visits", component: <RequestsInProgress /> },
//     // { title: "Conference/Symposium", component: <ManageBudget /> },
//     // { title: "Others", component: <CreatedRequests /> },
//     // { title: "My Profile", component: <ViewBudget /> },
//   ];
//   const handleTabChange = (direction) => {
//     const newIndex =
//       direction === "next"
//         ? Math.min(+activeTab + 1, tabItems.length - 1)
//         : Math.max(+activeTab - 1, 0);
//     setActiveTab(String(newIndex));
//     tabsListRef.current.scrollBy({
//       left: direction === "next" ? 50 : -50,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <>
//       <CustomBreadcrumbs />
//       <Flex
//         justify="flex-start"
//         align="center"
//         gap={{ base: "0.5rem", md: "1rem" }}
//         mt={{ base: "1rem", md: "1.5rem" }}
//         ml={{ md: "lg" }}
//       >
//         <Button
//           onClick={() => handleTabChange("prev")}
//           variant="default"
//           p={0}
//           style={{ border: "none" }}
//         >
//           <CaretCircleLeft
//             className={classes.fusionCaretCircleIcon}
//             weight="light"
//           />
//         </Button>

//         <div className={classes.fusionTabsContainer} ref={tabsListRef}>
//           <Tabs value={activeTab} onChange={setActiveTab}>
//             <Tabs.List style={{ display: "flex", flexWrap: "nowrap" }}>
//               {tabItems.map((item, index) => (
//                 <Tabs.Tab
//                   value={index}
//                   key={index}
//                   className={
//                     activeTab === index
//                       ? classes.fusionActiveRecentTab
//                       : ""
//                   }
//                 >
//                   <Text>{item.title}</Text>
//                 </Tabs.Tab>
//               ))}
//             </Tabs.List>
//           </Tabs>
//         </div>

//         <Button
//           onClick={() => handleTabChange("next")}
//           variant="default"
//           p={0}
//           style={{ border: "none" }}
//         >
//           <CaretCircleRight
//             className={classes.fusionCaretCircleIcon}
//             weight="light"
//           />
//         </Button>
//       </Flex>
//       {tabItems[parseInt(activeTab, 10)].component}

//       {/* <div className="container mx-auto p-4">
//        <h1 className="text-2xl font-bold">Professional Profile</h1>

//         <nav className="mt-4 flex space-x-4">
//           <NavLink to="/facultyprofessionalprofile/personal-details" className="btn">Personal Details</NavLink>
//           <NavLink to="/facultyprofessionalprofile/publications" className="btn">Publications</NavLink>
//           <NavLink to="/facultyprofessionalprofile/projects" className="btn">Projects</NavLink>
//           <NavLink to="/facultyprofessionalprofile/thesis" className="btn">Thesis Supervision</NavLink>
//           <NavLink to="/facultyprofessionalprofile/events" className="btn">Events</NavLink>
//           <NavLink to="/facultyprofessionalprofile/visits" className="btn">Visits</NavLink>
//           <NavLink to="/facultyprofessionalprofile/conferences" className="btn">Conference/Symposium</NavLink>
//           <NavLink to="/facultyprofessionalprofile/others" className="btn">Others</NavLink>
//           <NavLink to="/facultyprofessionalprofile/myprofile" className="btn">My Profile</NavLink>
//         </nav> */}

//         {/* <div className="form-section mt-8">
//           <Routes>

//           <Route path='personal-details' element={<ProfileForm />} />

//           <Route path="/publications/*" element={<PublicationsMaster />} >
//                 <Route index element={<Journal />} />
//                 <Route path='journal' element={<Journal />} />
//                 <Route path="conference" element={<Conference />} />
//                 <Route path="books" element={<Books />} />
//             </Route>

//             <Route path="/projects/*" element={<ProjectsMaster />} >
//                 <Route index element={<ResearchProjects />} />
//                 <Route path='research-projects' element={<ResearchProjects />} />
//                 <Route path="consultancy-projects" element={<ConsultancyProjects />} />
//                 <Route path="patents" element={<Patents />} />
//             </Route>

//             <Route path="/thesis/*" element={<ThesisSupervisionMaster />} >
//                 <Route index element={<PgThesis />} />
//                 <Route path='pg' element={<PgThesis />} />
//                 <Route path="phd" element={<PhdThesisForm />} />
//             </Route>

//             <Route path="/events/*" element={<EventMaster />} >
//                 <Route index element={<WorkshopForm />} />
//                 <Route path="workshop" element={<WorkshopForm />} />
//             </Route>

//             <Route path="/visits/*" element={<VisitsMaster />} >
//                 <Route index element={<ForeignVisits />} />
//                 <Route path="foreign-visits" element={<ForeignVisits />} />
//                 <Route path="indian-visits" element={<IndianVisits />} />
//             </Route>

//             <Route path="/conferences/*" element={<ConferenceMaster />} >
//                 <Route index element={<ConferenceSymposium />} />
//                 <Route path="conference" element={<ConferenceSymposium />} />
//             </Route>

//             <Route path="/others/*" element={<OtherMaster />} >
//                 <Route index element={<AchievementsForm />} />
//                 <Route path="achievements" element={<AchievementsForm />} />
//                 <Route path="expert-lectures" element={<ExpertLecturesForm />} />
//             </Route>

//             <Route path="/myprofile/*" element={<MyProfileMaster />} >
//                 <Route index element={<ViewResearchProject />} />
//                 <Route path="view-research-project" element={<ViewResearchProject />} />
//                 <Route path="view-consultancy-project" element={<ViewConsultancyProject />} />
//                 <Route path="view-patent" element={<ViewPatent />} />
//                 <Route path="view-pg-thesis" element={<ViewPGThesis />} />
//                 <Route path="view-phd-thesis" element={<ViewPhDThesis />} />
//                 <Route path="view-events" element={<ViewEvents />} />
//                 <Route path="view-fvisits" element={<ViewForeignVisits />} />
//                 <Route path="view-ivisits" element={<ViewIndianVisits />} />
//                 <Route path="view-consym" element={<ViewConSym />} />
//             </Route>

//           </Routes>
//         </div>
//       </div> */}
//     </>
//   );
// }

// export default ProfileButtons;

import { useRef, useState } from "react";
import { Button, Flex, Tabs, Text } from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
// import CustomBreadcrumbs from "../../../components/Breadcrumbs";
import ProjectsMaster from "../Profile/Projects/ProjectMaster";
import ThesisSupervisionMaster from "../Profile/ThesisSupervision/ThesisSupervisionMaster";
import EventMaster from "../Profile/EventsOrganised/EventMaster";
import VisitsMaster from "../Profile/Visits/VisitsMaster";
import ConferenceMaster from "../Profile/Conference/ConferenceMaster";
import PublicationMaster from "../Profile/Publications/PublicationsMaster";
import OtherMaster from "../Profile/Others/OtherMaster";
import MyProfileMaster from "../Profile/MyProfile/MyProfileMaster";
import classes from "../../Dashboard/Dashboard.module.css"; // Ensure the CSS module is properly set
import ProjectManagementFormMaster from "../Profile/ProjectManagementForms/ProjectManagementFormMaster";

function ProfileButtons() {
  const [activeTab, setActiveTab] = useState("0");
  const tabsListRef = useRef(null);

  // Tab items data
  const tabItems = [
    { title: "Publications", component: <PublicationMaster /> },
    { title: "Projects", component: <ProjectsMaster /> },
    { title: "Thesis Supervision", component: <ThesisSupervisionMaster /> },
    { title: "Events", component: <EventMaster /> },
    { title: "Visits", component: <VisitsMaster /> },
    { title: "Conference/Synopsium", component: <ConferenceMaster /> },
    { title: "Others", component: <OtherMaster /> },
    { title: "My Profile", component: <MyProfileMaster /> },
    { title: "Project Management Forms", component: <ProjectManagementFormMaster /> },
  ];

  // Handle tab change (previous/next)
  const handleTabChange = (direction) => {
    const newIndex =
      direction === "next"
        ? Math.min(parseInt(activeTab, 10) + 1, tabItems.length - 1)
        : Math.max(parseInt(activeTab, 10) - 1, 0);
    setActiveTab(String(newIndex));
    tabsListRef.current.scrollBy({
      left: direction === "next" ? 50 : -50,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* <CustomBreadcrumbs /> */}

      <Flex
        justify="flex-start"
        align="center"
        gap={{ base: "0.5rem", md: "1rem" }}
        mt={{ base: "1rem", md: "1.5rem" }}
        ml={{ md: "lg" }}
      >
        {/* Previous Button */}
        <Button
          onClick={() => handleTabChange("prev")}
          variant="default"
          p={0}
          style={{ border: "none" }}
        >
          <CaretCircleLeft
            className={classes.fusionCaretCircleIcon}
            weight="light"
          />
        </Button>

        {/* Tabs Section */}
        <div className={classes.fusionTabsContainer} ref={tabsListRef}>
          <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Tabs.List style={{ display: "flex", flexWrap: "nowrap" }}>
              {tabItems.map((item, index) => (
                <Tabs.Tab
                  value={String(index)}
                  key={index}
                  className={
                    activeTab === String(index)
                      ? classes.fusionActiveRecentTab
                      : ""
                  }
                >
                  <Text>{item.title}</Text>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => handleTabChange("next")}
          variant="default"
          p={0}
          style={{ border: "none" }}
        >
          <CaretCircleRight
            className={classes.fusionCaretCircleIcon}
            weight="light"
          />
        </Button>
      </Flex>

      {/* Display the active tab content */}
      {tabItems[parseInt(activeTab, 10)]?.component}
    </>
  );
}

export default ProfileButtons;
