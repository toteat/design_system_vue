// AUTO-GENERATED — run `npm run generate` to update.
// Descriptions live in scripts/descriptions.json (edit there, not here).

export type PropDef = {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description?: string;
};
export type EventDef = { name: string; payload: string; description?: string };
export type SlotDef = { name: string; description?: string };
export type ComponentDef = {
  name: string;
  description: string;
  props: PropDef[];
  events: EventDef[];
  slots: SlotDef[];
};

export const COMPONENTS: ComponentDef[] = [
  {
    name: 'Button',
    description:
      'Clickable button with variants, sizes, and optional icon. No default slot — use the `text` prop for the label and `iconName` for icons.',
    props: [
      { name: 'variant', type: 'Variant', default: "'primary'" },
      { name: 'disabled', type: 'boolean', default: 'false' },
      {
        name: 'isFull',
        type: 'boolean',
        default: 'false',
        description: 'Stretch to full width of parent container',
      },
      { name: 'size', type: 'ButtonSize', default: "'medium'" },
      { name: 'type', type: 'ButtonHTMLAttributes', default: "'button'" },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Show spinner and disable interaction',
      },
      {
        name: 'text',
        type: 'string',
        description: 'Button label text (required for a visible label)',
      },
      { name: 'selected', type: 'boolean', default: 'false' },
      {
        name: 'iconPosition',
        type: '"left" | "right"',
        default: "'right'",
        description: 'Icon placement relative to the text label',
      },
      {
        name: 'iconName',
        type: '"apple-filled" | "arrow-circle-down-outline" | "arrow-circle-left-outline" | "arrow-circle-right-outline" | "arrow-circle-up-outline" | "arrow-down-outline" | "arrow-left-outline" | ... 119 more ... | "wifi-signal-outline"',
        description:
          'Icon from the design system icon library (use search_icons to find names)',
      },
      {
        name: 'onlyIcon',
        type: 'boolean',
        default: 'false',
        description:
          'Circular icon-only button — hides text, requires iconName',
      },
      {
        name: 'groupPosition',
        type: 'ButtonGroupPosition',
        default: "'standalone'",
        description: 'Used internally by GroupedButtons — do not set manually',
      },
    ],
    events: [{ name: 'click', payload: 'MouseEvent | TouchEvent' }],
    slots: [],
  },
  {
    name: 'Card',
    description:
      'Content container with optional padding, shadow elevation, hover/focus/pressed states, and optional link behavior via `href` prop.',
    props: [
      {
        name: 'padding',
        type: '"small" | "medium" | "large" | "none"',
        default: "'medium'",
      },
      {
        name: 'elevation',
        type: '"small" | "medium" | "large" | "none"',
        default: "'none'",
      },
      { name: 'hoverable', type: 'boolean', default: 'false' },
      {
        name: 'href',
        type: 'string',
        description: 'Renders the card as an <a> tag with this URL',
      },
      {
        name: 'target',
        type: 'string',
        description: 'Link target attribute (_blank, _self, etc.)',
      },
      {
        name: 'rel',
        type: 'string',
        description: "Link rel attribute (e.g. 'noopener noreferrer')",
      },
      {
        name: 'hovered',
        type: 'boolean',
        description: 'v-model:hovered — two-way binding for hover state',
      },
      {
        name: 'focused',
        type: 'boolean',
        description: 'v-model:focused — two-way binding for focus state',
      },
      {
        name: 'pressed',
        type: 'boolean',
        description: 'v-model:pressed — two-way binding for pressed state',
      },
      {
        name: 'maxWidth',
        type: 'string | number',
        description: 'Maximum width (string with unit or number in px)',
      },
      {
        name: 'flexDirection',
        type: '"row" | "column"',
        description: 'CSS flex-direction for the card content',
      },
    ],
    events: [
      { name: 'click', payload: 'MouseEvent' },
      { name: 'update:hovered', payload: 'boolean' },
      { name: 'update:focused', payload: 'boolean' },
      { name: 'update:pressed', payload: 'boolean' },
    ],
    slots: [{ name: 'default', description: 'Card content' }],
  },
  {
    name: 'Checkbox',
    description:
      'Checkbox input with two modes: simple (default slot for label) or card mode (`title`/`description` props for a bordered card layout).',
    props: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'v-model:checked — current checked state',
      },
      { name: 'disabled', type: 'boolean' },
      { name: 'size', type: 'ComponentSize' },
      {
        name: 'color',
        type: 'ThemeColor',
        description: 'Color of the checked icon (ThemeColor value)',
      },
      {
        name: 'checkboxPosition',
        type: '"left" | "right"',
        description: 'Checkbox placement relative to label content',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        description: 'Stretch to full width of parent container',
      },
      {
        name: 'title',
        type: 'string',
        description: 'Card mode: main label text (enables card layout)',
      },
      {
        name: 'description',
        type: 'string',
        description: 'Card mode: secondary description text below title',
      },
      {
        name: 'card',
        type: 'boolean',
        description: 'Enable card-style checkbox with border',
      },
    ],
    events: [
      { name: 'change', payload: 'boolean' },
      { name: 'update:checked', payload: 'boolean' },
    ],
    slots: [
      {
        name: 'default',
        description:
          'Label content — used in simple mode (when `title` prop is not set)',
      },
    ],
  },
  {
    name: 'Accordion',
    description:
      'Expandable/collapsible content section with animated height transition. Use `expanded` prop or listen to `toggle-expand` event to control state.',
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Header text (used when the `label` slot is not provided)',
      },
      { name: 'expanded', type: 'boolean', default: 'false' },
      { name: 'disabled', type: 'boolean', default: 'false' },
      {
        name: 'bordered',
        type: 'boolean',
        default: 'false',
        description: 'Show a border around the accordion',
      },
    ],
    events: [
      {
        name: 'toggle-expand',
        payload: 'void',
        description:
          'Fired when the header is clicked — toggle your `expanded` state in this handler',
      },
    ],
    slots: [
      {
        name: 'label',
        description:
          'Custom header/trigger content — scoped: { expanded: boolean }',
      },
      {
        name: 'default',
        description: 'Collapsible body content — scoped: { expanded: boolean }',
      },
    ],
  },
  {
    name: 'TextInput',
    description:
      'Text input field with label, validation states (success/warning/error), prefix/suffix icons, clearable button, and optional character counter.',
    props: [
      {
        name: 'modelValue',
        type: 'string',
        description: 'v-model binding — the input value',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Visible label text above the input',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text inside the input',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Helper text below the input',
      },
      { name: 'helperTextAlign', type: '"left" | "right"' },
      {
        name: 'errorMessage',
        type: 'string',
        description: "Error message — shown when validationState is 'error'",
      },
      { name: 'disabled', type: 'boolean' },
      { name: 'readonly', type: 'boolean' },
      { name: 'required', type: 'boolean' },
      { name: 'type', type: 'TextInputType' },
      { name: 'name', type: 'string' },
      { name: 'id', type: 'string' },
      { name: 'autocomplete', type: 'string' },
      {
        name: 'inputmode',
        type: 'TextInputInputMode',
        description:
          "Virtual keyboard hint for mobile (e.g. 'numeric', 'email')",
      },
      { name: 'maxLength', type: 'number' },
      { name: 'minLength', type: 'number' },
      { name: 'min', type: 'string | number' },
      { name: 'max', type: 'string | number' },
      { name: 'step', type: 'string | number' },
      { name: 'pattern', type: 'string' },
      {
        name: 'prefixIcon',
        type: '"apple-filled" | "arrow-circle-down-outline" | "arrow-circle-left-outline" | "arrow-circle-right-outline" | "arrow-circle-up-outline" | "arrow-down-outline" | "arrow-left-outline" | ... 119 more ... | "wifi-signal-outline"',
        description: 'Icon shown inside the input on the left',
      },
      {
        name: 'suffixIcon',
        type: '"apple-filled" | "arrow-circle-down-outline" | "arrow-circle-left-outline" | "arrow-circle-right-outline" | "arrow-circle-up-outline" | "arrow-down-outline" | "arrow-left-outline" | ... 119 more ... | "wifi-signal-outline"',
        description: 'Icon shown inside the input on the right',
      },
      {
        name: 'clearable',
        type: 'boolean',
        description: 'Show a clear (X) button when input has a value',
      },
      { name: 'autoFocus', type: 'boolean' },
      { name: 'size', type: 'TextInputSize' },
      { name: 'fullWidth', type: 'boolean' },
      {
        name: 'validationState',
        type: 'TextInputValidationState',
        description:
          "Visual state: 'default', 'success', 'warning', or 'error'",
      },
      {
        name: 'showCounter',
        type: 'boolean',
        description: 'Show character counter — requires maxLength to be set',
      },
      { name: 'width', type: 'number' },
      { name: 'height', type: 'number' },
      {
        name: 'ariaLabel',
        type: 'string',
        description:
          'Accessible label for screen readers (when no visible label)',
      },
      {
        name: 'ariaDescribedBy',
        type: 'string',
        description: 'ID of an element that describes this input',
      },
      {
        name: 'showValidationIcon',
        type: 'boolean',
        description: 'Show an icon indicating the validation state',
      },
    ],
    events: [
      { name: 'update:modelValue', payload: 'string' },
      { name: 'input', payload: 'string' },
      { name: 'change', payload: 'string' },
      { name: 'focus', payload: 'FocusEvent' },
      { name: 'blur', payload: 'FocusEvent' },
      { name: 'clear', payload: 'void' },
      { name: 'keydown', payload: 'KeyboardEvent' },
      {
        name: 'enter',
        payload: 'string',
        description: 'Fired on Enter key press with the current input value',
      },
    ],
    slots: [],
  },
  {
    name: 'Select',
    description:
      'Single-selection dropdown with optional search filtering. Options must be `{ value, label }` objects. Use v-model for the selected value.',
    props: [
      {
        name: 'options',
        type: 'MultiselectOption[]',
        required: true,
        description:
          'Array of { value: string|number, label: string, disabled?: boolean }',
      },
      {
        name: 'modelValue',
        type: 'string | number | null',
        description:
          'v-model binding — the selected value (string | number | null)',
      },
      {
        name: 'searchQuery',
        type: 'string',
        description:
          'v-model:searchQuery — two-way binding for the search input',
      },
      { name: 'placeholder', type: 'string' },
      { name: 'searchPlaceholder', type: 'string' },
      { name: 'disabled', type: 'boolean' },
      {
        name: 'searchable',
        type: 'boolean',
        description: 'Show a search input inside the dropdown',
      },
      {
        name: 'disableAutofilter',
        type: 'boolean',
        description:
          'Disable client-side filtering — use for server-side search with v-model:searchQuery',
      },
      { name: 'size', type: 'ButtonSize', default: "'medium'" },
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      {
        name: 'validationState',
        type: 'TextInputValidationState',
        description:
          "Visual state: 'default', 'success', 'warning', or 'error'",
      },
      {
        name: 'errorMessage',
        type: 'string',
        description: 'Error message shown below the select',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Helper text shown below the select',
      },
      {
        name: 'appendToBody',
        type: 'boolean',
        description:
          'Teleport dropdown to <body> — use when inside overflow:hidden containers',
      },
    ],
    events: [
      { name: 'update:modelValue', payload: 'string | number | null' },
      { name: 'update:searchQuery', payload: 'string' },
      { name: 'change', payload: 'string | number | null' },
      {
        name: 'open',
        payload: 'void',
        description: 'Fired when the dropdown opens',
      },
      {
        name: 'close',
        payload: 'void',
        description: 'Fired when the dropdown closes',
      },
      {
        name: 'select',
        payload: 'MultiselectOption',
        description:
          'Fired with the full option object { value, label } when an option is selected',
      },
    ],
    slots: [{ name: 'option' }],
  },
  {
    name: 'Multiselect',
    description:
      'Multi-selection dropdown with checkboxes and optional search. Options must be `{ value, label }` objects. v-model is an array of selected values.',
    props: [
      {
        name: 'options',
        type: 'MultiselectOption[]',
        required: true,
        description:
          'Array of { value: string|number, label: string, disabled?: boolean }',
      },
      {
        name: 'modelValue',
        type: '(string | number)[]',
        description: 'v-model binding — array of selected values',
      },
      {
        name: 'searchQuery',
        type: 'string',
        description:
          'v-model:searchQuery — two-way binding for the search input',
      },
      { name: 'selectPlaceholder', type: 'string' },
      { name: 'searchPlaceholder', type: 'string' },
      {
        name: 'maxSelectionsMessage',
        type: 'string',
        description: 'Message shown when max selections is reached',
      },
      { name: 'disabled', type: 'boolean' },
      {
        name: 'maxSelections',
        type: 'number',
        description: 'Maximum number of items that can be selected',
      },
      { name: 'searchable', type: 'boolean', default: 'true' },
      { name: 'clearable', type: 'boolean', default: 'true' },
      { name: 'closeOnSelect', type: 'boolean', default: 'false' },
      { name: 'size', type: 'ButtonSize', default: "'medium'" },
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'checkboxPosition', type: '"left" | "right"', default: "'left'" },
      {
        name: 'showSelectedItems',
        type: 'boolean',
        default: 'true',
        description: 'Show selected items as tags below the dropdown',
      },
      {
        name: 'validationState',
        type: 'TextInputValidationState',
        description:
          "Visual state: 'default', 'success', 'warning', or 'error'",
      },
      {
        name: 'errorMessage',
        type: 'string',
        description: 'Error message shown below the multiselect',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Helper text shown below the multiselect',
      },
      {
        name: 'appendToBody',
        type: 'boolean',
        description:
          'Teleport dropdown to <body> — use when inside overflow:hidden containers',
      },
    ],
    events: [
      { name: 'update:modelValue', payload: '(string | number)[]' },
      { name: 'update:searchQuery', payload: 'string' },
      { name: 'change', payload: '(string | number)[]' },
      { name: 'open', payload: 'void' },
      { name: 'close', payload: 'void' },
      {
        name: 'clear',
        payload: 'void',
        description: 'Fired when all selections are cleared',
      },
      {
        name: 'option-select',
        payload: 'MultiselectOption',
        description:
          'Fired with the full option object when an item is checked',
      },
      {
        name: 'option-deselect',
        payload: 'MultiselectOption',
        description:
          'Fired with the full option object when an item is unchecked',
      },
      {
        name: 'remove-tag',
        payload: 'string | number',
        description: 'Fired with the value when a selected tag is removed',
      },
    ],
    slots: [],
  },
  {
    name: 'Tab',
    description:
      'Tab navigation with pill-style buttons. Use v-model:selectedTab for the active tab and the default scoped slot for tab panel content.',
    props: [
      {
        name: 'tabs',
        type: 'TabItem[]',
        required: true,
        description:
          'Array of { value: string|number, label: string, disabled?: boolean, icon?: IconNames }',
      },
      {
        name: 'selectedTab',
        type: 'string | number',
        description: 'v-model:selectedTab — the currently active tab value',
      },
      { name: 'size', type: 'ButtonSize' },
      { name: 'fullWidth', type: 'boolean' },
      { name: 'selectedColor', type: 'TabSelectedColor' },
    ],
    events: [
      { name: 'update:selectedTab', payload: 'string | number' },
      { name: 'change', payload: 'string | number' },
      {
        name: 'tab-click',
        payload: '{ value: string | number; label: string }',
        description: 'Fired when a tab is clicked — payload: { value, label }',
      },
    ],
    slots: [
      {
        name: 'default',
        description:
          'Tab panel content — scoped: { currentTab: TabItem, currentValue: string|number }',
      },
    ],
  },
  {
    name: 'GroupedButtons',
    description:
      'Segmented control — horizontal group of mutually exclusive toggle buttons. Use v-model:selectedButton for the active option.',
    props: [
      {
        name: 'options',
        type: 'GroupedButtonsOption[]',
        required: true,
        description:
          'Array of { value: string|number, label: string, disabled?: boolean, icon?: IconNames }',
      },
      {
        name: 'selectedButton',
        type: 'string | number',
        description:
          'v-model:selectedButton — the currently active button value',
      },
      { name: 'size', type: 'ButtonSize', default: "'medium'" },
      { name: 'variant', type: 'ButtonVariant' },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        description: 'Stretch buttons to fill the container width equally',
      },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
    events: [
      { name: 'update:selectedButton', payload: 'string | number' },
      { name: 'change', payload: 'string | number' },
    ],
    slots: [],
  },
  {
    name: 'DropdownButton',
    description:
      'Button that opens a dropdown menu with selectable items. Use the `select` event to handle item selection.',
    props: [
      {
        name: 'text',
        type: 'string',
        required: true,
        description: 'Button label text',
      },
      {
        name: 'menuItems',
        type: 'DropdownButtonMenuItem[]',
        required: true,
        description:
          'Array of { value: string|number, label: string, icon?: IconNames, disabled?: boolean }',
      },
      { name: 'size', type: 'ButtonSize', default: "'medium'" },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
    events: [
      {
        name: 'select',
        payload: 'DropdownButtonMenuItem',
        description:
          'Fired with the full menu item object when an item is selected',
      },
      {
        name: 'open',
        payload: 'void',
        description: 'Fired when the dropdown menu opens',
      },
      {
        name: 'close',
        payload: 'void',
        description: 'Fired when the dropdown menu closes',
      },
    ],
    slots: [],
  },
  {
    name: 'Table',
    description:
      'Data table with client-side sorting. Use `cell-{key}` scoped slots for custom cell rendering. No built-in row-click — add interactions via cell slots.',
    props: [
      {
        name: 'columns',
        type: 'TableColumn[]',
        required: true,
        description:
          "Array of { key: string, label: string, sortable?: boolean, sortType?: 'text'|'number'|'date' }",
      },
      {
        name: 'data',
        type: 'TableData[]',
        required: true,
        description: 'Array of row objects — each row is keyed by column.key',
      },
      {
        name: 'striped',
        type: 'boolean',
        default: 'false',
        description: 'Alternate row background colors for readability',
      },
      {
        name: 'defaultSortColumn',
        type: 'string',
        description: 'Column key to sort by on initial render',
      },
      {
        name: 'defaultSortOrder',
        type: 'TableSortOrder',
        default: "'asc'",
        description: "Initial sort direction: 'asc' or 'desc'",
      },
      {
        name: 'nonInteractive',
        type: 'boolean',
        default: 'false',
        description:
          'Disable hover/click styles and sorting — for display-only tables',
      },
    ],
    events: [],
    slots: [
      {
        name: 'cell-{key}',
        description:
          'Custom cell renderer per column. Scoped: { row, column, value }. Example: <template #cell-name="{ row }">{{ row.name }}</template>',
      },
    ],
  },
  {
    name: 'Radio',
    description:
      'Radio button input with label and optional description text. Use `card` prop for a bordered card-style layout.',
    props: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: 'Radio label text (required)',
      },
      {
        name: 'description',
        type: 'string',
        description: 'Secondary description text below the label',
      },
      { name: 'checked', type: 'boolean', default: 'false' },
      { name: 'disabled', type: 'boolean', default: 'false' },
      {
        name: 'size',
        type: 'ButtonSize',
        default: "'medium'",
        description: 'Button size variant',
      },
      {
        name: 'card',
        type: 'boolean',
        default: 'false',
        description: 'Enable card-style radio with border',
      },
    ],
    events: [
      { name: 'update:checked', payload: 'boolean' },
      { name: 'change', payload: 'boolean' },
    ],
    slots: [],
  },
  {
    name: 'Tooltip',
    description:
      'Tooltip shown on hover/focus around its slotted trigger element. Supports four positions and configurable show delay.',
    props: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: 'Tooltip text content',
      },
      { name: 'position', type: 'TooltipPosition', default: "'top'" },
      { name: 'disabled', type: 'boolean', default: 'false' },
      {
        name: 'delay',
        type: 'number',
        description: 'Delay in milliseconds before showing the tooltip',
      },
      {
        name: 'maxWidth',
        type: 'number',
        description: 'Maximum width in pixels for the tooltip bubble',
      },
    ],
    events: [
      { name: 'show', payload: 'void' },
      { name: 'hide', payload: 'void' },
    ],
    slots: [
      {
        name: 'default',
        description: 'The trigger element the tooltip is attached to',
      },
    ],
  },
  {
    name: 'Icon',
    description:
      'SVG icon from the design system icon library (127 icons). Always verify icon names exist using the search_icons tool before using.',
    props: [
      {
        name: 'name',
        type: '"apple-filled" | "arrow-circle-down-outline" | "arrow-circle-left-outline" | "arrow-circle-right-outline" | "arrow-circle-up-outline" | "arrow-down-outline" | "arrow-left-outline" | ... 119 more ... | "wifi-signal-outline"',
        required: true,
        description:
          "Icon name in kebab-case (e.g. 'close-outline', 'check-outline'). Use search_icons tool to find valid names.",
      },
      {
        name: 'size',
        type: 'number',
        description: 'Size in rem units (e.g. 1 = 16px, 1.5 = 24px, 2 = 32px)',
      },
      {
        name: 'color',
        type: 'ThemeColor',
        description: 'Icon color — accepts any ThemeColor value',
      },
    ],
    events: [],
    slots: [],
  },
  {
    name: 'Spinner',
    description:
      'Animated loading spinner with gradient effect. Use inside buttons (loading prop) or as standalone loading indicators.',
    props: [
      {
        name: 'size',
        type: 'ComponentSize',
        default: '1.5',
        description: 'Spinner diameter in rem units (e.g. 1.5 = 24px)',
      },
      { name: 'color', type: '"primary" | "neutral-300"' },
    ],
    events: [],
    slots: [],
  },
  {
    name: 'SkeletonPreload',
    description:
      'Skeleton loading placeholder with animated shimmer effect. Use to indicate content loading — matches the shape of the content it replaces.',
    props: [
      { name: 'width', type: 'number', description: 'Width in pixels' },
      { name: 'height', type: 'number', description: 'Height in pixels' },
      {
        name: 'borderRadius',
        type: 'number',
        description: 'Border radius in pixels (for rounded rectangles)',
      },
      {
        name: 'isRounded',
        type: 'boolean',
        description:
          'Perfect circle shape — for avatar or profile image placeholders',
      },
    ],
    events: [],
    slots: [],
  },
  {
    name: 'ImagePreview',
    description:
      'Image component with built-in loading skeleton and error fallback. Shows a skeleton placeholder while loading and a fallback on error.',
    props: [
      {
        name: 'width',
        type: 'number',
        default: '40',
        description: 'Image width in pixels',
      },
      {
        name: 'height',
        type: 'number',
        default: '40',
        description: 'Image height in pixels',
      },
      {
        name: 'alt',
        type: 'string',
        default: "'Image without alt text'",
        description: 'Alt text for accessibility',
      },
      {
        name: 'imageSrc',
        type: 'string',
        required: true,
        description: 'Image URL (required)',
      },
      {
        name: 'borderRadius',
        type: 'number',
        default: '8',
        description: 'Border radius in pixels',
      },
    ],
    events: [],
    slots: [],
  },
  {
    name: 'DropZone',
    description:
      "Drag-and-drop file upload area with preview. Events are prefixed with `instanceName` (e.g. instanceName='avatar' emits @avatar-drop, @avatar-drop-error, @avatar-remove).",
    props: [
      {
        name: 'instanceName',
        type: 'string',
        required: true,
        description:
          'Unique ID (required) — used as event prefix: {instanceName}-drop, {instanceName}-drop-error, {instanceName}-remove',
      },
      {
        name: 'allowedFileTypes',
        type: 'AllowedFileTypes',
        default: "'images'",
        description: "File type preset: 'images', 'documents', etc.",
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'true',
        description: 'Allow selecting multiple files',
      },
      {
        name: 'accept',
        type: 'string',
        description:
          "MIME type filter string (e.g. 'image/*', 'application/pdf')",
      },
      {
        name: 'label',
        type: 'string',
        description: 'Custom label text for the drop area',
      },
      {
        name: 'displayPreview',
        type: 'boolean',
        default: 'true',
        description: 'Show image preview thumbnails for uploaded files',
      },
      {
        name: 'displayFileList',
        type: 'boolean',
        default: 'false',
        description: 'Show a file list instead of previews',
      },
    ],
    events: [
      {
        name: '{instanceName}-drop',
        payload: 'FileList',
        description: 'Files dropped or selected successfully',
      },
      {
        name: '{instanceName}-drop-error',
        payload: 'string',
        description: 'Error message when a file is rejected (wrong type, etc.)',
      },
      {
        name: '{instanceName}-remove',
        payload: 'FileWithPreview',
        description: 'A file was removed from the preview',
      },
      {
        name: 'update:modelValue',
        payload: 'FileWithPreview[] | null',
        description: 'Model value updated with current file list',
      },
    ],
    slots: [],
  },
  {
    name: 'Overlay',
    description:
      'Modal backdrop overlay with scroll lock and keyboard support. Place your modal content in the default slot. Use v-model:visible to control visibility.',
    props: [
      {
        name: 'visible',
        type: 'boolean',
        default: 'false',
        description: 'v-model:visible — controls whether the overlay is shown',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'true',
        description: 'Allow closing via backdrop click or Escape key',
      },
      {
        name: 'closeOnBackdrop',
        type: 'boolean',
        default: 'true',
        description: 'Close when clicking outside the modal content',
      },
      {
        name: 'closeOnEsc',
        type: 'boolean',
        default: 'true',
        description: 'Close when pressing Escape key',
      },
      {
        name: 'lockScroll',
        type: 'boolean',
        default: 'true',
        description: 'Prevent background scroll while overlay is open',
      },
      {
        name: 'blur',
        type: 'boolean',
        description: 'Apply a blur effect to the backdrop',
      },
      {
        name: 'placement',
        type: 'OverlayPlacement',
        default: "'center'",
        description: 'Vertical placement of the modal content',
      },
      { name: 'zIndex', type: 'number' },
      { name: 'role', type: '"presentation" | "dialog"' },
      {
        name: 'ariaLabel',
        type: 'string',
        description: 'Accessible label for the overlay dialog',
      },
    ],
    events: [
      { name: 'update:visible', payload: 'boolean' },
      { name: 'close', payload: 'void' },
      {
        name: 'escape',
        payload: 'void',
        description: 'Fired when the Escape key is pressed',
      },
      {
        name: 'backdrop-click',
        payload: 'void',
        description:
          'Fired when the backdrop area is clicked (not the content)',
      },
    ],
    slots: [
      {
        name: 'default',
        description: 'Modal content — rendered on top of the backdrop',
      },
    ],
  },
  {
    name: 'OverlayMessage',
    description:
      'Pre-built modal dialog for status messages (success, error, warning, info). Includes title, body content, and up to two action buttons. Wraps Overlay internally.',
    props: [
      {
        name: 'visible',
        type: 'boolean',
        default: 'false',
        description: 'v-model:visible — controls whether the dialog is shown',
      },
      {
        name: 'status',
        type: 'OverlayMessageStatus',
        description: 'Status type — determines the default icon and color',
      },
      {
        name: 'iconName',
        type: '"apple-filled" | "arrow-circle-down-outline" | "arrow-circle-left-outline" | "arrow-circle-right-outline" | "arrow-circle-up-outline" | "arrow-down-outline" | "arrow-left-outline" | ... 119 more ... | "wifi-signal-outline"',
      },
      { name: 'iconColor', type: 'ThemeColor' },
      { name: 'iconSize', type: 'number' },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: 'Dialog title text (required)',
      },
      {
        name: 'eyebrow',
        type: 'string',
        description: 'Small text displayed above the title',
      },
      { name: 'dismissible', type: 'boolean', default: 'true' },
      { name: 'closeButtonLabel', type: 'string' },
      { name: 'closeOnBackdrop', type: 'boolean' },
      { name: 'closeOnEsc', type: 'boolean' },
      { name: 'lockScroll', type: 'boolean' },
      { name: 'zIndex', type: 'number' },
      { name: 'blur', type: 'boolean' },
      { name: 'placement', type: 'OverlayPlacement' },
      { name: 'ariaLabel', type: 'string' },
      {
        name: 'primaryButtonLabel',
        type: 'string',
        description: 'Label for the primary action button',
      },
      {
        name: 'secondaryButtonLabel',
        type: 'string',
        description: 'Label for the secondary action button',
      },
      {
        name: 'primaryButtonVariant',
        type: 'Variant',
        description:
          "Visual variant for the primary button (e.g. 'primary', 'secondary')",
      },
      {
        name: 'secondaryButtonVariant',
        type: 'Variant',
        description: 'Visual variant for the secondary button',
      },
      {
        name: 'loadingPrimary',
        type: 'boolean',
        description: 'Show spinner on the primary button',
      },
      {
        name: 'loadingSecondary',
        type: 'boolean',
        description: 'Show spinner on the secondary button',
      },
      { name: 'showCloseButton', type: 'boolean' },
      { name: 'maxWidth', type: 'number' },
      {
        name: 'standalone',
        type: 'boolean',
        description:
          'Render without Overlay wrapper — use for embedding inside existing modals',
      },
    ],
    events: [
      { name: 'update:visible', payload: 'boolean' },
      { name: 'close', payload: 'void' },
      {
        name: 'primary-click',
        payload: 'void',
        description: 'Fired when the primary action button is clicked',
      },
      {
        name: 'secondary-click',
        payload: 'void',
        description: 'Fired when the secondary action button is clicked',
      },
      {
        name: 'backdrop-click',
        payload: 'void',
        description: 'Fired when the backdrop area is clicked',
      },
      {
        name: 'escape',
        payload: 'void',
        description: 'Fired when the Escape key is pressed',
      },
    ],
    slots: [
      {
        name: 'icon',
        description: 'Custom icon replacing the default status icon',
      },
      {
        name: 'default',
        description:
          'Message body content — rendered between the title and action buttons',
      },
      {
        name: 'actions',
        description:
          'Custom action buttons replacing the default primary/secondary buttons',
      },
    ],
  },
  {
    name: 'LogoToteat',
    description:
      "Toteat brand logo. Supports 'complete' (full logo with text) or 'icon-only' (isotipo) mode, with 'original' or 'white' color variants.",
    props: [
      {
        name: 'mode',
        type: 'LogoToteatMode',
        default: "'complete'",
        description:
          "Logo display mode: 'complete' (full logo) or 'icon-only' (isotipo)",
      },
      {
        name: 'variant',
        type: 'LogoToteatVariant',
        default: "'original'",
        description:
          "Color variant: 'original' (brand colors) or 'white' (monochrome)",
      },
      { name: 'width', type: 'number', description: 'Logo width in pixels' },
      { name: 'height', type: 'number', description: 'Logo height in pixels' },
      {
        name: 'alt',
        type: 'string',
        default: "'Logo Toteat'",
        description: 'Alt text for accessibility',
      },
    ],
    events: [],
    slots: [],
  },
  {
    name: 'BackgroundWrapper',
    description:
      'Full-screen background wrapper with the Toteat brand gradient. No configurable props — just wrap your content in the default slot.',
    props: [],
    events: [],
    slots: [
      {
        name: 'default',
        description: 'Content rendered on top of the gradient background',
      },
    ],
  },
  {
    name: 'TreeItem',
    description:
      "Individual tree node — used internally by TreeList. Prefer TreeList for most use cases. TreeItem handles a single node's expand/collapse, selection, and drag behavior.",
    props: [
      {
        name: 'item',
        type: 'TreeItemData',
        required: true,
        description:
          'Tree node data: { id, label, children?, disabled?, meta? }',
      },
      {
        name: 'level',
        type: 'number',
        default: '0',
        description: 'Nesting depth — controls indentation (0 = root level)',
      },
      { name: 'expanded', type: 'boolean', default: 'false' },
      { name: 'selected', type: 'boolean', default: 'false' },
      { name: 'draggable', type: 'boolean' },
      {
        name: 'selectable',
        type: 'boolean',
        description: 'Show a checkbox for this node',
      },
      {
        name: 'hasChildren',
        type: 'boolean',
        description: 'Show expand/collapse chevron icon',
      },
      {
        name: 'indentSize',
        type: 'number',
        description: 'Indentation per level in pixels',
      },
      {
        name: 'parentId',
        type: 'string | number | null',
        description: 'ID of the parent node (null for root)',
      },
      {
        name: 'bordered',
        type: 'boolean',
        description: 'Show a border around the node',
      },
      {
        name: 'flatIndex',
        type: 'number',
        description:
          '0-indexed position in the flattened tree — used for striped rows',
      },
      {
        name: 'striped',
        type: 'boolean',
        description: 'Alternate background color based on flatIndex',
      },
    ],
    events: [
      {
        name: 'toggle-expand',
        payload: 'string | number',
        description: 'Fired with the item ID when expanded/collapsed',
      },
      {
        name: 'toggle-select',
        payload: 'string | number',
        description: 'Fired with the item ID when checkbox is toggled',
      },
      {
        name: 'dragstart',
        payload:
          '{ event: DragEvent; item: TreeItemData; parentId: string | number | null; }',
      },
      { name: 'dragend', payload: '{ event: DragEvent; item: TreeItemData }' },
      {
        name: 'dragover',
        payload:
          '{ event: DragEvent; item: TreeItemData; parentId: string | number | null; }',
      },
      {
        name: 'dragleave',
        payload: '{ event: DragEvent; item: TreeItemData }',
      },
      {
        name: 'drop',
        payload:
          '{ event: DragEvent; item: TreeItemData; parentId: string | number | null; }',
      },
    ],
    slots: [
      {
        name: 'prefix',
        description:
          'Content before the label — scoped: { item: TreeItemData, level: number }',
      },
      {
        name: 'label',
        description:
          'Custom label content — scoped: { item: TreeItemData, level: number }',
      },
      {
        name: 'meta',
        description:
          'Custom meta text (right side) — scoped: { item: TreeItemData, level: number }',
      },
      {
        name: 'suffix',
        description:
          'Content after the label — scoped: { item: TreeItemData, level: number }',
      },
      { name: 'children', description: 'Custom rendering for child nodes' },
    ],
  },
  {
    name: 'TreeList',
    description:
      'Hierarchical tree list with expand/collapse, checkbox selection, and optional drag-to-reorder within the same level. Use v-model:expandedIds and v-model:selectedIds to control state.',
    props: [
      {
        name: 'items',
        type: 'TreeItemData[]',
        description:
          'Hierarchical tree data — array of TreeItemData with nested children',
      },
      {
        name: 'draggable',
        type: 'boolean',
        description:
          'Enable drag-and-drop reordering within the same parent level',
      },
      {
        name: 'expandedIds',
        type: '(string | number)[]',
        description: 'v-model:expandedIds — array of expanded node IDs',
      },
      {
        name: 'selectedIds',
        type: '(string | number)[]',
        description:
          'v-model:selectedIds — array of selected (checked) node IDs',
      },
      {
        name: 'selectable',
        type: 'boolean',
        description: 'Show checkboxes on all nodes',
      },
      {
        name: 'indentSize',
        type: 'number',
        description: 'Indentation per level in pixels',
      },
      {
        name: 'bordered',
        type: 'boolean',
        description: 'Show borders around each node',
      },
      {
        name: 'striped',
        type: 'boolean',
        description: 'Alternate row background colors',
      },
    ],
    events: [
      { name: 'update:items', payload: 'TreeItemData[]' },
      { name: 'update:expandedIds', payload: '(string | number)[]' },
      { name: 'update:selectedIds', payload: '(string | number)[]' },
      {
        name: 'reorder',
        payload:
          '{ itemId: string | number; fromParentId: string | number | null; toParentId: string | number | null; fromIndex: number; toIndex: number; }',
        description:
          'Fired after drag-and-drop — payload: { itemId, fromParentId, toParentId, fromIndex, toIndex }',
      },
      {
        name: 'item-expand',
        payload: 'TreeItemData',
        description:
          'Fired with full TreeItemData when a node is expanded/collapsed',
      },
      {
        name: 'item-select',
        payload: 'TreeItemData',
        description:
          "Fired with full TreeItemData when a node's checkbox is toggled",
      },
    ],
    slots: [
      {
        name: 'label',
        description:
          'Custom label per node — scoped: { item: TreeItemData, level: number }',
      },
      {
        name: 'meta',
        description:
          'Custom meta text per node — scoped: { item: TreeItemData, level: number }',
      },
      {
        name: 'prefix',
        description:
          "Content before each node's label — scoped: { item: TreeItemData, level: number }",
      },
      {
        name: 'suffix',
        description:
          "Content after each node's label — scoped: { item: TreeItemData, level: number }",
      },
    ],
  },
];

export const COMPONENT_MAP = new Map<string, ComponentDef>(
  COMPONENTS.map((c) => [c.name.toLowerCase(), c]),
);
