"use client"
import GameBoard from "@/chess/models/gameBoard"
import ChatContainer from "@/components/custom/chatContainer"
import { SparklesCore } from "@/components/ui/sparkles"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ChatBubbleIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { MessageSquareMore, VideoIcon } from "lucide-react"

export default function RoomPage() {
	const [openMessage, setOpenMessage] = useState<boolean>(false);


	return (
		<div className="w-full relative bg-black h-[100vh] flex items-center justify-center px-20">
			<div className="w-full absolute inset-0 h-screen">
				<SparklesCore
					id="tsparticlesfullpage"
					background="transparent"
					minSize={0.6}
					maxSize={1.4}
					particleDensity={100}
					className="w-full h-full"
					particleColor="#FFFFFF"
				/>
			</div>
			<div className="relative z-10 w-full h-screen justify-between flex items-center">
				<div className="flex w-[50%]">
					<GameBoard />
				</div>
				<div className=" w-[50%] h-screen">
					<div className="w-[30%] fixed bottom-8 right-8 flex items-end">
						{openMessage ? (
							<ChatContainer
								openMessage={openMessage}
								setOpenMessage={setOpenMessage}
							/>
						) : (
							<></>
						)}
					</div>
					<div className="flex w-full gap-4 py-4  justify-end">
						<Button
							onClick={() => {
								setOpenMessage(true)
							}}>
							<VideoIcon />
						</Button>
						<Button
							disabled={openMessage}
							onClick={() => {
								setOpenMessage(true)
							}}>
							<MessageSquareMore />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
