const letterSelect = document.querySelector('#letter-select');
const letterDescription = document.querySelector('#letter-description');
const editorSurface = document.querySelector('#editor-surface');
const metadataList = document.querySelector('#metadata-list');
const barcodeList = document.querySelector('#barcode-list');
const labelList = document.querySelector('#label-list');
const xslOutput = document.querySelector('#xsl-output');
const previewSurface = document.querySelector('#preview-surface');
const sampleSwitcher = document.querySelector('#sample-switcher');
const sectionSwitcher = document.querySelector('#section-switcher');
const copyXslButton = document.querySelector('#copy-xsl-button');
const downloadXslButton = document.querySelector('#download-xsl-button');
const tokenTemplate = document.querySelector('#token-template');
const fontSizeSelect = document.querySelector('#font-size-select');
const insertTableButton = document.querySelector('#insert-table-button');
const toggleTableBordersButton = document.querySelector('#toggle-table-borders-button');
const clearFormattingButton = document.querySelector('#clear-formatting-button');
const toolbarButtons = Array.from(document.querySelectorAll('[data-command]'));
const colorSwatchButtons = Array.from(document.querySelectorAll('[data-color-command]'));

const PREVIEW_GROUP_QUALIFIER_BARCODE_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="224" height="104" viewBox="0 0 224 104">
    <rect width="224" height="104" fill="#fff"/>
    <g fill="#111">
      <rect x="12" y="10" width="2" height="66"/>
      <rect x="16" y="10" width="1" height="66"/>
      <rect x="20" y="10" width="3" height="66"/>
      <rect x="26" y="10" width="2" height="66"/>
      <rect x="31" y="10" width="1" height="66"/>
      <rect x="35" y="10" width="4" height="66"/>
      <rect x="42" y="10" width="2" height="66"/>
      <rect x="47" y="10" width="1" height="66"/>
      <rect x="50" y="10" width="3" height="66"/>
      <rect x="56" y="10" width="2" height="66"/>
      <rect x="61" y="10" width="1" height="66"/>
      <rect x="65" y="10" width="4" height="66"/>
      <rect x="72" y="10" width="2" height="66"/>
      <rect x="76" y="10" width="1" height="66"/>
      <rect x="80" y="10" width="3" height="66"/>
      <rect x="86" y="10" width="2" height="66"/>
      <rect x="91" y="10" width="1" height="66"/>
      <rect x="95" y="10" width="4" height="66"/>
      <rect x="102" y="10" width="2" height="66"/>
      <rect x="107" y="10" width="1" height="66"/>
      <rect x="110" y="10" width="3" height="66"/>
      <rect x="116" y="10" width="2" height="66"/>
      <rect x="121" y="10" width="1" height="66"/>
      <rect x="125" y="10" width="4" height="66"/>
      <rect x="132" y="10" width="2" height="66"/>
      <rect x="136" y="10" width="1" height="66"/>
      <rect x="140" y="10" width="3" height="66"/>
      <rect x="146" y="10" width="2" height="66"/>
      <rect x="151" y="10" width="1" height="66"/>
      <rect x="155" y="10" width="4" height="66"/>
      <rect x="162" y="10" width="2" height="66"/>
      <rect x="167" y="10" width="1" height="66"/>
      <rect x="170" y="10" width="3" height="66"/>
      <rect x="176" y="10" width="2" height="66"/>
      <rect x="181" y="10" width="1" height="66"/>
      <rect x="185" y="10" width="4" height="66"/>
      <rect x="192" y="10" width="2" height="66"/>
      <rect x="197" y="10" width="1" height="66"/>
      <rect x="200" y="10" width="3" height="66"/>
      <rect x="206" y="10" width="2" height="66"/>
    </g>
    <text x="112" y="92" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#111">01MCU0000001</text>
  </svg>
`)}`;

