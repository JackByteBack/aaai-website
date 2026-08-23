import { Content, isFilled } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import Link from "next/link"

export type HeroProps = SliceComponentProps<Content.HeroSlice>

export default function Hero(props: HeroProps) {
	const { slice } = props

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="relative h-[760px] overflow-hidden bg-white sm:h-[860px] lg:h-[1024px]"
		>
			<Link
				href="https://prismic.io"
				className="absolute left-1/2 top-8 z-20 inline-flex h-[31px] w-[119px] -translate-x-1/2"
				aria-label="Home"
			>
				{isFilled.image(slice.primary.logo) && (
					<PrismicNextImage
						field={slice.primary.logo}
						className="size-full object-contain"
						sizes="119px"
						priority
						fallbackAlt=""
					/>
				)}
			</Link>

			<div className="absolute inset-x-0 top-[390px] h-[600px] lg:top-[512px] lg:h-[1475px]">
				{isFilled.image(slice.primary.background_image) ?
					<PrismicNextImage
						field={slice.primary.background_image}
						className="size-full object-cover"
						fallbackAlt=""
					/>
				:	<div className="size-full bg-[#ededed]" aria-hidden="true" />}
			</div>

			<div className="absolute inset-x-6 top-[104px] z-10 flex flex-col items-center sm:top-[118px] lg:top-[132px]">
				{isFilled.richText(slice.primary.headline) && (
					<div className="font-inter w-full max-w-[624px] text-center text-[52px] font-bold leading-[0.96] tracking-[-2.4px] text-[#0d0d0d] text-balance sm:text-[64px] lg:text-[80px] lg:leading-none lg:tracking-[-3.2px] [&_h1]:m-0 [&_h1]:font-bold [&_h1]:text-inherit">
						<PrismicRichText field={slice.primary.headline} />
					</div>
				)}

				{isFilled.richText(slice.primary.description) && (
					<div className="mt-6 w-full max-w-[486px] text-center text-base leading-6 tracking-[-0.64px] text-[#0d0d0d] sm:mt-8 sm:text-lg lg:mt-[42px] lg:text-xl lg:leading-[27px] lg:tracking-[-0.8px] [&_p]:m-0">
						<PrismicRichText field={slice.primary.description} />
					</div>
				)}
			</div>

			<div className="absolute bottom-0 left-1/2 z-10 w-[calc(100%-32px)] max-w-[1003px] -translate-x-1/2 overflow-hidden rounded-t-[0.5em] shadow-[0_24.889px_23.2px_8px_rgba(0,0,0,0.10)] lg:bottom-auto lg:top-[477px] lg:aspect-[1002.664/546.863]">
				{isFilled.image(slice.primary.interface_image) ?
					<PrismicNextImage
						field={slice.primary.interface_image}
						className="size-full object-cover"
						fallbackAlt=""
					/>
				:	<div
						className="aspect-1066/554 w-full bg-[#ededed]"
						aria-hidden="true"
					/>
				}
			</div>
		</section>
	)
}
