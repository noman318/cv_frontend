import { Button, Grid, Typography } from "@mui/material";
import React from "react";

function NotFoundScreen() {
  return (
    <Grid sx={{ height: "100dvh" }}>
      <Typography variant="h3">404 Page Not Found</Typography>
      <Typography variant="h6">
        The page you requested could not be found.
        <Button variant="text" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </Typography>
    </Grid>
  );
}

export default NotFoundScreen;
