import './App.css';
import '@mantine/core/styles.css';
import { Card, MantineProvider, Text } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <Card>
        <Text>hello</Text>
      </Card>
    </MantineProvider>
  );
}

export default App;
