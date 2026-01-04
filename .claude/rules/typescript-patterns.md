---
description: Use when writing or reviewing TypeScript/React code. Covers Branded Types, immutability, type safety, exhaustiveness checks, avoiding any/non-null assertions, React/Next.js patterns. (project)
alwaysApply: false
paths: "**/*.ts,**/*.tsx"
globs: "*.ts,*.tsx"
---

# TypeScript/React Patterns and Best Practices

Guidelines for writing type-safe, maintainable TypeScript/React code in the Braille-Finder project.

## Type Safety Fundamentals

### Branded Types

Use nominal typing on primitive types to prevent misuse.

```typescript
// Define Branded Type
declare const BitPositionBrand: unique symbol;
export type BitPosition = (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) & {
  readonly [BitPositionBrand]: typeof BitPositionBrand;
};

// Factory function to create the type
export const createBitPosition = (value: number): BitPosition => {
  if (!Number.isInteger(value) || value < 0 || value > 7) {
    throw new Error(`Invalid bit position: ${value}. Must be 0-7.`);
  }
  return value as BitPosition;
};

// Type guard for validation
export const isBitPosition = (value: number): value is BitPosition => {
  return Number.isInteger(value) && value >= 0 && value <= 7;
};
```

**Benefits**:
- Prevents mixing incompatible types at compile time
- Guarantees value validity through factory functions
- Runtime validation with type guards

### Exhaustiveness Checking with `satisfies never`

When branching on string unions, use the `satisfies never` pattern to guarantee compile-time exhaustiveness.

```typescript
type MatchResult = "exact" | "match" | "none";

function getClassName(result: MatchResult): string {
  switch (result) {
    case 'exact':
      return 'bg-green-500';
    case 'match':
      return 'bg-yellow-500';
    case 'none':
      return 'bg-gray-500';
    default: {
      result satisfies never; // Error if new variant added
      throw new Error(`Unsupported match result: ${String(result)}`);
    }
  }
}
```

**Benefits**:
- Adding a new union member will trigger a compile-time error
- Keeps union definition and switch statement in sync automatically
- No temporary variables needed
- Clear intent about exhaustiveness checking

### Avoiding `any` Type

Always use specific types instead of `any` when possible.

**Bad**:
```typescript
function processData(data: any): any {
  return data.value;
}
```

**Good**:
```typescript
// Using generics
function processData<T extends { value: U }, U>(data: T): U {
  return data.value;
}

// Using unknown with type narrowing
function processData(data: unknown): unknown {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as Record<string, unknown>).value;
  }
  throw new Error('Invalid data format');
}
```

**Alternatives to `any`**:
- Use `unknown` when type is truly not known, then narrow with type guards
- Use `Record<string, unknown>` for objects with unknown property values
- Use union types to represent multiple possible types
- Use generics with type constraints

### Non-null Assertions (`!`) - Avoid

Never use non-null assertions. Instead, use proper null checking.

**Bad**:
```typescript
function getConfig(configMap: Map<string, Config>): Config {
  const config = configMap.get('default');
  return config!; // Dangerous!
}
```

**Good**:
```typescript
// Explicit null check
function getConfig(configMap: Map<string, Config>): Config {
  const config = configMap.get('default');
  if (!config) {
    throw new Error('Default config not found');
  }
  return config;
}

// Optional chaining with nullish coalescing
function getConfig(configMap: Map<string, Config>): Config {
  return configMap.get('default') ?? getDefaultConfig();
}
```

### Explicit Return Types

Always specify return types for functions.

**Bad**:
```typescript
const calculateTotal = (items: Item[]) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

**Good**:
```typescript
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

## Immutability Guarantees

### Aggressive Use of `readonly` Modifier

- Prefer `readonly T[]` for arrays
- Use `readonly` in Props definitions
- Freeze objects with `Object.freeze()`

```typescript
// Props definition
export type BrailleCellProps = {
  readonly dots: readonly DotNumber[];
  readonly isSelected: boolean;
  readonly onClick: () => void;
};

// Function return value
export const getDots = (value: BinaryPattern): readonly DotNumber[] => {
  const dots: DotNumber[] = [];
  for (let bit = 0; bit < 8; bit++) {
    if (value & (1 << bit)) {
      dots.push(BIT_TO_DOT_MAP[createBitPosition(bit)]);
    }
  }
  return Object.freeze(dots.sort((a, b) => a - b));
};
```

### Parameter Reassignment - Avoid

Create new variables instead of reassigning function parameters.

**Bad**:
```typescript
function mergeOptions(options: Options, overrides?: Options): Options {
  options = { ...options, ...overrides }; // Reassignment
  return options;
}
```

**Good**:
```typescript
function mergeOptions(options: Options, overrides?: Options): Options {
  const mergedOptions = { ...options, ...overrides };
  return mergedOptions;
}
```

### Type-Safe Property Deletion

Use proper type-safe methods to remove properties instead of setting to `undefined` or using `delete`.

**Bad**:
```typescript
function removeProperty(obj: Record<string, JSONSchema7Definition>): void {
  obj['propertyToRemove'] = undefined; // Type error!
}
```

**Good - Destructuring (Immutable)**:
```typescript
function removeProperty(obj: Record<string, JSONSchema7Definition>): Record<string, JSONSchema7Definition> {
  const { propertyToRemove, ...rest } = obj;
  return rest;
}
```

**Good - Delete (In-place)**:
```typescript
function removeProperty(obj: Record<string, JSONSchema7Definition>): void {
  delete obj['propertyToRemove'];
}
```

## Type Assertions and Guards

### `as const` and `satisfies`

- `as const`: Preserve constant literal types
- `satisfies`: Type check while maintaining type inference

