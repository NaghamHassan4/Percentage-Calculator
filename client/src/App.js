import React, { useState, useEffect } from "react";
import { login, register, logout } from "./api/auth";
import { fetchDataItems } from "./api/data";
import { useSocket } from "./hooks/useSocket";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { Box } from "@mui/material";
import { CssBaseline } from "@mui/material";

const App = () => {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [dataItems, setDataItems] = useState([]);
  const [calculations, setCalculations] = useState({});
  const [calculatedResults, setCalculatedResults] = useState({});

  const { socket, isConnected } = useSocket(
    (response) => {
      if (response.success) setDataItems(response.data);
    },
    (result) => {
      setCalculatedResults((prev) => ({ ...prev, [result.item_id]: result }));
    }
  );

  const handleLogin = async () => {
    const data = await login(loginForm);
    if (data.success) {
      setUser(data.user);
      setLoginForm({ username: "", password: "" });
    }
  };

  const handleRegister = async () => {
    const data = await register(registerForm);
    if (data.success) {
      setRegisterForm({ username: "", password: "" });
      setIsRegistering(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const updateCalculation = (itemId, value) => {
    setCalculations((prev) => ({ ...prev, [itemId]: value }));
    if (value && value !== "" && socket && isConnected) {
      socket.emit("calculate_percentage", {
        item_id: itemId,
        input_value: parseFloat(value),
      });
    } else {
      setCalculatedResults((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    }
  };

  useEffect(() => {
    fetchDataItems().then((res) => {
      if (res.success) setDataItems(res.data);
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        margin: 0,
        padding: 0,
      }}
    >
      <CssBaseline />
      {!user ? (
        <LoginPage
          isRegistering={isRegistering}
          formData={isRegistering ? registerForm : loginForm}
          onChange={(field, value) => {
            const update = (prev) => ({ ...prev, [field]: value });
            isRegistering ? setRegisterForm(update) : setLoginForm(update);
          }}
          onSubmit={isRegistering ? handleRegister : handleLogin}
          toggleForm={() => setIsRegistering(!isRegistering)}
          
        />
      ) : (
        <Dashboard
          dataItems={dataItems}
          calculations={calculations}
          calculatedResults={calculatedResults}
          updateCalculation={updateCalculation}
          onLogout={handleLogout}
        />
      )}
    </Box>
  );
};

export default App;