const PREVIEW_INTERNAL_ID_BARCODE_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="224" height="104" viewBox="0 0 224 104">
    <rect width="224" height="104" fill="#fff"/>
    <g fill="#111">
      <rect x="12" y="10" width="2" height="66"/>
      <rect x="16" y="10" width="1" height="66"/>
      <rect x="20" y="10" width="3" height="66"/>
      <rect x="26" y="10" width="2" height="66"/>
      <rect x="31" y="10" width="1" height="66"/>
      <rect x="35" y="10" width="4" height="66"/>
      <rect x="42" y="10" width="2" height="66"/>
      <rect x="47" y="10" width="1" height="66"/>
      <rect x="50" y="10" width="3" height="66"/>
      <rect x="56" y="10" width="2" height="66"/>
      <rect x="61" y="10" width="1" height="66"/>
      <rect x="65" y="10" width="4" height="66"/>
      <rect x="72" y="10" width="2" height="66"/>
      <rect x="76" y="10" width="1" height="66"/>
      <rect x="80" y="10" width="3" height="66"/>
      <rect x="86" y="10" width="2" height="66"/>
      <rect x="91" y="10" width="1" height="66"/>
      <rect x="95" y="10" width="4" height="66"/>
      <rect x="102" y="10" width="2" height="66"/>
      <rect x="107" y="10" width="1" height="66"/>
      <rect x="110" y="10" width="3" height="66"/>
      <rect x="116" y="10" width="2" height="66"/>
      <rect x="121" y="10" width="1" height="66"/>
      <rect x="125" y="10" width="4" height="66"/>
      <rect x="132" y="10" width="2" height="66"/>
      <rect x="136" y="10" width="1" height="66"/>
      <rect x="140" y="10" width="3" height="66"/>
      <rect x="146" y="10" width="2" height="66"/>
      <rect x="151" y="10" width="1" height="66"/>
      <rect x="155" y="10" width="4" height="66"/>
      <rect x="162" y="10" width="2" height="66"/>
      <rect x="167" y="10" width="1" height="66"/>
      <rect x="170" y="10" width="3" height="66"/>
      <rect x="176" y="10" width="2" height="66"/>
      <rect x="181" y="10" width="1" height="66"/>
      <rect x="185" y="10" width="4" height="66"/>
      <rect x="192" y="10" width="2" height="66"/>
      <rect x="197" y="10" width="1" height="66"/>
      <rect x="200" y="10" width="3" height="66"/>
      <rect x="206" y="10" width="2" height="66"/>
    </g>
    <text x="112" y="92" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#111">000000000000001</text>
  </svg>
`)}`;

const PREVIEW_ITEM_BARCODE_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="224" height="104" viewBox="0 0 224 104">
    <rect width="224" height="104" fill="#fff"/>
    <g fill="#111">
      <rect x="12" y="10" width="2" height="66"/>
      <rect x="16" y="10" width="1" height="66"/>
      <rect x="20" y="10" width="3" height="66"/>
      <rect x="26" y="10" width="2" height="66"/>
      <rect x="31" y="10" width="1" height="66"/>
      <rect x="35" y="10" width="4" height="66"/>
      <rect x="42" y="10" width="2" height="66"/>
      <rect x="47" y="10" width="1" height="66"/>
      <rect x="50" y="10" width="3" height="66"/>
      <rect x="56" y="10" width="2" height="66"/>
      <rect x="61" y="10" width="1" height="66"/>
      <rect x="65" y="10" width="4" height="66"/>
      <rect x="72" y="10" width="2" height="66"/>
      <rect x="76" y="10" width="1" height="66"/>
      <rect x="80" y="10" width="3" height="66"/>
      <rect x="86" y="10" width="2" height="66"/>
      <rect x="91" y="10" width="1" height="66"/>
      <rect x="95" y="10" width="4" height="66"/>
      <rect x="102" y="10" width="2" height="66"/>
      <rect x="107" y="10" width="1" height="66"/>
      <rect x="110" y="10" width="3" height="66"/>
      <rect x="116" y="10" width="2" height="66"/>
      <rect x="121" y="10" width="1" height="66"/>
      <rect x="125" y="10" width="4" height="66"/>
      <rect x="132" y="10" width="2" height="66"/>
      <rect x="136" y="10" width="1" height="66"/>
      <rect x="140" y="10" width="3" height="66"/>
      <rect x="146" y="10" width="2" height="66"/>
      <rect x="151" y="10" width="1" height="66"/>
      <rect x="155" y="10" width="4" height="66"/>
      <rect x="162" y="10" width="2" height="66"/>
      <rect x="167" y="10" width="1" height="66"/>
      <rect x="170" y="10" width="3" height="66"/>
      <rect x="176" y="10" width="2" height="66"/>
      <rect x="181" y="10" width="1" height="66"/>
      <rect x="185" y="10" width="4" height="66"/>
      <rect x="192" y="10" width="2" height="66"/>
      <rect x="197" y="10" width="1" height="66"/>
      <rect x="200" y="10" width="3" height="66"/>
      <rect x="206" y="10" width="2" height="66"/>
    </g>
    <text x="112" y="92" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#111">00000000000002</text>
  </svg>
`)}`;

