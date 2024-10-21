// import { Link, Outlet } from 'react-router-dom';
// import './EventMaster.css'; // Import CSS for styling

// function EventMaster() {
//   return (
//     <div className="project-master-container">
//       {/* Navigation buttons */}
//       <nav style={{ marginBottom: '20px' }}>
//         <Link to="/events/workshop" style={{ marginRight: '20px' }}>Workshop</Link>
//       </nav>

//       {/* Display the selected form below the buttons */}
//       <div className="form-container">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default EventMaster;

// import { useState } from 'react'
// import { Save } from 'lucide-react'
// import axios from 'axios'
// import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';

// export default function ProjectsMaster() {
//     return (
//         // <Router>
//           <div className="container mx-auto p-4">
//             <nav className="mt-4 flex space-x-4">
//               <Link to="/consultancy-projects" className="btn">Consultancy Projects</Link>
//               <Link to="/patents" className="btn">Patents</Link>
//               <Link to="/research-projects" className="btn">Research Projects</Link>
//             </nav>
//             <div ></div>
//             <div style={{ marginTop: '20px' }}>
//         <Outlet />
//       </div>
//           </div>
//         // </Router>
//       );
// }

// import { Link, Outlet } from 'react-router-dom';
// import './ProjectMaster.css'; // Import CSS for styling

// function ProjectsMaster() {
//   return (
//     <div className="project-master-container">
//       {/* Navigation buttons */}
//       <nav style={{ marginBottom: '20px' }}>
//         <Link to="/projects/research-projects" style={{ marginRight: '20px' }}>Research Projects</Link>
//         <Link to="/projects/consultancy-projects" style={{ marginRight: '20px' }}>Consultancy Projects</Link>
//         <Link to="/projects/patents" style={{ marginRight: '20px' }}>Patents</Link>
//       </nav>

//       {/* Display the selected form below the buttons */}
//       <div className="form-container">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default ProjectsMaster;

import { useRef, useState } from "react";
import { Button, Flex, Tabs, Text } from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
// import CustomBreadcrumbs from "../../../../components/Breadcrumbs";
import classes from "../../../Dashboard/Dashboard.module.css"; // Ensure the CSS module is properly set
import Workshop from "./Workshop";

function EventMaster() {
  const [activeTab, setActiveTab] = useState("0");
  const tabsListRef = useRef(null);

  // Tab items data
  const tabItems = [{ title: "Workshop", component: <Workshop /> }];

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

export default EventMaster;
