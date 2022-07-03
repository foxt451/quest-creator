import React, { FC } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { paths } from "../../constants/paths";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { selectUser } from "../../store/profile/profileSlice";
import { useAppSelector } from "../../store/hooks";

const drawerWidth = 240;
type NavItem = [string, string];
const baseNavItems: Record<string, NavItem> = {
  quests: ["Quests", paths.QUESTS],
};

const NavBar: FC = () => {
  const user = useAppSelector(selectUser);
  let navItems = { ...baseNavItems };
  if (!user) {
    navItems = {
      ...navItems,
      login: ["Login", paths.LOGIN],
      signup: ["Sign Up", paths.SIGN_UP],
    };
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Quest Room
      </Typography>
      <Divider />
      <List>
        {Object.values(navItems).map(([name, link]) => (
          <ListItem key={name} disablePadding>
            <NavLink to={link}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={name} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window.document.body;
  return (
    <>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <FaBars />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Quest Room
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {Object.values(navItems).map(([name, link]) => (
              <NavLink key={name} to={link}>
                <Button sx={{ color: "#fff" }}>{name}</Button>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default NavBar;
