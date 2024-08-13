"use client"
import { Button } from "@/components/ui/button"
import { FlipWordsIntro } from "@/components/ui/flip-words"
import { BackgroundGradientAnimation } from "@/components/ui/gradient-background"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowBigRight } from "lucide-react"
import GradientCard from "@/components/custom/gradientCard"

export default function Dashboard() {
	const [roomCode, setRoomCode] = useState<string>("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setRoomCode(value)
	}       

	const validateRoomCode = (value: string) => {
		if (value.length > 4) {
			return false
		}
		return true
	}

	const router = useRouter()

	return (
		<BackgroundGradientAnimation>
			<div className="flex justify-between items-center">
				<div className="w-[50%] items-center h-[100vh] flex-col justify-center pl-20">
					<FlipWordsIntro />
					<div className="flex gap-8  font-montserrat ">
						<Input
							className="w-[400px] min-h-[50px] relative z-10 text-xl text-center text-black"
							name="roomCode"
							placeholder="Enter room code"
							value={roomCode}
							onChange={handleChange}
						/>
						<Button
							className="px-8  relative z-10 py-[25px] text-lg"
							variant="default"
							disabled={validateRoomCode(roomCode)}
							onClick={() => router.push(`/room/${roomCode}`)}>
							<ArrowBigRight />
						</Button>
					</div>
				</div>
				<div className="w-[50%] items-center h-[100vh] flex justify-center pr-20">
					<div className="flex-col">
						<GradientCard
							title="Play with PC"
							link="/play/computer">
							<ComputerSVG />
						</GradientCard>
						<div className="py-8"></div>
						<GradientCard
							title="Play Online"
							link="/play/online">
							<PlayOnlineSVG />
						</GradientCard>
					</div>
				</div>
			</div>
		</BackgroundGradientAnimation>
	)
}

const ComputerSVG = () => {
	return (
		<svg
			width="77px"
			height="77px"
			viewBox="0 0 1024 1024"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			fill="#000000">
			<g
				id="SVGRepo_bgCarrier"
				stroke-width="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				<path
					d="M511.3 676.9m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"
					fill="#E73B37"></path>
				<path
					d="M960 756V138.5H64V756h320.1v85.5H256.2v44h511.9v-44h-128V756H960zM108 182.5h808v427.1H108V182.5z m488.1 659h-168V756h168v85.5zM108 712v-82.5h808V712H108z"
					fill="#39393A"></path>
				<path
					d="M167.536 327.703l90.72-90.721 14.143 14.142-90.721 90.72zM172.959 423.469l181.159-181.16 14.142 14.143L187.1 437.61z"
					fill="#E73B37"></path>
			</g>
		</svg>
	)
}

const PlayOnlineSVG = () => {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 32 32"
			width="84px"
			height="84px"
			fill="#292929">
			<style type="text/css"></style>
			<path d="M27.4,19.2c0.4-1.3,0.6-2.7,0.6-4.2c0-7.7-6.3-14-14-14S0,7.3,0,15c0,6.2,4.1,11.7,10.1,13.4C11.2,30,13,31,15,31 c1.2,0,2.3-0.3,3.3-1h4.4c1,0.7,2.1,1,3.3,1c3.3,0,6-2.7,6-6C32,22.2,30,19.8,27.4,19.2z M25.9,14h-5c-0.1-4.2-1.2-7.9-2.8-10.2 C22.5,5.4,25.6,9.3,25.9,14z M9.8,3.8C8.2,6.1,7.2,9.8,7,14h-5C2.4,9.3,5.5,5.4,9.8,3.8z M2,16h5c0.1,3.4,0.8,6.6,2,8.9 c0,0,0,0.1,0,0.1c0,0.3,0,0.6,0.1,1C5.1,24.2,2.4,20.4,2,16z M17,26h-1v1c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1h-1c-0.6,0-1-0.4-1-1 s0.4-1,1-1h1v-1c0-0.6,0.4-1,1-1s1,0.4,1,1v1h1c0.6,0,1,0.4,1,1S17.6,26,17,26z M18.5,20h-0.2c-1-0.7-2.1-1-3.3-1 c-2.1,0-4,1.1-5.1,2.8C9.4,20.1,9.1,18.1,9,16H19C18.9,17.4,18.8,18.7,18.5,20z M9,14c0.2-6.5,2.7-11,5-11s4.7,4.5,5,11H9z M20.6,20 c0.2-1.3,0.4-2.6,0.4-4h5c-0.1,1-0.3,2.1-0.7,3.1c-0.9,0.1-1.8,0.4-2.6,0.9H20.6z M25.9,26.4c-0.1,0.1-0.1,0.2-0.2,0.3 c-0.1,0.1-0.2,0.2-0.3,0.2S25.1,27,25,27c-0.1,0-0.3,0-0.4-0.1c-0.1,0-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.2-0.3 c0-0.1-0.1-0.3-0.1-0.4s0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.2-0.2,0.3-0.2c0.4-0.2,0.8-0.1,1.1,0.2 c0.1,0.1,0.2,0.2,0.2,0.3c0,0.1,0.1,0.3,0.1,0.4S26,26.3,25.9,26.4z M27.7,24.7C27.5,24.9,27.3,25,27,25c-0.1,0-0.3,0-0.4-0.1 c-0.1,0-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.2-0.3c0-0.1-0.1-0.3-0.1-0.4c0-0.3,0.1-0.5,0.3-0.7c0.1-0.1,0.2-0.2,0.3-0.2 C26.8,23,27,23,27.2,23c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.1c0.2,0.2,0.3,0.5,0.3,0.7 C28,24.3,27.9,24.5,27.7,24.7z" />
		</svg>
	)
}
