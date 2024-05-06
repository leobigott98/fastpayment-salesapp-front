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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import PeopleIcon from '@mui/icons-material/People';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';

export const items = [
  {
    title: 'Clientes',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <AddBusinessIcon />
      </SvgIcon>
    ),
    roles: [1000, 1001, 1002]
  },
  {
    title: 'Ventas',
    path: '/sales',
    icon: (
      <SvgIcon fontSize="small">
        <RequestQuoteIcon />
      </SvgIcon>
    ),
    roles: [1000, 1001, 1002]
  },
  {
    title: 'Tranred',
    path: '/tranred',
    icon: (
      <SvgIcon fontSize="small">
        <CurrencyExchangeIcon />
      </SvgIcon>
    ),
    roles: [1000, 1001, 1002], 
    options: [
      {
        title: 'Aprovisionamiento',
        path: '/tranred/sales',
        icon: (
          <SvgIcon fontSize="small">
            <CloudSyncIcon />
          </SvgIcon>
        ),
      },
      {
        title: 'Clientes',
        path: '/tranred/clients',
        icon: (
          <SvgIcon fontSize="small">
            <PeopleIcon />
          </SvgIcon>
        ),
      },
      {
        title: 'Terminales',
        path: '/tranred/terminals',
        icon: (
          <SvgIcon fontSize="small">
            <SecurityUpdateGoodIcon />
          </SvgIcon>
        ),
      }
    ]
  },
  {
    title: 'Productos',
    path: '/inventory',
    icon: (
      <SvgIcon fontSize="small">
        <PointOfSaleIcon />
      </SvgIcon>
    ),
    roles: [1000, 1003]
  },
  {
    title: 'Usuarios',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    roles: [1000]
  },
  {
    title: 'Perfil',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
    roles: [1000, 1001, 1002, 1003]
  }
];
