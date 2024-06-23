import { styled, Button, ButtonProps } from "@mui/material";
import React from "react";

const StyleButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  lineHeight: 1.5,
  backgroundColor: "#17c2af",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#17c2af",
    boxShadow: "none",
  },
});

interface StyledButtonProps extends ButtonProps {
  title: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({ title, ...props }) => {
  return (
    <StyleButton variant="contained" disableRipple {...props}>
      {title}
    </StyleButton>
  );
};

export default StyledButton;
