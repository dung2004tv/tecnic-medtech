import { Product } from '../../types';

import { GAY_NANG_PRODUCTS } from './gay_nang';
import { KHUNG_TAP_DI_PRODUCTS } from './khung_tap_di';
import { XE_LAN_PRODUCTS } from './xe_lan';
import { GHE_BO_TAM_PRODUCTS } from './ghe_bo_tam';
import { DAI_NEP_KHOP_PRODUCTS } from './dai_nep_khop';
import { TAY_VIN_CAI_TAO_PRODUCTS } from './tay_vin_cai_tao';
import { SAN_PHAM_HO_TRO_PRODUCTS } from './san_pham_ho_tro';
import { DEM_HOI_CHONG_LOET_PRODUCTS } from './dem_hoi_chong_loet';
import { ROBOT_NANG_HA_PRODUCTS } from './robot_nang_ha';
import { TRI_LIEU_XUNG_DIEN_PRODUCTS } from './tri_lieu_xung_dien';
import { GIUONG_Y_TE_PRODUCTS } from './giuong_y_te';

export const CATALOG_PRODUCTS: Product[] = [
  ...GAY_NANG_PRODUCTS,
  ...KHUNG_TAP_DI_PRODUCTS,
  ...XE_LAN_PRODUCTS,
  ...GHE_BO_TAM_PRODUCTS,
  ...DAI_NEP_KHOP_PRODUCTS,
  ...TAY_VIN_CAI_TAO_PRODUCTS,
  ...SAN_PHAM_HO_TRO_PRODUCTS,
  ...DEM_HOI_CHONG_LOET_PRODUCTS,
  ...ROBOT_NANG_HA_PRODUCTS,
  ...TRI_LIEU_XUNG_DIEN_PRODUCTS,
  ...GIUONG_Y_TE_PRODUCTS
];


