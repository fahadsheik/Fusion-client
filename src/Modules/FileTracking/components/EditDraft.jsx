/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Card, Title, TextInput, Button, Textarea } from "@mantine/core";

// eslint-disable-next-line react/prop-types
function ViewDraft({ file, onBack }) {
  // eslint-disable-next-line react/prop-types
  const [title, setTitle] = useState(file.subject);
  const [description, setDescription] = useState("");

  const handleSaveChanges = () => {
    // Implement the save functionality here
    console.log("Changes saved:", { title, description });
    onBack();
  };

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      // eslint-disable-next-line react/prop-types, react/prop-types,
      react/prop-types // eslint-disable-next-line react/prop-types,
      react/prop-types // eslint-disable-next-line react/prop-types
      <Title order={3}>Edit Draft: {file.subject}</Title>
      <TextInput
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        mt="md"
      />
      <Textarea
        label="Description"
        placeholder="Enter your description here"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        mt="md"
      />
      <Button size="sm" onClick={handleSaveChanges} mt="md">
        Save Changes
      </Button>
      <Button size="sm" variant="outline" onClick={onBack} mt="md" ml="sm">
        Back
      </Button>
    </Card>
  );
}

export default ViewDraft;
