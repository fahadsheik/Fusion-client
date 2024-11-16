// import { Link, Outlet } from 'react-router-dom';
// import './MyProfileMaster.css';

// function MyProfileMaster() {
//   return (
//     <div className="project-master-container">
//       {/* Navigation buttons */}
//       <nav style={{ marginBottom: '20px' }}>
//         <Link to="/myprofile/view-research-project" style={{ marginRight: '20px' }}>Research Projects</Link>
//         <Link to="/myprofile/view-consultancy-project" style={{ marginRight: '20px' }}>Consultancy Projects</Link>
//         <Link to="/myprofile/view-patent" style={{ marginRight: '20px' }}>Patents</Link>
//         <Link to="/myprofile/view-pg-thesis" style={{ marginRight: '20px' }}>PG Thesis</Link>
//         <Link to="/myprofile/view-phd-thesis" style={{ marginRight: '20px' }}>PhD Thesis</Link>
//         <Link to="/myprofile/view-events" style={{ marginRight: '20px' }}>Events</Link>
//         <Link to="/myprofile/view-fvisits" style={{ marginRight: '20px' }}>Foreign Visits</Link>
//         <Link to="/myprofile/view-ivisits" style={{ marginRight: '20px' }}>Indian Visits</Link>
//         <Link to="/myprofile/view-consym" style={{ marginRight: '20px' }}>Conference/Symposium</Link>
//       </nav>

//       {/* Display the selected form below the buttons */}
//       <div className="form-container">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default MyProfileMaster;

// import { Link, Outlet } from 'react-router-dom';
// import './ConferenceMaster.css'; // Import CSS for styling

// function ConferenceMaster() {
//   return (
//     <div className="project-master-container">
//       {/* Navigation buttons */}
//       <nav style={{ marginBottom: '20px' }}>
//         <Link to="/conferences/conference" style={{ marginRight: '20px' }}>Conference/Symposium</Link>
//       </nav>

//       {/* Display the selected form below the buttons */}
//       <div className="form-container">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default ConferenceMaster;

import { useRef, useState } from "react";
import { Button, Flex, Tabs, Text } from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
// import CustomBreadcrumbs from "../../../../components/Breadcrumbs";
import ViewResearchProject from "./ViewResearchProject";
import ViewConsultancyProject from "./ViewConsultancyProject";
import ViewPatent from "./ViewPatent";
import ViewPGThesis from "./ViewPGThesis";
import ViewPhDThesis from "./ViewPhDThesis";
// import ViewEvent from "./ViewEvents";
import ViewForeignVisits from "./ViewForeignVisits";
import ViewIndianVisits from "./ViewIndianVisits";
import ViewConSym from "./ViewConSym";
import ViewEvents from "./ViewEvents";
import classes from "../../../Dashboard/Dashboard.module.css";
// import Books from "../Publications/Books";
// import Journal from "../Publications/Journal";
import ViewJournal from "./ViewJournal";
import ViewBooks from "./ViewBooks";

function VisitsMaster() {
  const [activeTab, setActiveTab] = useState("0");
  const tabsListRef = useRef(null);

  // Tab items data
  const tabItems = [
    { title: "ResearchProject", component: <ViewResearchProject /> },
    { title: "ConsultancyProject", component: <ViewConsultancyProject /> },
    { title: "Patent", component: <ViewPatent /> },
    { title: "PGThesis", component: <ViewPGThesis /> },
    { title: "PhDThesis", component: <ViewPhDThesis /> },
    { title: "Events", component: <ViewEvents /> },
    { title: "ForeignVisits", component: <ViewForeignVisits /> },
    { title: "IndianVisits", component: <ViewIndianVisits /> },
    { title: "Con/Sym", component: <ViewConSym /> },
    { title: "Journal", component: <ViewJournal /> },
    { title: "Books", component: <ViewBooks /> },
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
                  onClick={() => setActiveTab(String(index))}
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

export default VisitsMaster;
