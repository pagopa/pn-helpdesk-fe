import React, { useState, useEffect, useContext } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from "@mui/material";
import logo from "./../resources/logo.svg";

const MenuComponent = () => {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (status: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setOpen(status);
      };

    const handleClick = () => {
        setOpen(true);
    }

  return (
    <div>
      <IconButton
        sx={{ color: "white" }}
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Toolbar />
        <Divider />

        <List>
          {[
            "Ricerca ed estrazione dati",
            "Monitoraggio Piattaforma Notifiche",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default MenuComponent;
