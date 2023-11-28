import { PublicGuard } from 'src/guards/public-guard';

export const withPublicGuard = (Component) => (props) => (
  <PublicGuard>
    <Component {...props} />
  </PublicGuard>
);