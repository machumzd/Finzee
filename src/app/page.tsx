"use client";
import {
  CardWrapper,
  CustomButton,
} from "@/components/common/Common.styles";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const AppPage = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/auth");
  };

  return (
    <Stack
      p={3}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CardWrapper>
        <Typography variant="h1">welcome to Finzee</Typography>
        <CustomButton onClick={handleLoginClick}>Log in</CustomButton>
      </CardWrapper>
    </Stack>
  );
};

export default AppPage;
