import { FiberManualRecordOutlined } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

const Educationdetails = ({ data }) => {
  // console.log("props eductional comp", data);
  const startDateProps = new Date(data.startDate);
  const endDateProps = new Date(data.endDate);

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
  // console.log("formattedDateRange", formattedDateRange);
  return (
    <Grid>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <FiberManualRecordOutlined sx={styles.radioIcon} />
        <Typography sx={styles.institutionStyles}>
          institution : {data?.institution}
        </Typography>
      </Stack>
      <Grid item aria-label="other_educationData" marginLeft={"20px"}>
        <Typography sx={styles.otherDataStyles}>
          degree : {data?.degree}
        </Typography>
        <Typography sx={styles.otherDataStyles}>
          Field of study : {data?.fieldOfStudy}
        </Typography>
        <Typography sx={styles.otherDataStyles}>
          Percentage : {data?.percentage}
        </Typography>
        <Typography sx={styles.dateStyles}>{formattedDateRange}</Typography>
      </Grid>
    </Grid>
  );
};

export default Educationdetails;

const styles = {
  radioIcon: { fontSize: "10px" },
  institutionStyles: {
    fontFamily: "serif",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  otherDataStyles: {
    fontFamily: "serif",
    textTransform: "uppercase",
  },
  dateStyles: {
    fontFamily: "serif",
    textTransform: "capitalize",
  },
};
