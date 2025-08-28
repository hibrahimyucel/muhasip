export type user = {
  idusers: number;
  fullname: string;
  email: string;
  idClerk: string;
  imgUrl: string;
};
export async function getUsers() {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, postData);
  const resp = await res.json();
  let usersp = [];
  if (res.ok) {
    usersp = resp.results;
  }
  return usersp;
}
