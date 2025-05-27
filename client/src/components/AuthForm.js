import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Link,
} from "@mui/material";

const AuthForm = ({
  isRegistering,
  formData,
  onChange,
  onSubmit,
  toggleForm,
  onKeyPress,
}) => {
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newErrors = { username: "", password: "" };
    let valid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    setIsValid(valid);
  }, [formData]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            {isRegistering ? "Register" : "Login"}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={formData.username}
              onChange={(e) => onChange("username", e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={(e) => onChange("password", e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={onSubmit}
            sx={{ mb: 2 }}
            disabled={!isValid}
          >
            {isRegistering ? "Register" : "Login"}
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Link component="button" variant="body2" onClick={toggleForm}>
              {isRegistering
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthForm;
