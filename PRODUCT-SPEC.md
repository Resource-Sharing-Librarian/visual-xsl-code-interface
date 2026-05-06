# Visual Alma Letter Builder

## Summary

Yes, this is possible.

The most practical approach is to build a browser-based editor that:

- asks one primary question: which Alma letter is being customized
- loads that letter's XML sample plus beginning and ending XSL wrapper files
- lets the user edit only the middle content region in a visual word-processor-style canvas
- inserts Alma metadata fields, barcode placeholders, and `@@label@@` tokens at the cursor
- generates XSL behind the scenes
- renders a live preview using the selected sample XML

## Product Goal

Allow non-coders to build or revise Alma letters without editing raw XSL directly.

## Core User Flow

1. User selects a letter type.
2. App loads:
   - sample XML for that letter
   - standard opening XSL fragment
   - standard closing XSL fragment
   - available metadata fields for that letter
   - supported barcode snippets
   - supported Alma labels
3. User edits content in a visual editor.
4. Clicking a field inserts the corresponding token/snippet at the cursor.
5. App converts the visual document model into middle-section XSL.
6. App assembles:
   - beginning XSL
   - generated middle XSL
   - ending XSL
7. App shows:
   - formatted visual preview
   - generated XSL source
8. User copies or downloads the final XSL.

## Recommended Architecture

Do not make the word processor directly edit raw XSL.

Instead, use an internal document model such as:

- paragraph
- text run
- bold
- italic
- underline
- font size
- text color
- highlight color
- table
- table row
- table cell
- metadata token
- barcode token
- Alma label token
- line break

Then create:

- `document model -> XSL` generator
- `document model -> preview HTML` renderer

This is much safer than trying to round-trip arbitrary XSL through a WYSIWYG editor.

## Why This Works Better

If users edit raw XSL in a rich text box, the tool becomes brittle very quickly.

A structured document model gives us:

- predictable XSL output
- cleaner preview rendering
- simpler validation
- safer insertion of Alma fields
- room to add future logic like `xsl:if` and `xsl:choose`

## Editor Layout

Recommended three-column layout:

- left rail: insertable items
  - metadata fields
  - barcode types
  - Alma labels
  - optional snippets
- center: visual editor
  - toolbar for formatting
  - editable document canvas
- right rail or lower panel:
  - generated XSL
  - validation messages
  - preview controls

## Toolbar Features That Translate Cleanly

Good first-phase features:

- bold
- italic
- underline
- font size
- text color
- highlight color
- paragraph
- line break
- alignment
- bulleted list
- numbered list
- table insertion
- table border on/off

These map reasonably well to HTML-like XSL output patterns.

## Features That Need Careful Rules

Possible, but should be constrained:

- arbitrary font family
- complex nested tables
- drag resizing
- floating images
- freeform copy/paste from Word

Those can produce messy markup unless we sanitize aggressively.

## Best Insertion Behavior

For metadata, labels, and barcodes:

- single click inserts at caret
- drag from left rail into editor is optional later
- insertion should create protected inline tokens or blocks
- tokens should display human-friendly names in the editor
- each token stores its real XSL payload under the hood

Example editor display:

- `[Title]`
- `[Request ID Barcode]`
- `[Label: requested_for]`

Example generated output:

- `<xsl:value-of select="notification_data/..."/>`
- `<img src="cid:request_id_barcode.png" alt="Request Barcode"/>`
- `@@requested_for@@`

## Preview Strategy

Preview should not depend on Alma.

Use the sample XML you provide per letter and run the generated XSL in the browser or in a lightweight local service.

Two preview layers are useful:

- visual preview
- raw assembled XSL source

## Letter Configuration Model

Each letter should have a config file describing:

- letter id
- display name
- sample XML path
- opening XSL path
- closing XSL path
- supported metadata tokens
- supported barcode tokens
- supported Alma labels
- any special rules or extra questions

## Likely Data Files

Suggested structure:

```text
resource-sharing-letters-alt/
  letters/
    borrowing-receive-slip/
      sample.xml
      begin.xsl
      end.xsl
      config.json
    pull-slip/
      sample.xml
      begin.xsl
      end.xsl
      config.json
  src/
    editor/
    preview/
    xsl/
    registry/
```

## Important Constraint

The editor should own only the middle content area.

That matches your idea well and reduces risk because:

- the shared wrapper XSL stays consistent
- users cannot accidentally break required document structure
- letter-specific setup remains controlled

## Future Logic Features

Your idea to add conditions later is realistic.

The clean way is to treat them as structured blocks, not typed code:

- `If field exists`
- `If field equals value`
- `Choose / Otherwise`
- `Repeat for each item`

Those can later generate:

- `<xsl:if>`
- `<xsl:choose>`
- `<xsl:when>`
- `<xsl:otherwise>`
- `<xsl:for-each>`

## Technical Recommendation

For implementation, the strongest path is:

- a browser app
- a structured rich-text editor framework
- a custom schema for Alma tokens
- a generator that outputs controlled XSL

Good fit technologies:

- `TipTap` or `ProseMirror` for the editor
- plain JavaScript or TypeScript app shell
- browser XSLT preview if feasible for the chosen XSL subset

## Risks

Main complexity is not the preview.

Main complexity is defining a document model that feels like a word processor while still producing clean XSL.

The biggest risks are:

- invalid XSL from unsupported formatting combinations
- messy pasted content
- too much freedom in table styling
- difficulty round-tripping between visual content and code

## Recommended Phase Plan

### Phase 1

- select letter
- load XML + begin/end XSL
- visual editor with paragraphs and inline formatting
- click-to-insert metadata, labels, and barcodes
- generate assembled XSL
- show preview

### Phase 2

- tables
- border controls
- color controls
- better token chips
- import/export saved editor JSON

### Phase 3

- structured logic blocks like if/then and choose
- validation warnings
- template snippets
- letter-specific advanced options

## Bottom Line

This is absolutely buildable.

The key design choice is:

Do not treat it as a raw XSL editor with formatting controls.

Treat it as a constrained visual document builder that compiles into XSL.
