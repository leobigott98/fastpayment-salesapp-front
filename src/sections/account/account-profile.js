import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth-context';

export const AccountProfile = () => {
  const {user} = useContext(AuthContext);
  return(
    <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          //src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {user? user.name: ''} {user? user.lastname:''}
        </Typography>
        {/* <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.user_status} {user.user_role}
        </Typography> */}
      </Box>
    </CardContent>
    {/* <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
  )
  
        };
