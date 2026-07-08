import { Body } from './view/layout/body';
import { Header } from './view/layout/header';
import { Container } from '@mui/material';

export default function App() {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Header />
      <Body />
    </Container>
  );
}
