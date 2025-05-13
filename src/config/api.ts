export const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export const getHeaders = async (): Promise<HeadersInit> => {
  const res = await fetch("/api/get-cookie");
  const data = await res.json();
  const token = data.token;

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
