"use client";

import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListItem from "@mui/material/ListItem";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {!open ? (
            <IconButton
              onClick={handleDrawerOpen}
              sx={{
                alignItems: "center",
              }}
            >
              <KeyboardBackspaceIcon sx={{ transform: "rotate(180deg)" }} />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              <KeyboardBackspaceIcon />{" "}
            </IconButton>
          )}
        </DrawerHeader>
        <List>
          {[
            { title: "Home", icon: <HomeOutlinedIcon />, url: "/" },
            {
              title: "Reports",
              icon: <ReceiptLongOutlinedIcon />,
              url: "/reports",
            },
            {
              title: "Schedule",
              icon: <CalendarMonthOutlinedIcon />,
              url: "/schedule",
            },
          ].map((item, index) => (
            <ListItem
              key={item.title}
              disablePadding
              sx={{
                display: "block",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                href={item.url}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor:
                      pathname === item.url ? "#dcf6f3" : "inherit",
                    color: pathname === item.url ? "#17c2af" : "inherit",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      zIndex: 99,
                      justifyContent: "center",
                      color: pathname === item.url ? "#17c2af" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default SideBar;
