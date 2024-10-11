import React, { useState } from "react";
import { Box, Card, Title, Table, Button, Badge, ActionIcon, Tooltip } from "@mantine/core";
import { ArrowArcLeft, Eye } from "@phosphor-icons/react";

export default function ArchiveFiles() {
  const styles = {
    archiveTable: {
      backgroundColor: 'white',
      padding: '1rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginTop: '1rem',
    },
    tableTitle: {
      fontSize: '1.25rem',
      marginBottom: '1rem',
    },
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    thTd: {
      padding: '0.75rem',
      textAlign: 'left',
      borderBottom: '1px solid #e5e7eb',
    },
    iconButton: {
      color: '#2563eb',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem',
    },
    viewButton: {
      display: 'flex',
      alignItems: 'center',
      color: '#2563eb',
      gap: '0.25rem',
    },
    icon: {
      marginLeft: '0.25rem',
    },
  };

  return (
    <Card style={styles.archiveTable}>
      <Title style={styles.tableTitle} order={2}>Archived Files:</Title>
      <Box style={styles.tableContainer}>
        <Table style={styles.table} highlightOnHover>
          <thead>
            <tr>
              <th style={styles.thTd}>Unarchive</th>
              <th style={styles.thTd}>Received As</th>
              <th style={styles.thTd}>Sent By</th>
              <th style={styles.thTd}>File ID</th>
              <th style={styles.thTd}>Subject</th>
              <th style={styles.thTd}>Date</th>
              <th style={styles.thTd}>View File</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2].map((item) => (
              <tr key={item}>
                <td style={styles.thTd}>
                  <Tooltip label="Unarchive">
                    <ActionIcon style={styles.iconButton}>
                      <ArrowArcLeft size={24} />
                    </ActionIcon>
                  </Tooltip>
                </td>
                <td style={styles.thTd}>File type: PDF</td>
                <td style={styles.thTd}>22BCSD04-Student</td>
                <td style={styles.thTd}>CSE-2023-11-#596</td>
                <td style={styles.thTd}>Fusion Project Module</td>
                <td style={styles.thTd}>Nov 16, 2023 11:26 p.m.</td>
                <td style={styles.thTd}>
                  <Button variant="subtle" leftIcon={<Eye size={24} />} style={styles.viewButton}>
                    Open file
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Card>
  );
}
