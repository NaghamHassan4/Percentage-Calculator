import { Container } from "@mui/material";
import Header from "../components/Header";
import DataTable from "../components/DataTable";

const Dashboard = ({ dataItems, calculations, calculatedResults, updateCalculation, onLogout }) => {
  return (
    <>
      <Header onLogout={onLogout} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <DataTable
          dataItems={dataItems}
          calculations={calculations}
          calculatedResults={calculatedResults}
          updateCalculation={updateCalculation}
        />
      </Container>
    </>
  );
};

export default Dashboard;
