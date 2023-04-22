import { FiberManualRecord } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";

import React from "react";

const ExperienceDetails = ({ data }) => {
  const startDateProps = new Date(data?.startDate);
  const endDateProps = new Date(data?.endDate);

  const formattedStartDate = startDateProps.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedEndDate = endDateProps.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedDateRange = `Start Date-${formattedStartDate} End Date-${formattedEndDate}`;

  // console.log(formattedDateRange);

  // console.log("props experience comp", data);
  return (
    <Grid>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <FiberManualRecord sx={{ fontSize: "10px" }} />
        <Typography
          sx={{
            fontFamily: "serif",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {data?.company} - {data?.position}
        </Typography>
      </Stack>
      <Grid item aria-label="other_experienceData" marginLeft={"20px"}>
        <Typography
          sx={{
            fontFamily: "serif",
            textTransform: "capitalize",
          }}
        >
          {data?.location}
        </Typography>
        <Typography
          sx={{
            fontFamily: "serif",
            textTransform: "capitalize",
          }}
        >
          {formattedDateRange}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ExperienceDetails;