const LETTER_REGISTRY = [
  {
    id: 'ful-incoming-slip-letter',
    name: 'Ful Incoming Slip Letter',
    description: '',
    folder: './letters/ful-incoming-slip-letter',
    sections: [
      {
        id: 'book',
        label: 'Book',
        previewSampleId: 'book',
        xslTest: "notification_data/incoming_request/format = 'PHYSICAL'",
        starterHtml: `
          <p><strong>@@request_id@@:</strong> <span class="editor-token" contenteditable="false" data-kind="barcode" data-label="Internal ID Barcode" data-xsl="&lt;tr&gt;&lt;td&gt;&lt;img src=&quot;cid:resource_sharing_request_id.png&quot; /&gt;&lt;/td&gt;&lt;/tr&gt;">[Internal ID Barcode]</span></p>
          <p><strong>@@partner_name@@:</strong> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Partner Name" data-xsl="&lt;xsl:value-of select=&quot;notification_data/partner_name&quot;/&gt;">[Partner Name]</span></p>
          <p>Please pull <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Title" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/title&quot;/&gt;">[Title]</span> by <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Author" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/author&quot;/&gt;">[Author]</span>.</p>
          <p><strong>@@item_barcode@@:</strong> <span class="editor-token" contenteditable="false" data-kind="barcode" data-label="Item Barcode" data-xsl="&lt;tr&gt;&lt;td&gt;&lt;img src=&quot;cid:item_id_barcode.png&quot; alt=&quot;Item Barcode&quot; /&gt;&lt;/td&gt;&lt;/tr&gt;">[Item Barcode]</span></p>
          <table class="editor-table has-borders">
            <tbody>
              <tr>
                <td><strong>Status</strong></td>
                <td><span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Request Status" data-xsl="&lt;xsl:value-of select=&quot;notification_data/incoming_request/status&quot;/&gt;">[Request Status]</span></td>
              </tr>
              <tr>
                <td><strong>Call Number</strong></td>
                <td><span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Call Number" data-xsl="&lt;xsl:value-of select=&quot;notification_data/items/physical_item_display_for_printing/call_number&quot;/&gt;">[Call Number]</span></td>
              </tr>
              <tr>
                <td><strong>Pickup Note</strong></td>
                <td><span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Request Note" data-xsl="&lt;xsl:value-of select=&quot;notification_data/incoming_request/note&quot;/&gt;">[Request Note]</span></td>
              </tr>
            </tbody>
          </table>
          <p><em>Use this slip to retrieve the item and route it for lending.</em></p>
        `
      },
      {
        id: 'book-chapter',
        label: 'Book Chapter',
        previewSampleId: 'book-chapter',
        xslTest: "notification_data/incoming_request/format = 'DIGITAL' and notification_data/metadata/material_type = 'Book'",
        starterHtml: `
          <p><span class="editor-token" contenteditable="false" data-kind="barcode" data-label="External ID" data-xsl="&lt;tr&gt;&lt;td&gt;&lt;img src=&quot;cid:group_qualifier.png&quot; alt=&quot;group_qualifier&quot; /&gt;&lt;/td&gt;&lt;/tr&gt;">[External ID]</span></p>
          <p><strong>Title:</strong> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Title" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/title&quot;/&gt;">[Title]</span></p>
          <p><strong>Chapter:</strong> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Chapter Number" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/chapter&quot;/&gt;">[Chapter Number]</span> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Chapter Title" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/chapter_title&quot;/&gt;">[Chapter Title]</span></p>
          <p><strong>Chapter Author:</strong> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Chapter Author" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/chapter_author&quot;/&gt;">[Chapter Author]</span></p>
          <p><strong>Borrower Reference:</strong> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Borrower Reference" data-xsl="&lt;xsl:value-of select=&quot;notification_data/incoming_request/external_request_id&quot;/&gt;">[Borrower Reference]</span></p>
          <p><span class="editor-token" contenteditable="false" data-kind="barcode" data-label="Internal ID Barcode" data-xsl="&lt;tr&gt;&lt;td&gt;&lt;img src=&quot;cid:resource_sharing_request_id.png&quot; /&gt;&lt;/td&gt;&lt;/tr&gt;">[Internal ID Barcode]</span></p>
        `
      },
      {
        id: 'article',
        label: 'Article',
        previewSampleId: 'article',
        xslTest: "notification_data/incoming_request/format = 'DIGITAL' and notification_data/metadata/material_type = 'Article'",
        starterHtml: `
          <p><span class="editor-token" contenteditable="false" data-kind="barcode" data-label="External ID" data-xsl="&lt;tr&gt;&lt;td&gt;&lt;img src=&quot;cid:group_qualifier.png&quot; alt=&quot;group_qualifier&quot; /&gt;&lt;/td&gt;&lt;/tr&gt;">[External ID]</span></p>
          <p><strong>Journal:</strong> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Journal Title" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/journal_title&quot;/&gt;">[Journal Title]</span></p>
          <p><strong>Article:</strong> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Article Title" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/additional_title&quot;/&gt;">[Article Title]</span></p>
          <p><strong>Author:</strong> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Author" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/author&quot;/&gt;">[Author]</span></p>
          <p><strong>Publication:</strong> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Publication Date" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/publication_date&quot;/&gt;">[Publication Date]</span>, <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Volume" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/volume&quot;/&gt;">[Volume]</span>, <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Issue" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/issue&quot;/&gt;">[Issue]</span>, <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="Pages" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/pages&quot;/&gt;">[Pages]</span></p>
          <p><strong>ISSN:</strong> <span class="editor-token" contenteditable="false" data-kind="metadata" data-label="ISSN" data-xsl="&lt;xsl:value-of select=&quot;notification_data/metadata/issn&quot;/&gt;">[ISSN]</span></p>
          <p><span class="editor-token" contenteditable="false" data-kind="barcode" data-label="Internal ID Barcode" data-xsl="&lt;tr&gt;&lt;td&gt;&lt;img src=&quot;cid:resource_sharing_request_id.png&quot; /&gt;&lt;/td&gt;&lt;/tr&gt;">[Internal ID Barcode]</span></p>
        `
      }
    ],
    samples: [
      { id: 'book', label: 'Book', file: 'sample-book.xml' },
      { id: 'book-chapter', label: 'Book Chapter', file: 'sample-book-chapter.xml' },
      { id: 'article', label: 'Article', file: 'sample-article.xml' }
    ],
    tokens: {
      metadata: [
        { label: 'Title', xsl: '<xsl:value-of select="notification_data/metadata/title"/>', previewPath: 'notification_data/metadata/title' },
        { label: 'Author', xsl: '<xsl:value-of select="notification_data/metadata/author"/>', previewPath: 'notification_data/metadata/author' },
        { label: 'Publication Date', xsl: '<xsl:value-of select="notification_data/metadata/publication_date"/>', previewPath: 'notification_data/metadata/publication_date' },
        { label: 'Volume', xsl: '<xsl:value-of select="notification_data/metadata/volume"/>', previewPath: 'notification_data/metadata/volume' },
        { label: 'Issue', xsl: '<xsl:value-of select="notification_data/metadata/issue"/>', previewPath: 'notification_data/metadata/issue' },
        { label: 'Pages', xsl: '<xsl:value-of select="notification_data/metadata/pages"/>', previewPath: 'notification_data/metadata/pages' },
        { label: 'Publisher', xsl: '<xsl:value-of select="notification_data/metadata/publisher"/>', previewPath: 'notification_data/metadata/publisher' },
        { label: 'Place of Publication', xsl: '<xsl:value-of select="notification_data/metadata/place_of_publication"/>', previewPath: 'notification_data/metadata/place_of_publication' },
        { label: 'OCLC Number', xsl: '<xsl:value-of select="notification_data/metadata/oclc_number"/>', previewPath: 'notification_data/metadata/oclc_number' },
        { label: 'Borrower Reference', xsl: '<xsl:value-of select="notification_data/incoming_request/external_request_id"/>', previewPath: 'notification_data/incoming_request/external_request_id' },
        { label: 'Request Note', xsl: '<xsl:value-of select="notification_data/incoming_request/note"/>', previewPath: 'notification_data/incoming_request/note' },
        { label: 'Edition', xsl: '<xsl:value-of select="notification_data/metadata/edition"/>', previewPath: 'notification_data/metadata/edition' },
        { label: 'ISBN', xsl: '<xsl:value-of select="notification_data/metadata/isbn"/>', previewPath: 'notification_data/metadata/isbn' },
        { label: 'Shelving Location for Item', xsl: '<xsl:value-of select="notification_data/items/physical_item_display_for_printing/shelving_location"/>', previewPath: 'notification_data/items/physical_item_display_for_printing/shelving_location' },
        { label: 'Chapter Title', xsl: '<xsl:value-of select="notification_data/metadata/chapter_title"/>', previewPath: 'notification_data/metadata/chapter_title' },
        { label: 'Chapter Author', xsl: '<xsl:value-of select="notification_data/metadata/chapter_author"/>', previewPath: 'notification_data/metadata/chapter_author' },
        { label: 'Chapter Number', xsl: '<xsl:value-of select="notification_data/metadata/chapter"/>', previewPath: 'notification_data/metadata/chapter' },
        { label: 'Journal Title', xsl: '<xsl:value-of select="notification_data/metadata/journal_title"/>', previewPath: 'notification_data/metadata/journal_title' },
        { label: 'Article Title', xsl: '<xsl:value-of select="notification_data/metadata/additional_title"/>', previewPath: 'notification_data/metadata/additional_title' },
        { label: 'ISSN', xsl: '<xsl:value-of select="notification_data/metadata/issn"/>', previewPath: 'notification_data/metadata/issn' }
      ],
      barcodes: [
        { label: 'Item Barcode', xsl: '<tr><td><img src="cid:item_id_barcode.png" alt="Item Barcode" /></td></tr>', previewText: '00000000000002', previewImage: PREVIEW_ITEM_BARCODE_SRC },
        { label: 'External ID', xsl: '<tr><td><img src="cid:group_qualifier.png" alt="group_qualifier" /></td></tr>', previewText: '01MCU0000001', previewImage: PREVIEW_GROUP_QUALIFIER_BARCODE_SRC },
        { label: 'Internal ID Barcode', xsl: '<tr><td><img src="cid:resource_sharing_request_id.png" /></td></tr>', previewText: '000000000000001', previewImage: PREVIEW_INTERNAL_ID_BARCODE_SRC }
      ],
      labels: [
        { label: 'Request ID', xsl: '@@request_id@@', previewValue: 'Request ID' },
        { label: 'Partner Name', xsl: '@@partner_name@@', previewValue: 'Partner Name' },
        { label: 'Item Barcode', xsl: '@@item_barcode@@', previewValue: 'Item Barcode' },
        { label: 'Title', xsl: '@@title@@', previewValue: 'Title' }
      ]
    }
  }
];

