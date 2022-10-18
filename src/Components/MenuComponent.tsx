import React, { useState, useEffect, useContext } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from "@mui/material";
import logo from "./../resources/logo.svg";
import { Link } from "react-router-dom";
const MenuComponent = () => {

    const [open, setOpen] = useState(false);

    const listItems: { title: string; link: string }[] = [
      {
        title: "Ricerca ed estrazione dati",
        link: "/search",
      },
      {
        title: "Monitoraggio Piattaforma Notifiche",
        link: "/monitoring",
      },
    ];

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
          {listItems.map((item, index) => (
            <Link to={item.link} style={{ textDecoration: "none" }}>
              <ListItem key={item.title} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default MenuComponent;
