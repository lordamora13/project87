import { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  keyframes,
} from '@mui/material';
import { Eye, EyeOff, Server } from 'lucide-react';

interface LoginProps {
  onLogin: (token: string) => void;
}

// Keyframe animations
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(63, 136, 242, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(63, 136, 242, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(63, 136, 242, 0);
  }
`;

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SOCKET_SERVER}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        onLogin(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
        position: 'relative',
        overflow: 'hidden',
        p: 2,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(63, 136, 242, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0, 176, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)
          `,
          animation: `${shimmer} 10s linear infinite`,
        },
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          backdropFilter: 'blur(20px)',
          background: 'rgba(26, 26, 46, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          },
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            right: '-50%',
            bottom: '-50%',
            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            transform: 'rotate(30deg)',
            animation: `${shimmer} 3s linear infinite`,
          },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              animation: `${float} 3s ease-in-out infinite`,
              display: 'inline-flex',
              borderRadius: '50%',
              p: 2,
              background: 'rgba(63, 136, 242, 0.1)',
              boxShadow: '0 0 20px rgba(63, 136, 242, 0.3)',
              animationName: `${pulse}`,
              animationDuration: '2s',
              animationIterationCount: 'infinite',
            }}
          >
            <Server size={48} color="#3f88f2" />
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              mt: 2,
              color: 'primary.main',
              fontWeight: 600,
              letterSpacing: '0.5px',
              opacity: 0.9
            }}
          >
            BSID-UMM
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              mt: 1,
              fontWeight: 600,
              background: 'linear-gradient(45deg, #3f88f2, #00b0ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            NOC Monitoring
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mt: 1,
              opacity: 0.7,
              fontWeight: 500
            }}
          >
            Sign in to access the dashboard
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 2,
              transition: 'transform 0.3s ease',
              '& .MuiOutlinedInput-root': {
                '&:hover': {
                  transform: 'translateX(5px)',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              transition: 'transform 0.3s ease',
              '& .MuiOutlinedInput-root': {
                '&:hover': {
                  transform: 'translateX(5px)',
                },
              },
            }}
          />

          {error && (
            <Typography 
              color="error" 
              sx={{ 
                mb: 2, 
                textAlign: 'center',
                animation: `${shake} 0.5s ease-in-out`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                p: 1,
                borderRadius: 1,
                bgcolor: 'rgba(255, 82, 82, 0.1)',
                border: '1px solid rgba(255, 82, 82, 0.2)',
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              bgcolor: 'primary.main',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.02)',
                boxShadow: '0 5px 15px rgba(63, 136, 242, 0.4)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                right: '-50%',
                bottom: '-50%',
                background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                transform: 'rotate(30deg)',
                transition: 'all 0.3s ease',
              },
              '&:hover::after': {
                animation: `${shimmer} 1.5s linear infinite`,
              },
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default Login;