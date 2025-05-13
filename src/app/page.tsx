import { redirect } from "next/navigation";

export default function Home() {
  redirect("/albums?current=1&pageSize=10");
}
