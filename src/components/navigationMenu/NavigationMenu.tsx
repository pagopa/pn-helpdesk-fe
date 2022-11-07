import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
const NavigationMenu = () => {

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
      {
        title: "Gestione Aggregazioni ApiKey",
        link: "/aggregations",
      }
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
        sx={{ color: "white", paddingLeft: 0 }}
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
            <Link key={item.title} to={item.link} style={{ textDecoration: "none" }}>
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

export default NavigationMenu;
