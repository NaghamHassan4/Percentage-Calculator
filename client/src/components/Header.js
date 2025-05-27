import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ padding: 0, minHeight: "70px !important" }}>
        <Typography variant="h6" sx={{ flexGrow: 1, paddingLeft: 2 }}>
          Percentage Calculator
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
