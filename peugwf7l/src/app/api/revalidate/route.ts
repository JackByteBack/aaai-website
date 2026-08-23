import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export function POST() {
	revalidateTag("prismic", "max")

	return NextResponse.json({ revalidated: true, now: Date.now() })
}
