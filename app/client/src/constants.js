export const MIN_ZOOM = 6;
export const MOBILE_MIN_ZOOM = 5;
export const MAX_ZOOM = 12;
export const MARGIN_TOP = 5;
export const MARGIN_RIGHT = 5;
export const MARGIN_BOTTOM = 5;
export const MARGIN_LEFT = 5;
export const HOVER_DISTANCE = 30;
export const GMAP_API_KEY = 'AIzaSyC0v47qIFf6pweh1FZM3aekCv-dCFEumds';
export const DEFAULT_ZOOM = 6;
export const MOBILE_DEFAULT_ZOOM = 5;
export const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
export const DEFAULT_CENTER = IS_MOBILE ? {
  lat: 13.396770346019721,
  lng: 121.8520397949219,
} : {
  lat: 12.71182110595629,
  lng: 121.3246960449219,
};
export const URL_KEYS = {
  key: 'AIzaSyC0v47qIFf6pweh1FZM3aekCv-dCFEumds',
  libraries: 'places',
  v: '3.30',
};
export const MAPS_CONTROL_STYLE = 1;
export const MAPS_POSITION_LEFT_BOTTOM = 6;
export const MAPS_POSITION_BOTTOM_LEFT = 10;
export const DATE_FORMAT = 'MM/DD/YYYY';
