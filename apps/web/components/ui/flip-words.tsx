"use client"
import React, { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "../../lib/utils"

export function FlipWordsIntro() {
	const words = ["anywhere", "anytime", "with-anyone"]

	return (
		<div className="pt-[14rem] text-[5rem] font-normal font-montserrat text-white dark:text-neutral-800 pb-10 flex items-center">
			<div className=" items-baseline flex-col">
				<span className="flex">
					Play Chess
					<ChessPieceSVG />
				</span>
				<FlipWords words={words} /> <br />
			</div>
		</div>
	)
}




const FlipWords = ({
	words,
	duration = 3000,
	className,
}: {
	words: string[]
	duration?: number
	className?: string
}) => {
	const [currentWord, setCurrentWord] = useState(words[0])
	const [isAnimating, setIsAnimating] = useState<boolean>(false)

	// thanks for the fix Julian - https://github.com/Julian-AT
	const startAnimation = useCallback(() => {
		const word = words[words.indexOf(currentWord) + 1] || words[0]
		setCurrentWord(word)
		setIsAnimating(true)
	}, [currentWord, words])

	useEffect(() => {
		if (!isAnimating)
			setTimeout(() => {
				startAnimation()
			}, duration)
	}, [isAnimating, duration, startAnimation])

	return (
		<AnimatePresence
			onExitComplete={() => {
				setIsAnimating(false)
			}}>
			<motion.div
				initial={{
					opacity: 0,
					y: 10,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					type: "spring",
					stiffness: 100,
					damping: 10,
				}}
				exit={{
					opacity: 0,
					y: -40,
					x: 40,
					filter: "blur(8px)",
					scale: 2,
					position: "absolute",
				}}
				className={cn(
					"z-10 inline-block relative text-left text-[#FFFF00] dark:text-neutral-100 px-2",
					className
				)}
				key={currentWord}>
				{currentWord.split("").map((letter, index) => (
					<motion.span
						key={currentWord + index}
						initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{
							delay: index * 0.08,
							duration: 0.4,
						}}
						className="inline-block">
						{letter}
					</motion.span>
				))}
			</motion.div>
		</AnimatePresence>
	)
}

const ChessPieceSVG = () => {
	return <svg
		fill="#ffffff"
		version="1.1"
		id="Capa_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		width="100px"
		height="100px"
		viewBox="0 0 36.117 36.117"
		xmlSpace="preserve"
		stroke="#ffffff">
		<g
			id="SVGRepo_bgCarrier"
			stroke-width="0"></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"></g>
		<g id="SVGRepo_iconCarrier">
			{" "}
			<g>
				{" "}
				<g>
					{" "}
					<path d="M27.246,9.183c-0.843-0.838-1.69-1.671-2.512-2.529C24.138,6.03,23.6,5.351,22.998,4.732 c-0.298-0.305-0.55-0.61-0.689-1.019C22.1,3.1,21.706,2.628,21.134,2.309c-0.203-0.113-0.396-0.245-0.543-0.339 C20.355,1.286,20.914,0.43,19.967,0c-0.204,0.101-0.438,0.177-0.621,0.316c-0.354,0.27-0.698,0.558-1.015,0.869 c-0.348,0.341-0.708,0.534-1.216,0.638c-1.22,0.246-2.458,0.519-3.599,0.995C10.98,3.88,9.301,5.881,8.105,8.287 c-1.062,2.139-1.275,4.473-0.993,6.788c0.227,1.845,0.683,3.678,1.412,5.417c0.894,2.127,2.076,4.078,3.523,5.873 c0.11,0.135,0.209,0.281,0.308,0.428c-0.565,0.068-1.005,0.549-1.005,1.135v1.143c0,0.053,0.005,0.104,0.012,0.154h-0.258 c-0.634,0-1.148,0.514-1.148,1.148v4.596c0,0.635,0.514,1.148,1.148,1.148h13.076c0.634,0,1.149-0.514,1.149-1.148v-4.596 c0-0.633-0.515-1.148-1.149-1.148h-0.259c0.007-0.051,0.012-0.102,0.012-0.154v-1.143c0-0.631-0.512-1.143-1.143-1.143h-0.1 c0.389-0.359,0.762-0.701,1.109-1.068c1.573-1.656,1.854-4.006,0.75-6.018c-0.54-0.983-1.299-1.78-2.175-2.462 c-0.986-0.767-2.006-1.491-3.001-2.247c-0.284-0.216-0.535-0.474-0.914-0.813c0.938,0.197,1.685,0.452,2.44,0.49 c1.303,0.064,2.427,0.494,3.47,1.249c0.403,0.292,0.871,0.525,1.343,0.687c0.613,0.21,0.919,0.06,1.285-0.492 c0.096-0.145,0.154-0.313,0.246-0.504c0.726,0.01,1.124-0.407,1.324-1.075c0.068-0.228,0.184-0.44,0.268-0.662 c0.564-1.488,0.273-2.806-0.808-3.954C27.785,9.653,27.499,9.435,27.246,9.183z"></path>{" "}
				</g>{" "}
			</g>{" "}
		</g>
	</svg>
}