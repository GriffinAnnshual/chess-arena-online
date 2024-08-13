import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";

export default function MessageContainer({image, message}: {image: string, message: string}){
    return (
			<Card className="w-full flex border my-4 border-black">
				<div className="h-full w-[10%] p-4 flex items-start">
					<Avatar>
						<AvatarImage src={image ? "https://github.com/shadcn.png": image} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
				<CardContent className="w-full ">
                    <div className="p-4">
                           {message} 
                    </div>
                </CardContent>
			</Card>
		)
}