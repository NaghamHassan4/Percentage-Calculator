import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

const DataTable = ({ dataItems, calculations, calculatedResults, updateCalculation }) => (
  <Paper sx={{ width: "100%", overflow: "hidden" }}>
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6" fontWeight="bold">Input Value</Typography></TableCell>
            <TableCell><Typography variant="h6" fontWeight="bold">Stored Value</Typography></TableCell>
            <TableCell><Typography variant="h6" fontWeight="bold">Calculated Result</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataItems.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>
                <TextField
                  type="number"
                  placeholder="Enter numerical value"
                  value={calculations[item.id] || ""}
                  onChange={(e) => updateCalculation(item.id, e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="medium">
                  {item.db_value}
                </Typography>
              </TableCell>
              <TableCell>
                {calculatedResults[item.id] ? (
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    {calculatedResults[item.id].percentage_formatted}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">—</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {dataItems.length === 0 && (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">No data items available</Typography>
      </Box>
    )}
  </Paper>
);

export default DataTable;
