import { Content, isFilled } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"
import { SliceComponentProps } from "@prismicio/react"

export type ResourceLinksProps = SliceComponentProps<Content.ResourceLinksSlice>

export default function ResourceLinks(props: ResourceLinksProps) {
	const { slice } = props

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="mx-auto mt-20 w-[calc(100%-48px)] max-w-[1248px] lg:mt-24"
		>
			<div className="grid gap-6 md:grid-cols-2 lg:gap-[43px]">
				{slice.primary.resources.map((resource) => (
					<article
						key={resource.title}
						className="flex min-h-[191px] flex-col items-start justify-between rounded-lg border border-[#ededed] p-8 text-black"
					>
						<div>
							{isFilled.keyText(resource.title) && (
								<h2 className="text-lg font-semibold leading-none tracking-[-0.72px]">
									{resource.title}
								</h2>
							)}
							{isFilled.keyText(resource.description) && (
								<p className="mt-4 text-sm leading-6 tracking-[-0.56px]">
									{resource.description}
								</p>
							)}
						</div>

						{isFilled.link(resource.link) && (
							<PrismicNextLink
								field={resource.link}
								className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#0d0d0d] px-4 py-2 text-sm leading-6 tracking-[-0.56px] text-[#f4f4f4] transition-colors hover:bg-zinc-700"
							/>
						)}
					</article>
				))}
			</div>

			<div className="mt-12 flex min-h-40 flex-col items-start justify-between gap-6 rounded-2xl bg-[#f8f8f8] px-8 py-10 text-black sm:flex-row sm:items-center lg:px-12 lg:py-[60px]">
				{isFilled.keyText(slice.primary.cta_heading) && (
					<h2 className="text-[28px] leading-6 tracking-[-1.12px]">
						{slice.primary.cta_heading}
					</h2>
				)}
				{isFilled.link(slice.primary.cta_link) && (
					<PrismicNextLink
						field={slice.primary.cta_link}
						className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full bg-[#0d0d0d] px-4 py-2 text-sm leading-6 tracking-[-0.56px] text-[#f4f4f4] transition-colors hover:bg-zinc-700"
					/>
				)}
			</div>
		</section>
	)
}
