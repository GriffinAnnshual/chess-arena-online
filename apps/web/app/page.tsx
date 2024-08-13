"use client"
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";


export default function Home() {
  const router = useRouter()
  return (
		<section className={"w-full h-[100vh] flex justify-center items-center"}>
			<Button
				variant="default"
				onClick={() => router.push("/dashboard")}>
				Play Chess
			</Button>
			<Toaster
				position="bottom-right"
				reverseOrder={true}
			/>
		</section>
	)
}
