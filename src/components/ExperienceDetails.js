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
        <FiberManualRecord sx={styles.radioIcon} />
        <Typography sx={styles.companyStyles}>
          {data?.company} - {data?.position}
        </Typography>
      </Stack>
      <Grid item aria-label="other_experienceData" marginLeft={"20px"}>
        <Typography sx={styles.otherDataStyles}>{data?.location}</Typography>
        <Typography sx={styles.otherDataStyles}>
          {formattedDateRange}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ExperienceDetails;
const styles = {
  radioIcon: { fontSize: "10px" },
  companyStyles: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  otherDataStyles: {
    textTransform: "capitalize",
  },
  dateStyles: {
    textTransform: "capitalize",
  },
};
