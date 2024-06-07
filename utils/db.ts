import PocketBase from "pocketbase";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

const POCKET_BASE_URL = "http://127.0.0.1:8090";

class DatabaseClient {
  client: PocketBase;

  constructor() {
    this.client = new PocketBase(POCKET_BASE_URL);
  }

  async authenticate(email: string, password: string) {
    try {
      const result = await this.client
        .collection("users")
        .authWithPassword(email, password);
      if (!result?.token) {
        throw JSON.parse(
          JSON.stringify(new Error("Invalid email or password"))
        );
      }
      //this.client.authStore.clear();

      console.log("~~authStore~~~", this.client.authStore);
      console.log("~~~~~");

      cookies().set("token", this.client.authStore.token ?? "", {
        secure: true,
      });
      cookies().set("user", JSON.stringify(this.client.authStore.model), {
        secure: true,
      });
      console.log("Cookies set:", cookies().get("token"), cookies().get("user"));

      return result;

    } catch (err) {
      console.log(" In DB error --- ");
      console.error(err);
      throw JSON.parse(JSON.stringify(new Error("Invalid email or password")));
    }
  }

  async register(username: string, email: string, password: string) {
    try {
      console.log("registering user in db");
      const result = await this.client.collection("users").create({
        username: username,
        email: email,
        password: password,
        passwordConfirm: password,
      });

      return result;
    } catch (err) {
      return err;
    }
  }

  async isAuthenticated(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return false;
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    return this.client.authStore.isValid || false;
  }

  async getUser(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return false;
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    return this.client.authStore.model;
  }
}

const db = new DatabaseClient();

export  default db;
