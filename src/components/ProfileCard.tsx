// IMPORTS
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { UserProfile } from "../models/UserProfile";
import axios from "axios";

// STYLES
const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1"
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499"
  }
};

//APP
export default function ProfileCard(props: any) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getUserProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const response = await axios.get('https://ccmernapp-11a99251a1a7.herokuapp.com/api/user', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        const user = response.data.data;

        const userProfile: UserProfile = {
          userId: user.userId,
          userName: user.userName,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        setUserProfile(userProfile);
      }
    } catch (error) {
      setErrorMessage('Some thing went wrong, please try again.');
    }
  };
  
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Card variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* CARD HEADER START */}
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          {/* PROFILE PHOTO */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <PhotoCameraIcon
                sx={{
                  border: "5px solid white",
                  backgroundColor: "#ff558f",
                  borderRadius: "50%",
                  padding: ".2rem",
                  width: 35,
                  height: 35
                }}
              ></PhotoCameraIcon>
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
            ></Avatar>
          </Badge>

          {/* DESCRIPTION */}
          <Typography variant="h6">{props.name}</Typography>
          <Typography color="text.secondary">{props.sub}</Typography>
        </Grid>
        {/* CARD HEADER END */}

        {/* DETAILS */}
        <Grid container>
          <Grid item xs={6}>
            <Typography style={styles.details}>User Id:</Typography>
            <Typography style={styles.details}>User name:</Typography>
            <Typography style={styles.details}>Email:</Typography>
            <Typography style={styles.details}>First name:</Typography>
            <Typography style={styles.details}>Last name:</Typography>
          </Grid>

          {/* VALUES */}
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography style={styles.value}>{userProfile?.userId}</Typography>
            <Typography style={styles.value}>{userProfile?.userName}</Typography>
            <Typography style={styles.value}>{userProfile?.email}</Typography>
            <Typography style={styles.value}>{userProfile?.firstName}</Typography>
            <Typography style={styles.value}>{userProfile?.lastName}</Typography>

          </Grid>
        </Grid>
      </Grid>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </Card>


  );
}
