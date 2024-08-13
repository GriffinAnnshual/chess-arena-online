import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import MessageContainer from "./messageContainer"
import { PaperPlaneIcon, CrossCircledIcon } from "@radix-ui/react-icons"

export default function ChatContainer({
	openMessage,
	setOpenMessage,
}: {
	openMessage: boolean,
	setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<Card className="w-full bg-gray-500 min-w-[400px] min-h-[400px] p-4 ">
			<CardHeader className="pl-10">
				<div className="w-full flex justify-between">
					<div className="text-3xl font-montserrat">CHAT</div>
					<div>
						<Button
							variant={"link"}
							onClick={() => {
								setOpenMessage(!openMessage)
							}}
							className="py-2">
							<CrossCircledIcon
								height={25}
								width={25}
							/>
						</Button>
					</div>
				</div>
			</CardHeader>
			<hr />
			<CardContent className=" flex-col justify-between p-2 text-center">
				No messages
				<div className="overflow-auto scrollbar h-[300px]">
					{/* <MessageContainer
						message="Hi there"
						image=""
					/>
					<MessageContainer
						message="Hi there"
						image=""
					/>
					<MessageContainer
						message="Hi there"
						image=""
					/>
					<MessageContainer
						message="Hi there"
						image=""
					/>
					<MessageContainer
						message="Hi there"
						image=""
					/> */}
				</div>
				<div className="flex gap-2 py-2">
					<Input placeholder="Enter your message..." />
					<Button className="mx-auto">
						<PaperPlaneIcon />
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}