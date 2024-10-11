import React, { useState } from 'react';
import { Button, TextInput } from '@mantine/core'; // Excluded Textarea from Mantine
import { PaperPlaneTilt, ChatCircleDots } from 'phosphor-react';

export default function ViewFiles() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '2rem',
    },
    formContainer: {
      maxWidth: '50rem',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    contentBox: {
      backgroundColor: '#f9fafb',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: '1rem',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '2rem',
      padding: '0 5rem', // Added padding to space buttons within container
    },
    button: {
      width: '30%', // Reduced width of buttons
      padding: '0.5rem', // Reduced padding of buttons
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.9rem', // Reduced font size
    },
    activeButton: {
      backgroundColor: '#2563eb',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      fontSize: '1rem',
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      fontSize: '1rem',
      resize: 'vertical',
    },
    submitButton: {
      width: '30%', // Reduced submit button size
      padding: '0.75rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontSize: '1rem',
      marginTop: '1rem',
      display: 'block',
      marginLeft: 'auto', // Centers the submit button horizontally
      marginRight: 'auto', // Centers the submit button horizontally
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Title Of File</h2>

        <div style={styles.contentBox}>
          <p>This shows the content of the current file.</p>
        </div>

        <div style={styles.buttonContainer}>
          <Button
            leftIcon={<PaperPlaneTilt size={24} />}
            onClick={() => toggleSection('forward')}
            style={{ ...styles.button, ...(activeSection === 'forward' ? styles.activeButton : {}) }}
          >
            Forward
          </Button>
          <Button
            leftIcon={<ChatCircleDots size={24} />}
            onClick={() => toggleSection('feedback')}
            style={{ ...styles.button, ...(activeSection === 'feedback' ? styles.activeButton : {}) }}
          >
            Feedback
          </Button>
        </div>

        {activeSection === 'forward' && (
          <>
            <TextInput
              label="Receiver's Email"
              placeholder="Enter receiver's email"
              style={styles.input}
            />
            <label style={styles.label}>Receiver's Designation</label>
            <textarea
              placeholder="Enter receiver's designation"
              rows={4}
              style={styles.textarea}
            />
            <Button style={styles.submitButton}>
              Send
            </Button>
          </>
        )}

        {activeSection === 'feedback' && (
          <>
            <label style={styles.label}>Feedback</label>
            <textarea
              placeholder="Enter your feedback"
              rows={6}
              style={styles.textarea}
            />
            <TextInput
              label="Receiver's Email"
              placeholder="Enter receiver's email"
              style={styles.input}
            />
            <label style={styles.label}>Receiver's Designation</label>
            <textarea
              placeholder="Enter receiver's designation"
              rows={4}
              style={styles.textarea}
            />
            <Button style={styles.submitButton}>
              Submit
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
