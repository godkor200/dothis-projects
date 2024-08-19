import CryptoJS from 'crypto-js';

const baseURL = 'https://api.searchad.naver.com';
const requestURL = '/keywordstool';
const reqeustMethod = 'GET';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const queryParams = url.searchParams;

  const hintKeywords = queryParams.get('baseKeyword');

  const timestamp = new Date().getTime();

  const signaturePayload = timestamp + '.' + reqeustMethod + '.' + requestURL;

  const signatue = CryptoJS.HmacSHA256(
    signaturePayload,
    process.env.NAVER_ADS_SECRET_KEY!,
  ).toString(CryptoJS.enc.Base64);

  const params = {
    hintKeywords: '만화책,기안84',
  };

  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(`${baseURL}${requestURL}?${queryString}`, {
    method: 'GET',
    headers: {
      'X-Timestamp': String(timestamp),
      'X-API-KEY': process.env.NAVER_ADS_ACCESS_KEY!,
      'X-Customer': process.env.NAVER_ADS_CUSTOMER_ID!,
      'X-Signature': signatue,
      // 'X-Naver-Client-Id': process.env.NAVER_API_ID!,
      // 'X-Naver-Client-Secret': process.env.NAVER_API_PWD!,
      // 'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return Response.json({ data });
}

async function generateHmacSHA256(base_str: string, secretkey: string) {
  // Convert the secret key and base string to ArrayBuffers
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretkey);
  const messageData = encoder.encode(base_str);

  // Import the key
  const key = await crypto.subtle.importKey(
    'raw', // Key format
    keyData, // Raw key data
    { name: 'HMAC', hash: { name: 'SHA-256' } }, // Key algorithm and hash function
    false, // Key is not extractable
    ['sign'], // Key is used for signing
  );

  // Generate the HMAC
  const signature = await crypto.subtle.sign(
    'HMAC', // Algorithm name
    key, // Key to use
    messageData, // Data to sign
  );

  // Convert the signature to a Base64 string
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

// Example usage
// generateHmacSHA256(base_str, secretkey).then((hmac) => console.log(hmac));
