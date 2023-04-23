import { CircularProgress, Grid } from "@mui/material";

function Loader() {
  return (
    <Grid sx={styles.loaderComponentStyles}>
      <CircularProgress color="secondary" />
    </Grid>
  );
}

export default Loader;
const styles = {
  loaderComponentStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};
