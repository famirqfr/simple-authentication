export async function fetchRandomUser() {
  const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
  if (!res.ok) throw new Error("Failed to fetch user");
  const data = await res.json();
  const r = data?.results?.[0];
  return {
    name: `${r?.name?.first ?? ""} ${r?.name?.last ?? ""}`.trim(),
    email: r?.email ?? "",
    picture: r?.picture?.large ?? r?.picture?.medium ?? "",
  };
}
