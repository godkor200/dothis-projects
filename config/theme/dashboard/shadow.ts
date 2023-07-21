type ThemeShadow =
  | 'grey01'
  | 'grey02'
  | 'grey03'
  | 'grey04'
  | 'black00'
  | 'black01'
  | 'black02'
  | 'black03'
  | 'black04'
  | 'black05'
  | 'primary00'
  | 'primary01'
  | 'primary02'
  | 'primary03'
  | 'primary04'
  | 'primary05';

export const shadow: Record<ThemeShadow, string> = {
  /* grey */
  grey01: '0px 2px 3px 0px rgba(161, 161, 170, 0.10)',
  grey02: '0px 8px 13px 0px rgba(161, 161, 170, 0.12)',
  grey03: '0px 15px 25px 0px rgba(161, 161, 170, 0.12)',
  grey04: '0px 15px 30px 0px rgba(161, 161, 170, 0.15)',

  /* black */
  black00: '0px 2px 3px 0px rgba(0, 0, 0, 0.20)',
  black01: '0px 2px 3px 0px rgba(24, 24, 27, 0.20)',
  black02: '0px 8px 13px 0px rgba(24, 24, 27, 0.20)',
  black03: '0px 15px 25px 0px rgba(24, 24, 27, 0.20)',
  black04: '0px 15px 30px 0px rgba(24, 24, 27, 0.15)',
  black05: '0px 26px 60px 0px rgba(24, 24, 27, 0.20)',

  /* primary */
  primary00: '0px 2px 3px 0px rgba(0, 0, 0, 0.20)',
  primary01: '0px 1px 3px 0px rgba(240, 81, 109, 0.40)',
  primary02: '0px 8px 40px 0px rgba(240, 81, 109, 0.25)',
  primary03: '0px 15px 45px 0px rgba(240, 81, 109, 0.25)',
  primary04: '0px 15px 30px 0px rgba(240, 81, 109, 0.15)',
  primary05: '0px 26px 60px 0px rgba(240, 81, 109, 0.15)',
};
