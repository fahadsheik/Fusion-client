// import { Link, Outlet } from 'react-router-dom';
// import './VisitsMaster.css'; // Import CSS for styling

// function VisitsMaster() {
//   return (
//     <div className="project-master-container">
//       {/* Navigation buttons */}
//       <nav style={{ marginBottom: '20px' }}>
//         <Link to="/visits/foreign-visits" style={{ marginRight: '20px' }}>Foreign Visits</Link>
//         <Link to="/visits/indian-visits" style={{ marginRight: '20px' }}>Indian Visits</Link>
//       </nav>

//       {/* Display the selected form below the buttons */}
//       <div className="form-container">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default VisitsMaster;

import { useRef, useState } from "react";
import { Button, Flex, Tabs, Text } from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
// import CustomBreadcrumbs from "../../../../components/Breadcrumbs";
import classes from "../../../Dashboard/Dashboard.module.css"; // Ensure the CSS module is properly set
import ForeignVisits from "./ForeignVisits";
import IndianVisits from "./IndianVisits";

function VisitsMaster() {
  const [activeTab, setActiveTab] = useState("0");
  const tabsListRef = useRef(null);

  // Tab items data
  const tabItems = [
    { title: "Foreign Visits", component: <ForeignVisits /> },
    { title: "Indian Visits", component: <IndianVisits /> },
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
