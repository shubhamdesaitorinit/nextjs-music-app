import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface NavigationProps {
  handleCloseDrawer: () => void;
}
// Work in Progress

const SideBar = ({ handleCloseDrawer }: NavigationProps): JSX.Element => {
  const handleRedirect = (pathname: string): void => {
    handleCloseDrawer();
  };

  return (
    <Box width={"100%"} sx={{ padding: "16px" }}>
      <Typography>Navigation</Typography>

      <Link href={"/songs"}>
        <Typography
          sx={{ width: "100" }}
          onClick={() => {
            handleRedirect("home");
          }}
        >
          Home
        </Typography>
      </Link>
    </Box>
  );
};

export default SideBar;