let activeLetter = null;
let activeLetterAssets = null;
let activeSampleId = null;
let activeEditorSectionId = null;
let sectionContentById = {};

function showStatus(message) {
  window.setTimeout(() => {
    copyXslButton?.querySelector('span:last-child')?.replaceChildren('Copy');
    downloadXslButton?.querySelector('span:last-child')?.replaceChildren('Download');
  }, 1600);
}

function escapeXml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function pathValue(xmlDocument, path) {
  const segments = path.split('/').filter(Boolean);

  return segments.reduce((node, segment, index) => {
    if (!node) {
      return null;
    }
    if (index === 0 && node.nodeName === segment) {
      return node;
    }
    return Array.from(node.children).find((child) => child.nodeName === segment) || null;
  }, xmlDocument.documentElement)?.textContent?.trim() || '';
}

function insertHtmlAtCaret(html) {
  editorSurface.focus();
  document.execCommand('insertHTML', false, html);
  refreshOutputs();
}

function renderTokenButtons(items, container, kind) {
  container.innerHTML = '';

  items.forEach((item) => {
    const button = tokenTemplate.content.firstElementChild.cloneNode(true);
    button.textContent = item.label;
    button.dataset.kind = kind;
    button.addEventListener('click', () => {
      const tokenMarkup = `<span class="editor-token" contenteditable="false" data-kind="${kind}" data-label="${escapeHtml(item.label)}" data-xsl="${escapeHtml(item.xsl)}">[${escapeHtml(kind === 'label' ? `Label: ${item.label}` : item.label)}]</span>`;
      insertHtmlAtCaret(tokenMarkup);
    });
    container.appendChild(button);
  });
}

