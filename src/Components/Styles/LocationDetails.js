import { styled } from "@mui/system";
import {Card} from"@mui/material";
export const useStyles = styled((Card) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 400,
    margin: "auto",
  },
  media: {
    width: 300,
    height: 500,
  },
  name: {
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  description: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  location: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
}));



