// import React from "react";
// import "./DisplayCard.css";

// export const DisplayCard = ({ place }) => {
//   return (
//     <div className="card">
//       <img
//         src={
//           place.photo
//             ? place.photo.images.large.url
//             : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
//         }
//         alt={place.name}
//       />
//       <h3>{place.name}</h3>
//       <div className="rating">
//         <span>Rating: {place.rating}</span>
//       </div>
//       <div>
//         <span>
//           {place.num_reviews} review{place.num_reviews > 1 && "s"}
//         </span>
//       </div>
//       <div className="badge">
//         {place?.awards?.map((award) => (
//           <div key={award.display_name}>
//             <img src={award.images.small} alt={award.display_name} />
//             <span>{award.display_name}</span>
//           </div>
//         ))}
//       </div>
//       <div className="cuisine">
//         Cusine:
//         {place?.cuisine?.map(({ name }) => (
//           <span key={name}>{name} </span>
//         ))}
//       </div>
//       <div className="address">
//         {place.address && <span>{place.address}</span>}
//       </div>
//       <div className="phone">{place.phone && <span>{place.phone}</span>}</div>
//       <div className="buttons">
//         <button onClick={() => window.open(place.web_url, "_blank")}>
//           Trip Advisor
//         </button>
//         <button onClick={() => window.open(place.website, "_blank")}>
//           Website
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DisplayCard;

import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Rating from "@mui/material/Rating";

import useStyles from "./styles.js";

const DisplayCard = ({ key, type, place }) => {
  // if (selected)
  //   refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const classes = useStyles(Card);
  let photoUrl = "";
  if (type === "attractions") {
    photoUrl =
      "https://img.freepik.com/free-vector/madrid-concept-illustration_114360-3213.jpg?size=626&ext=jpg&ga=GA1.2.233956569.1687154958&semt=ais";
  } else {
    photoUrl =
      "https://img.freepik.com/free-vector/hotel-staff-concept-illustration_114360-17168.jpg?size=626&ext=jpg&ga=GA1.1.233956569.1687154958&semt=sph";
  }
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : photoUrl}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">
            {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </Typography>
        </Box>
        {type !== "attractions" && (
          <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Price</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.price_level}
            </Typography>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box
            display="flex"
            justifyContent="space-between"
            my={1}
            alignItems="center"
          >
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.web_url, "_blank")}
        >
          Trip Advisor
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
        >
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default DisplayCard;