function renderSampleButtons() {
  sampleSwitcher.innerHTML = '';

  activeLetter.samples.forEach((sample) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `sample-button${sample.id === activeSampleId ? ' is-active' : ''}`;
    button.textContent = sample.label;
    button.setAttribute('aria-pressed', sample.id === activeSampleId ? 'true' : 'false');
    button.addEventListener('click', () => {
      activeSampleId = sample.id;
      renderSampleButtons();
      refreshOutputs();
    });
    sampleSwitcher.appendChild(button);
  });
}

function renderSectionButtons() {
  if (!sectionSwitcher || !activeLetter.sections) {
    return;
  }

  sectionSwitcher.innerHTML = '';

  activeLetter.sections.forEach((section) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `section-button${section.id === activeEditorSectionId ? ' is-active' : ''}`;
    button.textContent = section.label;
    button.setAttribute('aria-pressed', section.id === activeEditorSectionId ? 'true' : 'false');
    button.addEventListener('click', () => {
      switchEditorSection(section.id);
    });
    sectionSwitcher.appendChild(button);
  });
}

function saveCurrentSectionMarkup() {
  if (!activeEditorSectionId) {
    return;
  }

  sectionContentById[activeEditorSectionId] = editorSurface.innerHTML;
}

function switchEditorSection(sectionId) {
  saveCurrentSectionMarkup();
  activeEditorSectionId = sectionId;
  editorSurface.innerHTML = sectionContentById[sectionId] || '<p></p>';
  renderSectionButtons();
  refreshOutputs();
}

function normalizeEditorMarkup() {
  if (!editorSurface.innerHTML.trim()) {
    editorSurface.innerHTML = '<p></p>';
  }

  const strayNodes = Array.from(editorSurface.childNodes).filter((node) => {
    return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
  });

  strayNodes.forEach((node) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = node.textContent;
    editorSurface.replaceChild(paragraph, node);
  });
}

function normalizeMarkupInContainer(container) {
  if (!container.innerHTML.trim()) {
    container.innerHTML = '<p></p>';
  }

  const strayNodes = Array.from(container.childNodes).filter((node) => {
    return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
  });

  strayNodes.forEach((node) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = node.textContent;
    container.replaceChild(paragraph, node);
  });
}

function handleToolbarCommand(command) {
  editorSurface.focus();
  document.execCommand(command, false, null);
  refreshOutputs();
}

function applyFontSize(size) {
  if (!size) {
    return;
  }

  editorSurface.focus();
  document.execCommand('styleWithCSS', false, true);
  document.execCommand('fontSize', false, '7');

  editorSurface.querySelectorAll('font[size="7"]').forEach((fontNode) => {
    const span = document.createElement('span');
    span.style.fontSize = size;
    span.innerHTML = fontNode.innerHTML;
    fontNode.replaceWith(span);
  });

  refreshOutputs();
}

function applyColor(command, value) {
  editorSurface.focus();
  document.execCommand('styleWithCSS', false, true);
  document.execCommand(command, false, value);
  refreshOutputs();
}

