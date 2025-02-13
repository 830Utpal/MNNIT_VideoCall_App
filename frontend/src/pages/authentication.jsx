import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                let result = await handleRegister(name, username, password);
                setUsername('');
                setMessage(result);
                setOpen(true);
                setError('');
                setFormState(0);
                setPassword('');
            }
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                
                {/* Left Side - Background Image */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Right Side - Form */}
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        {/* Button Group - Fixed */}
                        <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
                            <Button 
                                variant={formState === 0 ? "contained" : "outlined"} 
                                onClick={() => setFormState(0)}
                            >
                                Sign In
                            </Button>
                            <Button 
                                variant={formState === 1 ? "contained" : "outlined"} 
                                onClick={() => setFormState(1)}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        {/* Form */}
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* Error Message */}
                            {error && <Typography color="error">{error}</Typography>}

                            {/* Submit Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Snackbar for Messages */}
            <Snackbar open={open} autoHideDuration={4000} message={message} />
        </ThemeProvider>
    );
}
