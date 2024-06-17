import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@mui/icons-material";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate(-1)} variant="contained">
        <ArrowLeft />
        BACK
      </Button>
    </div>
  );
};

export default BackButton;
