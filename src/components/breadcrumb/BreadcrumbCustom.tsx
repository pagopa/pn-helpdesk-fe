import {useLocation} from "react-router-dom";
import {Breadcrumbs, Link, Typography} from "@mui/material";
import React from "react";
import {nameOfRoute} from "../../navigation/router.const";
import {HomeOutlined} from "@mui/icons-material";


export const BreadcrumbCustom = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(i=>i);
  const extraItem = paths.map((path, index) => {
    const url = `/${paths.slice(0, index+1).join("/")}`;

    if (index !== paths.length-1){
      return <Link
        sx={{ display: "flex", alignItems: "center" }}
        underline="hover"
        color="inherit"
        href={url}>
        {nameOfRoute[url]}
      </Link>
    }

    return <Typography
      sx={{ display: "flex", alignItems: "center" }}
      color="inherit"
      fontWeight={600}>
      {nameOfRoute[url]}
    </Typography>
  })

  return <Breadcrumbs>
    <Link
      underline="hover"
      sx={{ display: 'flex', alignItems: 'center' }}
      color="inherit"
      href="/"
    >
      <HomeOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
    </Link>
    {extraItem}
  </Breadcrumbs>

}