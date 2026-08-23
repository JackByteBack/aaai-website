import { asLink, isFilled, type Content } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"

interface FooterProps {
	data: Pick<
		Content.HomepageDocumentData,
		"footer_copyright_text" | "footer_cookies_link" | "footer_social_links"
	>
}

export function Footer(props: FooterProps) {
	const { data } = props
	const socialLinks = data.footer_social_links ?? []

	return (
		<footer className="font-inter mt-12 border-t border-[#ededed] text-neutral-500">
			<div className="mx-auto flex min-h-[76px] w-[calc(100%-48px)] max-w-[1248px] flex-col items-center justify-between gap-5 py-6 sm:flex-row sm:py-0">
				<div className="flex items-center gap-4 text-sm leading-4">
					{isFilled.keyText(data.footer_copyright_text) && (
						<p>{data.footer_copyright_text}</p>
					)}
					{isFilled.link(data.footer_cookies_link) && (
						<>
							<span aria-hidden="true">•</span>
							<PrismicNextLink
								field={data.footer_cookies_link}
								className="underline-offset-4 hover:underline"
							/>
						</>
					)}
				</div>

				<nav aria-label="Social media">
					<ul className="flex gap-4">
						{socialLinks.map((link) => (
							<li key={`${link.text}-${asLink(link)}`}>
								{isFilled.link(link) && (
									<PrismicNextLink
										field={link}
										aria-label={link.text || "Social media"}
										className="flex size-7 items-center justify-center transition-colors hover:text-black"
									>
										<SocialIcon variant={link.variant} />
									</PrismicNextLink>
								)}
							</li>
						))}
					</ul>
				</nav>
			</div>
		</footer>
	)
}

interface SocialIconProps {
	variant: "X" | "YouTube" | "GitHub" | "LinkedIn" | undefined
}

function SocialIcon(props: SocialIconProps) {
	const { variant } = props

	switch (variant) {
		case "X":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="none"
					aria-hidden="true"
				>
					<path
						fill="currentColor"
						d="M12.163 1.5h2.206L9.55 7.006l5.669 7.494H10.78L7.303 9.956 3.328 14.5h-2.21l5.154-5.89L.838 1.5h4.55l3.14 4.153zm-.776 11.681h1.222L4.722 2.75H3.409z"
					/>
				</svg>
			)
		case "YouTube":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="none"
					aria-hidden="true"
				>
					<path
						fill="currentColor"
						d="M2.518 3.24a33.5 33.5 0 0 1 10.281-.105l.707.11.026.007a1.83 1.83 0 0 1 1.248 1.17l.035.113.004.014.003.014a16.6 16.6 0 0 1 0 6.873l-.003.015-.004.014a1.83 1.83 0 0 1-1.283 1.284l-.026.006-.025.004c-3.63.602-7.334.602-10.963 0l-.025-.004-.026-.006a1.83 1.83 0 0 1-1.283-1.284l-.004-.014-.088-.44a16.6 16.6 0 0 1 .085-6.448l.003-.014.004-.014a1.83 1.83 0 0 1 1.283-1.283l.026-.007zm10.764.981a32.5 32.5 0 0 0-10.566 0 .83.83 0 0 0-.563.564 15.6 15.6 0 0 0 0 6.43.831.831 0 0 0 .563.563 32.5 32.5 0 0 0 10.566 0 .83.83 0 0 0 .354-.208c.1-.1.172-.225.211-.361a15.6 15.6 0 0 0 0-6.418.83.83 0 0 0-.565-.57m-6.359 1.35L10.971 8l-4.805 2.882V5.117zm.243 3.545L9.028 8 7.166 6.883z"
					/>
				</svg>
			)
		case "GitHub":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="none"
					aria-hidden="true"
				>
					<path
						fill="currentColor"
						d="M6.5 14.667a.5.5 0 0 1-1 0v-1.951c-.512.149-.965.189-1.376.134-.593-.078-1.04-.34-1.398-.627a7 7 0 0 1-.471-.423c-.144-.14-.262-.256-.38-.359-.237-.205-.392-.274-.542-.274a.5.5 0 1 1 0-1c.516 0 .903.264 1.196.517.146.127.29.27.42.397.137.131.266.253.402.362.268.214.548.37.904.416.301.04.695.005 1.224-.188a3.7 3.7 0 0 1 .34-1.578c-1.89-.327-3.636-1.737-3.652-4.061a4.1 4.1 0 0 1 .63-2.466 5.1 5.1 0 0 1 .052-2.36l.097-.373h.387v.5-.5h.031l.047.004q.054.005.139.02c.113.021.266.06.459.133.35.132.833.373 1.446.812a14.9 14.9 0 0 1 5.089 0c.613-.44 1.095-.68 1.447-.812.192-.072.345-.112.458-.133q.084-.015.14-.02l.046-.003.018-.001h.013v.29-.29h.393l.093.382c.188.77.202 1.571.047 2.347A4.1 4.1 0 0 1 13.833 6c0 2.345-1.757 3.767-3.656 4.094.276.597.39 1.262.323 1.927v2.646a.5.5 0 1 1-1 0v-2.695l.003-.027a2.7 2.7 0 0 0-.563-1.969l-.638-.81h1.03c1.814 0 3.502-1.19 3.502-3.166v-.032a3.1 3.1 0 0 0-.575-2.011l-.132-.186.053-.223a4.4 4.4 0 0 0 .092-1.593c-.285.115-.72.34-1.305.778l-.177.132-.217-.041a13.9 13.9 0 0 0-5.147 0l-.216.041-.177-.132c-.59-.442-1.028-.666-1.314-.781a4.1 4.1 0 0 0 .097 1.588l.06.227-.137.19a3.1 3.1 0 0 0-.574 2.01V6c0 1.975 1.688 3.167 3.5 3.167h1.038l-.646.811a2.64 2.64 0 0 0-.56 1.966l.003.028z"
					/>
				</svg>
			)
		case "LinkedIn":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="none"
					aria-hidden="true"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						d="M13.496 6.505a4 4 0 0 0-6.83 2.828V14h2.667V9.333a1.333 1.333 0 0 1 2.667 0V14h2.667V9.333a4 4 0 0 0-1.171-2.828ZM4 6H1.333v8H4zM2.666 4a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667Z"
					/>
				</svg>
			)
		default:
			return null
	}
}
