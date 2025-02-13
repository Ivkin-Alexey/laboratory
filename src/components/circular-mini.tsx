import { Box, CircularProgress } from "@mui/material";

export default function MiniCircular() {
    return (
        <Box
          sx={{display: "flex", justifyContent: "center"}}
        >
          <CircularProgress size="30px" />
        </Box>
      )
}