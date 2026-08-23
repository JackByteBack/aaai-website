import { Content, isFilled } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"

export type CardGridProps = SliceComponentProps<Content.CardGridSlice>

export default function CardGrid(props: CardGridProps) {
	const { slice } = props

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="mx-auto mt-20 grid w-[calc(100%-48px)] max-w-[1248px] gap-8 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-14"
		>
			{slice.primary.cards.map((card) => (
				<article
					key={card.title}
					className="overflow-hidden rounded-lg bg-[#ededed]"
				>
					<div className="flex min-h-[191px] flex-col p-8 text-black">
						{isFilled.keyText(card.title) && (
							<h2 className="text-lg font-medium leading-none tracking-[-0.72px]">
								{card.title}
							</h2>
						)}
						{isFilled.richText(card.description) && (
							<div className="mt-4 text-sm font-normal leading-6 tracking-[-0.56px] [&_a]:underline [&_p]:m-0">
								<PrismicRichText field={card.description} />
							</div>
						)}
					</div>

					<CardImage card={card} />
				</article>
			))}
		</section>
	)
}

interface CardImageProps {
	card: Content.CardGridSliceDefaultPrimaryCardsItem
}

function CardImage(props: CardImageProps) {
	const { card } = props

	if (isFilled.image(card.image)) {
		return (
			<PrismicNextImage
				field={card.image}
				className="aspect-379/370 w-full object-cover"
				fallbackAlt=""
			/>
		)
	}

	return (
		<div className="aspect-379/370 w-full bg-[#ededed]" aria-hidden="true" />
	)
}
