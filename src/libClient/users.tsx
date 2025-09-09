export type userData = {
  idusers: number;
  fullname: string;
  email: string;
  idClerk: string;
};
export async function getUsers() {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let value = [];
  const res = await fetch(`/api/users`, postData);

  if (res.ok) {
    const resp = await res.json();
    value = resp.results;
  }
  return value;
}
