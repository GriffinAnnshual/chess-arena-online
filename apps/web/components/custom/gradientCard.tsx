import Link from "next/link";
import { BackgroundGradient } from "../ui/outline-gradient-card";
import ReactNode from 'react';

export default function GradientCard({children, title, link}: {children:React.ReactNode, title: string, link: string}){
    return (
			<Link href={link}>
				<BackgroundGradient className="rounded-[22px] m-2 max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
					<div className="w-full gap-8 justify-center flex">
						{children}
						<p className="text-base font-montserrat  sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
							{title}
						</p>
					</div>
				</BackgroundGradient>
			</Link>
		)
}