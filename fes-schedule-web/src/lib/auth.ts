import { api } from "./api";

export async function csrf() {
  // 204が返る想定。XSRF-TOKEN cookie をセットする。
  await api.get("/sanctum/csrf-cookie");
}

export async function login(email: string, password: string) {
  //await csrf();// Breeze/Fortifyの通常ログインエンドポイント
  await api.get("/sanctum/csrf-cookie"); // 最初にCSRF cookieを取得
  await api.post("/login", { email, password });
}

export async function logout() {
  await api.post("/logout");
}

export async function me() {
  return (await api.get("/api/user")).data;
}

export async function fetchMe() {
  const res = await api.get("/api/user");
  return res.data;
}