function updateActiveSwatch(button) {
  const command = button.dataset.colorCommand;
  colorSwatchButtons
    .filter((swatch) => swatch.dataset.colorCommand === command)
    .forEach((swatch) => {
      swatch.classList.toggle('is-active', swatch === button);
    });

  const pickerId = button.dataset.pickerId;
  const picker = pickerId ? document.querySelector(`#${pickerId}`) : null;
  const preview = picker?.querySelector('[data-color-preview]');
  if (preview) {
    preview.dataset.colorPreview = button.dataset.colorValue;
  }
  if (picker) {
    picker.open = false;
  }
}

function createTableMarkup(rows, columns) {
  const bodyRows = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
    const cells = [];
    for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
      cells.push('<td>Cell</td>');
    }
    bodyRows.push(`<tr>${cells.join('')}</tr>`);
  }

  return `<table class="editor-table has-borders"><tbody>${bodyRows.join('')}</tbody></table><p></p>`;
}

function insertTable() {
  const rowsInput = window.prompt('How many rows?', '2');
  const columnsInput = window.prompt('How many columns?', '2');
  const rows = Number.parseInt(rowsInput || '', 10);
  const columns = Number.parseInt(columnsInput || '', 10);

  if (!Number.isInteger(rows) || !Number.isInteger(columns) || rows < 1 || columns < 1) {
    return;
  }

  insertHtmlAtCaret(createTableMarkup(rows, columns));
}

function closestTable() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  const startNode = selection.getRangeAt(0).startContainer;
  return startNode.nodeType === Node.ELEMENT_NODE
    ? startNode.closest('table')
    : startNode.parentElement?.closest('table') || null;
}

function toggleTableBorders() {
  const table = closestTable();
  if (!table) {
    return;
  }

  table.classList.toggle('has-borders');
  refreshOutputs();
}

function clearFormatting() {
  editorSurface.focus();
  document.execCommand('removeFormat', false, null);
  refreshOutputs();
}

function nodeStyleString(node) {
  const styles = [];

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const { style } = node;

  if (style.fontSize) {
    styles.push(`font-size:${style.fontSize}`);
  }

  if (style.color) {
    styles.push(`color:${style.color}`);
  }

  if (style.backgroundColor) {
    styles.push(`background-color:${style.backgroundColor}`);
  }

  if (style.textAlign) {
    styles.push(`text-align:${style.textAlign}`);
  }

  return styles.join('; ');
}

function inlineNodeToXsl(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeXml(node.textContent);
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  if (node.classList.contains('editor-token')) {
    return node.dataset.xsl || '';
  }

  if (node.tagName === 'BR') {
    return '<br/>';
  }

  const tagMap = {
    STRONG: 'strong',
    B: 'strong',
    EM: 'em',
    I: 'em',
    U: 'span',
    SPAN: 'span'
  };

  const mappedTag = tagMap[node.tagName] || 'span';
  const styles = [];
  const styleString = nodeStyleString(node);

  if (node.tagName === 'U') {
    styles.push('text-decoration:underline');
  }

  if (styleString) {
    styles.push(styleString);
  }

  const styleAttribute = styles.length ? ` style="${escapeXml(styles.join('; '))}"` : '';
  const children = Array.from(node.childNodes).map(inlineNodeToXsl).join('');

  return `<${mappedTag}${styleAttribute}>${children}</${mappedTag}>`;
}

