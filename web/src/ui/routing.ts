import {useMemo} from "preact/hooks"
import {useRoute, type DefaultParams} from "wouter-preact"
import type {ShareId} from "@localfirst/auth-provider-automerge-repo"
import {navigate} from "wouter-preact/use-browser-location"

export function slugify(string: string) {
	return string.replace(/[^0-9A-Za-z_.~-]+/g, "-")
}

export function slug(string: string) {
	slugify(string).slice(0, 32) || "untitled"
}

interface RoutingParts extends DefaultParams {
	spaceId: lb.SpaceId
	fileId: lb.FileId
	projectId: lb.ProjectId
}

type RoutePathOption<T extends lb.NamedDocument> = Pick<T, "id" | "name">

interface RoutePathOptions {
	shareId: ShareId | null
	project?: RoutePathOption<lb.Project>
	file?: RoutePathOption<lb.File>
	area?: RoutePathOption<lb.Area>
	folder?: RoutePathOption<lb.Folder>
}

export function getRoutePath({
	shareId,
	project,
	file,
	area,
	folder,
}: RoutePathOptions) {
	if (!shareId) {
		return "/"
	}
	let path = `/space/${shareId}`
	if (project) {
		path += `/projects/${slug(project.name)}/${project.id}`
	}
	if (file) {
		path += `/files/${slug(file.name)}/${file.id}`
	}
	return path
}

export function route(opts: RoutePathOptions) {
	navigate(getRoutePath(opts))
}

export function useRouting() {
	const [inSpace, spaceParams] = useRoute<RoutingParts>("/space/:shareId/*")

	const [isInbox] = useRoute("/space/:shareId/inbox")
	const [isToday] = useRoute("/space/:shareId/today")
	const [isUpcoming] = useRoute("/space/:shareId/upcoming")
	const [isSomeday] = useRoute("/space/:shareId/someday")
	const [isProjectPage, projectParams] = useRoute<RoutingParts>(
		"/space/:shareId/projects/:projectSlug/:projectId/:fileSlug?/:fileId?",
	)
	const [isFilePage, fileParams] = useRoute<RoutingParts>(
		"/space/:shareId/files/:fileSlug/:fileId",
	)
	const [isPublicFilePage, publicFileParams] = useRoute<RoutingParts>(
		"/files/:fileSlug/:fileId",
	)
	const routes = useMemo(
		() => ({
			space: inSpace,
			file: isFilePage,
			project: isProjectPage,
			shareId: inSpace && spaceParams.shareId,
			projectId: isProjectPage && projectParams.projectId,
			fileId:
				(isProjectPage && projectParams.fileId) ||
				(isFilePage && fileParams.fileId) ||
				(isPublicFilePage && publicFileParams.fileId),
			public: isPublicFilePage,
			inbox: isInbox,
			today: isToday,
			upcoming: isUpcoming,
			someday: isSomeday,
			page: isFilePage
				? ("file" as const)
				: isProjectPage
					? ("project" as const)
					: isPublicFilePage
						? ("public-file" as const)
						: isInbox
							? ("inbox" as const)
							: isUpcoming
								? ("upcoming" as const)
								: isToday
									? ("today" as const)
									: isSomeday
										? ("someday" as const)
										: ("" as const),
		}),
		[
			isInbox,
			isToday,
			isSomeday,
			isUpcoming,
			isProjectPage,
			isFilePage,
			projectParams,
			fileParams,
			spaceParams,
		],
	)
	return routes
}
