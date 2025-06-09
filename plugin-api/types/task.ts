/**
 * okay so here are some things users want to be able to do:
 * - add a bookmark URL that can be loaded in an iframe?
 *   - ok so this is a Bookmark file-type and a viewer for bookmarks
 *   - @littlebook/bookmark {type: "bookmark", url: "https://example.com"}
 *   - and a View<Bookmark> that renders an iframe (or a <webview> in electron?)
 * - interogate this iframe, talk to it?
 *
 * - add an RSS url that is fetched on demand (a task maybe can be a demander)
 *   - and converted into Files in a folder (or as children of the RSS feed?)
 *
 * - on change to a file, perform an action
 *   - this might be an indexer
 *   - or notifications
 *   - or the markdown header setter
 *   - how does a user decide if these should be on or off?
 *   - should i create some kind of permissions model?
 *
 * - on a button press, call an API
 * - on a button press, download a file
 *
 * - run something on startup
 *   - easy money(?)
 * - run something on a schedule
 *   - possible in chrome (and safari?) maybe
 * - define a _process_ of how a file transforms
 *   - this can be a folder action
 * - add something like a "folder action". a task that runs when a file is added to a folder
 */

/**
 * okay so what are we saying.
 * oh there's also just individual status bar items right
 * i wonder if that's a more generic thing too? maybe it's a kind of widget
 * registerIndicator ? category "status"?
 * registerStatusItem with a matching schema seems like a good idea for now.
 * if we find a generic later, registerStatusItem can call that
 * what about sidebar stuff?
 * it's like registerSidebarWidget? or registerView(.category = sidebar)?
 */

/**
 * let's start with folder actions being an API where a @littlebook/folder
 * is handed to you and you just go ahead and write your code right inside
 * the thing
 */
