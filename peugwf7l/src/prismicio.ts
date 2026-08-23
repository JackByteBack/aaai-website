import {
	createClient as baseCreateClient,
	type ClientConfig,
} from "@prismicio/client"
import { enableAutoPreviews } from "@prismicio/next"
import prismicConfig from "../prismic.config.json"

type PrismicConfig = typeof prismicConfig &
	Pick<ClientConfig, "documentAPIEndpoint">

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismicConfig.repositoryName

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: ClientConfig = {}) => {
	const typedPrismicConfig = prismicConfig as PrismicConfig

	const staticConfig: ClientConfig = { routes: typedPrismicConfig.routes }
	if (typedPrismicConfig.documentAPIEndpoint) {
		staticConfig.documentAPIEndpoint = typedPrismicConfig.documentAPIEndpoint
	}

	const client = baseCreateClient(repositoryName, {
		...staticConfig,
		fetchOptions:
			process.env.NODE_ENV === "production" ?
				{ next: { tags: ["prismic"] }, cache: "force-cache" }
			:	{ next: { revalidate: 5 } },
		...config,
	})

	enableAutoPreviews({ client })

	return client
}
