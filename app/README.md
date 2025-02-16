# todo

- seeds
- crons

## data structure options

1. external content
   ```ts
   interface File {
   	name: string
   	icon?: string
   	contentType: ContentTypeId
   	conformsTo: ContentTypeId[]
   	content: Link<ContentId>
   }
   ```
2. special metadata field
   ```ts
   interface File {
   	"@meta": {
   		name: string
   		icon?: string
   		contentType: ContentTypeId
   		conformsTo: ContentTypeId[]
   	}
   	/* example */
   	shapes: (Square | Circle)[]
   	text: string
   	/* /example */
   }
   ```
3. special content field
   ```ts
   interface File {
   	name: string
   	icon?: string
   	contentType: ContentTypeId
   	conformsTo: ContentTypeId[]
   	content: {
   		/* example */
   		shapes: (Square | Circle)[]
   		text: string
   		/* /example */
   	}
   }
   ```
4. metadata in external (no)
   ```ts
   interface File {
   	"@meta": Link<MetadataId>
   	/* example */
   	shapes: (Square | Circle)[]
   	text: string
   	/* /example */
   }
   ```

### external content

#### benefits of external content

- theoretically can prevent files from being able to edit their metadata
- what if files do need access to their metadata?
   - well i guess i can give them the data but not the handle
- what i decided on last time
- this is similar to how a filesystem works

#### downsides of external content

- extra fetch for content
   - can make this better with a useResolvedDocument() hook that returns file +
     content
- what if, say, a markdown file wants to set its own title?
   - pass them a `setTitle` function?
   - they also do have access to `repo` so can probably do whatever they want

### special metadata field

#### benefits of special metadata field

- everything in one place, no extra fetch
- it's what patchwork does

#### downsides of special metadata field

- free for all
- a clash is theoretically possible

### special content field

#### benefits of special content field

- everything in one place
- no extra fetch

#### downsides of special content field

- can't give someone file access without them having the ability to change
  littlebook-level details

## questions:

- ARE FOLDERS SPECIAL???????????????????
   - ANSWER: sort of
      - they are a regular contentType and shape, unspecial
