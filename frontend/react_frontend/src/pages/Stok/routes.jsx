import {StokTanitimKarti, StokTanitimKartiDetail} from './KartlarVeReceteler/StokTanitimKartlari/index';

const stokRoutes = [
  {
    path: '/Product',
    element: <StokTanitimKarti />,
  },
  {
    path: '/Product/:id',
    element: <StokTanitimKartiDetail />,
  },
];

export default stokRoutes;
