import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

export const items = [
  /* {
    title: 'Overview',
    path: '/overview',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  }, */
  {
    title: 'Clientes',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <AddBusinessIcon />
      </SvgIcon>
    )
  },
 /*  {
    title: 'Companies',
    path: '/companies',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  }, */
  {
    title: 'Productos',
    path: '/inventory',
    icon: (
      <SvgIcon fontSize="small">
        <PointOfSaleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Tranred',
    path: '/tranred',
    icon: (
      <SvgIcon fontSize="small">
        <CurrencyExchangeIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Facturación',
    path: '/billing',
    icon: (
      <SvgIcon fontSize="small">
        <RequestQuoteIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Usuarios',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Perfil',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
/*   {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  }, */
/*   {
    title: 'Login',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  }, */
  /* {
    title: 'Register',
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  }, */
/*   {
    title: 'Error',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  } */
];
