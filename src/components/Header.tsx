import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
  Fade
} from '@mui/material';
import { useState } from 'react';
import { 
  Bell, 
  Server, 
  Zap, 
  WifiOff, 
  Wifi,
  RefreshCw,
  Settings,
  LogOut,
  User
} from 'lucide-react';

interface HeaderProps {
  connected: boolean;
  isMobile: boolean;
  alertCount: number;
  clearAlerts: () => void;
}

const Header = ({ connected, isMobile, alertCount, clearAlerts }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      handleMenuClose();
      window.location.reload();
    }, 1000);
  };

  const handleClearAlerts = () => {
    clearAlerts();
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  return (
    <AppBar position="sticky" color="transparent" sx={{ 
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(26, 26, 46, 0.8)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Server size={28} color="#3f88f2" />
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h1"
            sx={{ 
              ml: 2, 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(45deg, #3f88f2, #00b0ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            NOC Monitoring Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Connection status indicator */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: connected ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 82, 82, 0.1)',
              border: connected ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(255, 82, 82, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            {connected ? 
              <Wifi size={16} color="#4caf50" /> : 
              <WifiOff size={16} color="#ff5252" />
            }
            <Typography variant="body2" sx={{ 
              ml: 1, 
              color: connected ? '#4caf50' : '#ff5252',
              fontWeight: 500
            }}>
              {connected ? 'Online' : 'Offline'}
            </Typography>
          </Box>

          {/* Alert bell */}
          <Tooltip title="Notifications" TransitionComponent={Fade} arrow>
            <IconButton 
              color="inherit" 
              onClick={handleMenuOpen}
              sx={{ 
                ml: 1,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <Badge badgeContent={alertCount} color="error">
                <Bell size={24} color={alertCount > 0 ? "#ff5252" : "#ffffff"} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User menu */}
          <Tooltip title="Account settings" TransitionComponent={Fade} arrow>
            <IconButton onClick={handleUserMenuOpen} sx={{ ml: 1 }}>
              <Avatar 
                sx={{ 
                  width: 35, 
                  height: 35,
                  bgcolor: 'primary.main',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <User size={20} />
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* Notifications Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                width: 220,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(26, 26, 46, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleRefresh}>
              <ListItemIcon>
                <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
              </ListItemIcon>
              <ListItemText primary="Refresh Data" />
            </MenuItem>
            
            {alertCount > 0 && (
              <MenuItem onClick={handleClearAlerts}>
                <ListItemIcon>
                  <Zap size={18} />
                </ListItemIcon>
                <ListItemText primary="Clear Alerts" />
              </MenuItem>
            )}
          </Menu>

          {/* User Menu */}
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(26, 26, 46, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Signed in as
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Administrator
              </Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <MenuItem onClick={handleUserMenuClose}>
              <ListItemIcon>
                <Settings size={18} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <LogOut size={18} color="#ff5252" />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;