```typescript
const BIT_TO_DOT_MAP = {
  [createBitPosition(0)]: 1,
  [createBitPosition(1)]: 2,
  [createBitPosition(2)]: 3,
  [createBitPosition(3)]: 7,
  [createBitPosition(4)]: 4,
  [createBitPosition(5)]: 5,
  [createBitPosition(6)]: 6,
  [createBitPosition(7)]: 8,
} as const satisfies BitToDotMap;
```

## Imports and Exports

### Imports

- Use `type` keyword for type-only imports
- Use `@/` alias for path resolution

```typescript
import type { BrailleCharacter, DotNumber } from "@/types";
import { generateBrailleData } from "@/lib/braille";
```

### Exports

- Prefer Named Exports for components
- Centralize type definitions in `types/index.ts` with re-exports
- Avoid classes with only static members

**Bad - Class with Only Static Members**:
```typescript
export class Utils {
  public static formatDate(date: Date): string {
    return date.toISOString();
  }
}
```

**Good - Simple Exports**:
```typescript
export const formatDate = (date: Date): string => {
  return date.toISOString();
};

export const parseDate = (dateStr: string): Date => {
  return new Date(dateStr);
};
```

**Centralized Type Exports**:
```typescript
// types/index.ts
export type {
  DotNumber,
  BitPosition,
  BrailleUnicode,
  BinaryPattern,
} from "./braille";

export type {
  BrailleCellProps,
  BrailleGridProps,
  BrailleTableProps,
} from "./components";
```

## React Components

### Function Components

- Use arrow functions or function declarations
- Define Props types separately
- Set `displayName` when using forwardRef

```typescript
// Regular component
export const BrailleCell = ({
  dots,
  isSelected,
  onClick,
}: BrailleCellProps) => {
  return <div onClick={onClick}></div>;
};

// forwardRef usage
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";
```

### Handling Unused Variables

Prefix unused Props with `_` (when planned for future implementation).

```typescript
export const BrailleCell = ({
  dots: _dots,        // Currently unused
  isSelected: _isSelected,
  onClick,
}: BrailleCellProps) => {
  return <div onClick={onClick}></div>;
};
```

### Remove Unused Code

After refactoring, always remove unused code:
- Delete unused variables, parameters, functions, classes, imports
- Don't comment out old code - delete it (git history preserves it)
- Remove unreachable code paths

## Styling

### Tailwind CSS

Use utility classes and combine conditional class names with `cn()` function.

```typescript
import { cn } from "@/lib/utils";

// cn function definition
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Usage example
<Comp className={cn(buttonVariants({ variant, size, className }))} />
```

### class-variance-authority (cva)

Use `cva` for variant management and extract types with `VariantProps`.

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

## Documentation

### JSDoc Comments

Write JSDoc for all type definitions and functions. Use `@param`, `@returns`, `@throws`, `@example` tags.

```typescript
/**
 * Get dot numbers from binary pattern
 * @param value - Binary pattern (0-255)
 * @returns Array of ON dot numbers (sorted, readonly)
 * @example getDots(createBinaryPattern(17)) // [1, 5] (0b00010001)
 */
export const getDots = (value: BinaryPattern): readonly DotNumber[] => {
  // ...
};
```

### File Header Comments

Add module description at the top of each file.

```typescript
/**
 * Braille-related type definitions
 * Uses Branded Types for enhanced type safety
 */
```

## Next.js Specific Patterns

### App Router

- `page.tsx`: Page component (default export)
- `layout.tsx`: Layout component (default export)

```typescript
// app/page.tsx
export default function Home() {
  return (
    <div className="flex justify-center">
      <BrailleTable />
    </div>
  );
}
```

### Metadata

Define meta information using `Metadata` type.

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Braille Finder",
  description: "Braille pattern search tool",
};
```

### Configuration

Use TypeScript configuration in `next.config.ts`.

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;
```

## Error Handling

### Factory Functions

Throw Error for invalid values. Write specific error messages.

```typescript
export const createBrailleUnicode = (value: number): BrailleUnicode => {
  if (!Number.isInteger(value) || value < 0x2800 || value > 0x28ff) {
    throw new Error(
      `Invalid braille unicode: 0x${value.toString(16)}. Must be 0x2800-0x28FF.`
    );
  }
  return value as BrailleUnicode;
};
```

## Coding Conventions

### General Rules

- Indentation: 2 spaces
- Semicolons: Required
- Quotes: Double quotes preferred

### Naming Conventions

- Type names: PascalCase
- Function names: camelCase
- Constants: UPPER_SNAKE_CASE (for maps, etc.)
- Components: PascalCase

### File Structure

```
frontend/src/
├── app/              # Next.js App Router
│   ├── layout.tsx
│   └── page.tsx
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── braille/     # Domain-specific components
├── lib/             # Utility functions
│   ├── utils.ts     # Common utilities
│   ├── braille.ts   # Domain logic
│   └── braille-guards.ts # Type guards & factories
└── types/           # Type definitions
    ├── index.ts     # Centralized type exports
    ├── braille.ts   # Domain types
    └── components.ts # Component types
```

## Quick Reference

1. **Branded Types**: Prevent primitive type misuse
2. **`satisfies never`**: Exhaustiveness checking for union type switches
3. **`unknown` over `any`**: Narrow with type guards
4. **`?.` and `??`**: Use instead of non-null assertions
5. **Explicit return types**: Specify for all functions
6. **`readonly`**: Use aggressively for Props, arrays, return values
7. **Destructuring**: Use for property removal
8. **Simple exports**: Avoid classes with only static members
9. **No parameter reassignment**: Create new variables
10. **Remove unused code**: Always after refactoring