function blockNodeToXsl(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    return text ? `<p>${escapeXml(text)}</p>` : '';
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  if (node.tagName === 'P' || /^H[1-6]$/.test(node.tagName)) {
    const tagName = node.tagName === 'P' ? 'p' : node.tagName.toLowerCase();
    const styleString = nodeStyleString(node);
    const styleAttribute = styleString ? ` style="${escapeXml(styleString)}"` : '';
    const children = Array.from(node.childNodes).map(inlineNodeToXsl).join('');
    return `<${tagName}${styleAttribute}>${children || '<br/>'}</${tagName}>`;
  }

  if (node.tagName === 'UL' || node.tagName === 'OL') {
    const items = Array.from(node.children)
      .filter((child) => child.tagName === 'LI')
      .map((child) => `<li>${Array.from(child.childNodes).map(inlineNodeToXsl).join('')}</li>`)
      .join('');
    return `<${node.tagName.toLowerCase()}>${items}</${node.tagName.toLowerCase()}>`;
  }

  if (node.tagName === 'TABLE') {
    const className = node.classList.contains('has-borders') ? ' class="has-borders"' : '';
    const rows = Array.from(node.querySelectorAll('tr')).map((row) => {
      const cells = Array.from(row.children)
        .filter((cell) => cell.tagName === 'TD' || cell.tagName === 'TH')
        .map((cell) => {
          const contents = Array.from(cell.childNodes).map(inlineNodeToXsl).join('');
          return `<td>${contents || '<br/>'}</td>`;
        })
        .join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<table${className}><tbody>${rows}</tbody></table>`;
  }

  return `<p>${Array.from(node.childNodes).map(inlineNodeToXsl).join('')}</p>`;
}

function markupToXsl(markup) {
  const container = document.createElement('div');
  container.innerHTML = markup;
  normalizeMarkupInContainer(container);
  return Array.from(container.childNodes)
    .map(blockNodeToXsl)
    .filter(Boolean)
    .join('\n        ');
}

function editorMiddleToXsl() {
  normalizeEditorMarkup();
  return markupToXsl(editorSurface.innerHTML);
}

function buildPreviewValueMaps(xmlDocument) {
  const metadataMap = new Map();
  const labelMap = new Map();
  const barcodeMap = new Map();

  activeLetter.tokens.metadata.forEach((token) => {
    metadataMap.set(token.label, pathValue(xmlDocument, token.previewPath));
  });

  activeLetter.tokens.labels.forEach((token) => {
    labelMap.set(token.label, token.previewValue);
  });

  activeLetter.tokens.barcodes.forEach((token) => {
    barcodeMap.set(token.label, {
      text: token.previewText,
      image: token.previewImage
    });
  });

  return { metadataMap, labelMap, barcodeMap };
}

function inlineNodeToPreview(node, maps) {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeHtml(node.textContent);
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  if (node.classList.contains('editor-token')) {
    const kind = node.dataset.kind;
    const label = node.dataset.label;

    if (kind === 'barcode') {
      const barcode = maps.barcodeMap.get(label);
      if (barcode?.image) {
        return `<img class="preview-barcode-image" src="${barcode.image}" alt="${escapeHtml(label)}">`;
      }
      return `<span class="preview-barcode">${escapeHtml(barcode?.text || label)}</span>`;
    }

    if (kind === 'label') {
      return `<strong>${escapeHtml(maps.labelMap.get(label) || label)}</strong>`;
    }

    return escapeHtml(maps.metadataMap.get(label) || label);
  }

  if (node.tagName === 'BR') {
    return '<br>';
  }

  const children = Array.from(node.childNodes).map((child) => inlineNodeToPreview(child, maps)).join('');
  const styleString = nodeStyleString(node);
  const styleAttribute = styleString ? ` style="${escapeHtml(styleString)}"` : '';

  if (node.tagName === 'U') {
    return `<span style="text-decoration:underline${styleString ? `; ${escapeHtml(styleString)}` : ''}">${children}</span>`;
  }

  const allowedInline = ['STRONG', 'B', 'EM', 'I', 'SPAN'];
  if (allowedInline.includes(node.tagName)) {
    const tagName = node.tagName === 'B' ? 'strong' : node.tagName === 'I' ? 'em' : node.tagName.toLowerCase();
    return `<${tagName}${styleAttribute}>${children}</${tagName}>`;
  }

  return `<span${styleAttribute}>${children}</span>`;
}

function blockNodeToPreview(node, maps) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    return text ? `<p>${escapeHtml(text)}</p>` : '';
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  if (node.tagName === 'P' || /^H[1-6]$/.test(node.tagName)) {
    const tagName = node.tagName.toLowerCase();
    const styleString = nodeStyleString(node);
    const styleAttribute = styleString ? ` style="${escapeHtml(styleString)}"` : '';
    return `<${tagName}${styleAttribute}>${Array.from(node.childNodes).map((child) => inlineNodeToPreview(child, maps)).join('') || '<br>'}</${tagName}>`;
  }

  if (node.tagName === 'UL' || node.tagName === 'OL') {
    const items = Array.from(node.children)
      .filter((child) => child.tagName === 'LI')
      .map((child) => `<li>${Array.from(child.childNodes).map((grandchild) => inlineNodeToPreview(grandchild, maps)).join('')}</li>`)
      .join('');
    return `<${node.tagName.toLowerCase()}>${items}</${node.tagName.toLowerCase()}>`;
  }

  if (node.tagName === 'TABLE') {
    const className = node.classList.contains('has-borders') ? ' class="has-borders"' : '';
    const rows = Array.from(node.querySelectorAll('tr')).map((row) => {
      const cells = Array.from(row.children)
        .filter((cell) => cell.tagName === 'TD' || cell.tagName === 'TH')
        .map((cell) => `<td>${Array.from(cell.childNodes).map((child) => inlineNodeToPreview(child, maps)).join('') || '<br>'}</td>`)
        .join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<table${className}><tbody>${rows}</tbody></table>`;
  }

  return `<p>${Array.from(node.childNodes).map((child) => inlineNodeToPreview(child, maps)).join('')}</p>`;
}

function renderPreview(xmlText) {
  const xmlDocument = new DOMParser().parseFromString(xmlText, 'text/xml');
  const maps = buildPreviewValueMaps(xmlDocument);
  const previewSectionId = activeLetter.samples.find((sample) => sample.id === activeSampleId)?.id || activeEditorSectionId;
  const previewMarkup = sectionContentById[previewSectionId] || editorSurface.innerHTML;
  const container = document.createElement('div');
  container.innerHTML = previewMarkup;
  normalizeMarkupInContainer(container);
  const body = Array.from(container.childNodes)
    .map((node) => blockNodeToPreview(node, maps))
    .filter(Boolean)
    .join('');

  previewSurface.innerHTML = `<article class="preview-page">${body}</article>`;
}

function assembleXsl(middleXsl) {
  return `${activeLetterAssets.beginXsl}\n        ${middleXsl}\n${activeLetterAssets.endXsl}`;
}

function assembleSectionedMiddleXsl() {
  const sections = activeLetter.sections.map((section) => {
    const markup = section.id === activeEditorSectionId ? editorSurface.innerHTML : (sectionContentById[section.id] || '');
    const body = markupToXsl(markup || '<p></p>');
    return `
          <xsl:when test="${section.xslTest}">
            ${body}
          </xsl:when>`;
  }).join('\n');

  return `
        <xsl:choose>${sections}
          <xsl:otherwise>
            <p>No matching section is configured for this request.</p>
          </xsl:otherwise>
        </xsl:choose>`;
}

async function copyGeneratedXsl() {
  const text = xslOutput.textContent.trim();

  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    copyXslButton?.querySelector('span:last-child')?.replaceChildren('Copied');
    showStatus('Copied');
  } catch (error) {
    console.error(error);
    copyXslButton?.querySelector('span:last-child')?.replaceChildren('Copy failed');
    showStatus('Copy failed');
  }
}

function downloadGeneratedXsl() {
  const text = xslOutput.textContent.trim();

  if (!text) {
    return;
  }

  const blob = new Blob([text], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${activeLetter?.id || 'generated-letter'}.xsl`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  downloadXslButton?.querySelector('span:last-child')?.replaceChildren('Downloaded');
  showStatus('Downloaded');
}

function refreshOutputs() {
  if (!activeLetter || !activeLetterAssets) {
    return;
  }

  saveCurrentSectionMarkup();
  const middleXsl = assembleSectionedMiddleXsl();
  xslOutput.textContent = assembleXsl(middleXsl);
  renderPreview(activeLetterAssets.samples[activeSampleId] || activeLetterAssets.samples.default || '');
}

async function loadLetterAssets(letter) {
  const [beginXsl, endXsl, samples] = await Promise.all([
    fetch(`${letter.folder}/begin.xsl`).then((response) => response.text()),
    fetch(`${letter.folder}/end.xsl`).then((response) => response.text()),
    Promise.all(
      letter.samples.map(async (sample) => {
        const text = await fetch(`${letter.folder}/${sample.file}`).then((response) => response.text());
        return [sample.id, text];
      })
    ).then((entries) => Object.fromEntries(entries))
  ]);

  return { beginXsl, endXsl, samples };
}

async function activateLetter(letterId) {
  activeLetter = LETTER_REGISTRY.find((letter) => letter.id === letterId) || LETTER_REGISTRY[0];
  activeLetterAssets = await loadLetterAssets(activeLetter);
  activeSampleId = activeLetter.samples[0]?.id || null;
  sectionContentById = Object.fromEntries(activeLetter.sections.map((section) => [section.id, section.starterHtml]));
  activeEditorSectionId = activeLetter.sections[0]?.id || null;
  letterDescription.textContent = activeLetter.description;
  editorSurface.innerHTML = sectionContentById[activeEditorSectionId] || '<p></p>';

  renderTokenButtons(activeLetter.tokens.metadata, metadataList, 'metadata');
  renderTokenButtons(activeLetter.tokens.barcodes, barcodeList, 'barcode');
  renderTokenButtons(activeLetter.tokens.labels, labelList, 'label');
  renderSampleButtons();
  renderSectionButtons();
  refreshOutputs();
}

function populateLetterPicker() {
  LETTER_REGISTRY.forEach((letter) => {
    const option = document.createElement('option');
    option.value = letter.id;
    option.textContent = letter.name;
    letterSelect.appendChild(option);
  });
}

function installEventHandlers() {
  toolbarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      handleToolbarCommand(button.dataset.command);
    });
  });

  fontSizeSelect.addEventListener('change', (event) => {
    applyFontSize(event.target.value);
  });

  colorSwatchButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyColor(button.dataset.colorCommand, button.dataset.colorValue);
      updateActiveSwatch(button);
    });
  });

  insertTableButton.addEventListener('click', insertTable);
  toggleTableBordersButton.addEventListener('click', toggleTableBorders);
  clearFormattingButton.addEventListener('click', clearFormatting);

  editorSurface.addEventListener('input', refreshOutputs);
  editorSurface.addEventListener('keyup', refreshOutputs);
  editorSurface.addEventListener('mouseup', refreshOutputs);

  letterSelect.addEventListener('change', (event) => {
    activateLetter(event.target.value);
  });

  copyXslButton?.addEventListener('click', copyGeneratedXsl);
  downloadXslButton?.addEventListener('click', downloadGeneratedXsl);
}

async function boot() {
  populateLetterPicker();
  installEventHandlers();
  await activateLetter(LETTER_REGISTRY[0].id);
}

boot().catch((error) => {
  xslOutput.textContent = `Unable to load prototype assets.\n\n${error.message}`;
});
