import React, { useState } from "react";
import { Group, Text, Box, Container } from "@mantine/core";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Compose from "./ComposeFile";
import Outbox from "./Outbox";

const sections = [
  "Compose File",
  "Drafts",
  "Inbox",
  "Outbox",
  "Track",
  "Archive",
];

// Map components to sections
const sectionComponents = {
  "Compose File": Compose,
  Outbox,
  // Add other components if needed
};

export default function SectionNavigation() {
  const [activeSection, setActiveSection] = useState("Compose File");

  // Get the component for the active section
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <Container size="xl" p="xs">
      {/* Section navigation */}
      <Group
        spacing="xs"
        noWrap
        style={{ overflowX: "auto", padding: "8px 0" }}
      >
        <CaretLeft size={20} weight="bold" color="#718096" />
        {sections.map((section, index) => (
          <React.Fragment key={section}>
            <Text
              size="sm"
              color={activeSection === section ? "#4299E1" : "#718096"}
              style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </Text>
            {index < sections.length - 1 && (
              <Text color="#CBD5E0" size="sm">
                |
              </Text>
            )}
          </React.Fragment>
        ))}
        <CaretRight size={20} weight="bold" color="#718096" />
      </Group>

      {/* Render the active section component */}
      <Box
        mt="md"
        style={{
          color: "#F5F7F8",
          border: "2px solid rgba(0, 0, 0, 0.3)",
          height: "500px",
          width: "100%",
          overflow: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        {ActiveComponent ? (
          <Box style={{ width: "100%", height: "100%", overflowY: "auto" }}>
            <ActiveComponent />
          </Box>
        ) : (
          <Text>Content for {activeSection}</Text>
        )}
      </Box>
    </Container>
  );
}
