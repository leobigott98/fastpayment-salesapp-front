import { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { AuthContext } from 'src/contexts/auth-context';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const [userName, setUserName] = useState({});
  const router = useRouter();
  const auth = useAuth();
  const {user} = useContext(AuthContext)

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  useEffect(()=>{
    setUserName({
      name: user.name,
      lastname: user.lastname
    })
  }, [])
  

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Perfil
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {userName.name} {userName.lastname}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Cerrar Sesión
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
