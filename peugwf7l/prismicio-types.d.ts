import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type HomepageDocumentDataSlicesSlice = HeroSlice | ResourceLinksSlice | CardGridSlice

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
	/**
	 * Slice Zone field in *Homepage*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: homepage.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: homepage.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;/**
	 * Copyright Text field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.footer_copyright_text
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	footer_copyright_text: prismic.KeyTextField;
	
	/**
	 * Cookies Link field in *Homepage*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.footer_cookies_link
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	footer_cookies_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Social Links field in *Homepage*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.footer_social_links
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	footer_social_links: prismic.Repeatable<prismic.LinkField<string, string, unknown, prismic.FieldState, "X" | "YouTube" | "GitHub" | "LinkedIn">>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomepageDocumentData>, "homepage", Lang>;

export type AllDocumentTypes = HomepageDocument;

/**
 * Item in *Card Grid → Default → Primary → Cards*
 */
export interface CardGridSliceDefaultPrimaryCardsItem {
	/**
	 * Title field in *Card Grid → Default → Primary → Cards*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.cards[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *Card Grid → Default → Primary → Cards*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.cards[].description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *Card Grid → Default → Primary → Cards*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.cards[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Primary content in *Card Grid → Default → Primary*
 */
export interface CardGridSliceDefaultPrimary {
	/**
	 * Cards field in *Card Grid → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.cards[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	cards: prismic.GroupField<Simplify<CardGridSliceDefaultPrimaryCardsItem>>;
}

/**
 * Default variation for Card Grid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CardGridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<CardGridSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Card Grid*
 */
type CardGridSliceVariation = CardGridSliceDefault

/**
 * Card Grid Shared Slice
 *
 * - **API ID**: `card_grid`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CardGridSlice = prismic.SharedSlice<"card_grid", CardGridSliceVariation>;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Headline field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	headline: prismic.RichTextField;
	
	/**
	 * Description field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Background Image field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.background_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	background_image: prismic.ImageField<never>;
	
	/**
	 * Interface Image field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.interface_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	interface_image: prismic.ImageField<never>;
	
	/**
	 * Logo field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero section with text, image, and buttons
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Item in *Resource Links → Default → Primary → Resources*
 */
export interface ResourceLinksSliceDefaultPrimaryResourcesItem {
	/**
	 * Title field in *Resource Links → Default → Primary → Resources*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: resource_links.default.primary.resources[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *Resource Links → Default → Primary → Resources*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: resource_links.default.primary.resources[].description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;
	
	/**
	 * Link field in *Resource Links → Default → Primary → Resources*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: resource_links.default.primary.resources[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *Resource Links → Default → Primary*
 */
export interface ResourceLinksSliceDefaultPrimary {
	/**
	 * Resources field in *Resource Links → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: resource_links.default.primary.resources[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	resources: prismic.GroupField<Simplify<ResourceLinksSliceDefaultPrimaryResourcesItem>>;
	
	/**
	 * Call to Action Heading field in *Resource Links → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: resource_links.default.primary.cta_heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_heading: prismic.KeyTextField;
	
	/**
	 * Call to Action Link field in *Resource Links → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: resource_links.default.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for Resource Links Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ResourceLinksSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ResourceLinksSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Resource Links*
 */
type ResourceLinksSliceVariation = ResourceLinksSliceDefault

/**
 * Resource Links Shared Slice
 *
 * - **API ID**: `resource_links`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ResourceLinksSlice = prismic.SharedSlice<"resource_links", ResourceLinksSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			HomepageDocument,
			HomepageDocumentData,
			HomepageDocumentDataSlicesSlice,
			AllDocumentTypes,
			CardGridSlice,
			CardGridSliceDefaultPrimaryCardsItem,
			CardGridSliceDefaultPrimary,
			CardGridSliceVariation,
			CardGridSliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			ResourceLinksSlice,
			ResourceLinksSliceDefaultPrimaryResourcesItem,
			ResourceLinksSliceDefaultPrimary,
			ResourceLinksSliceVariation,
			ResourceLinksSliceDefault
		}
	}
}