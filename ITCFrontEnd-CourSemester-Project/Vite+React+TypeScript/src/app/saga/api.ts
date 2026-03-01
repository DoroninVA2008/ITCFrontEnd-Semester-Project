// api.ts
export const fetchDataApi = async () => {
  const response = await fetch(`https://155-212-132-55.sslip.io/api/objects/get-objects-list`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // возвращает уже распарсенный JSON
};