'use client';

import { useEffect } from 'react';

import { isServer } from '@/constants/dev';

const LoginCookie = () => {
  useEffect(() => {
    if (!isServer) {
      function setCookie(cname: string, cvalue: string, exdays: number) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = 'expires=' + d.toUTCString();
        const domain = '.dothis.kr';
        document.cookie =
          cname +
          '=' +
          cvalue +
          ';' +
          expires +
          ';path=/;' +
          'domain=' +
          domain +
          'SameSite=None; secure;';
      }
      setCookie('env', 'local', 60);
    }
  }, []);

  return (
    <>
      <div>
        <img src="https://api.dothis.kr" />
      </div>
    </>
  );
};

export default LoginCookie;
