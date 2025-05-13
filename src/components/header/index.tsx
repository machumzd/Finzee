"use client";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout");
    router.push("/auth");
  };

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        py={1}
        sx={{
          position: "fixed",
          width: "100%",
          backgroundColor: "#dff7e263",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Finzee
        </Typography>
        <Typography
          color="#093030"
          fontWeight={600}
          sx={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          Log out
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Header;
