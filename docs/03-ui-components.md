# UI Components

This document outlines the UI component standards for the Link Shortener project.

## 🎨 Component Library

This project uses **shadcn/ui** as the primary component library. All UI elements must be built using shadcn/ui components.

## ⚠️ Core Rules

1. **ALWAYS use shadcn/ui components** - Do not create custom UI components
2. **Never reinvent the wheel** - If shadcn/ui has a component, use it
3. **Consistent styling** - All components follow Tailwind CSS v4 conventions
4. **Accessible by default** - shadcn/ui components are built with accessibility in mind

## 📦 Adding shadcn/ui Components

To add a new shadcn/ui component to the project:

```bash
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input
```

## 🔧 Available Components

shadcn/ui provides a wide range of pre-built components including:

- **Form elements**: Button, Input, Textarea, Select, Checkbox, Radio, Switch
- **Layout**: Card, Separator, Tabs, Sheet, Dialog, Drawer
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Data display**: Table, Badge, Avatar, Tooltip
- **Navigation**: Dropdown Menu, Navigation Menu, Breadcrumb

For the full list, visit: [shadcn/ui documentation](https://ui.shadcn.com/)

## 🎯 Usage Guidelines

### ✅ DO

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter URL" />
      <Button>Shorten</Button>
    </Card>
  )
}
```

### ❌ DON'T

```tsx
// Don't create custom button components
export function CustomButton({ children }) {
  return <button className="...">{children}</button>
}

// Don't create custom card components
export function CustomCard({ children }) {
  return <div className="rounded-lg border...">{children}</div>
}
```

## 🧩 Composition

shadcn/ui components are designed to be composed together. Build complex UIs by combining existing components:

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CreateLinkDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Short Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="url">Destination URL</Label>
            <Input id="url" placeholder="https://..." />
          </div>
          <Button>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

## 🎨 Customization

If you need to customize a shadcn/ui component:

1. **Modify the component file** in `/components/ui/` - shadcn/ui adds components to your project
2. **Use className prop** - All components accept additional Tailwind classes
3. **Extend with variants** - Use `class-variance-authority` (CVA) for variants

### Example Customization

```tsx
import { Button } from "@/components/ui/button"

// Add custom classes via className
<Button className="w-full">Full Width Button</Button>

// Components support variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Close</Button>
```

## 🌙 Theming

shadcn/ui uses CSS variables for theming. Theme configuration is in:
- `app/globals.css` - CSS variable definitions
- `tailwind.config.ts` - Tailwind theme extension

To adjust colors, spacing, or other theme values, modify these files rather than creating custom components.

## 🧱 Component Structure

When building features, organize components like this:

```
app/
  dashboard/
    page.tsx           # Server Component (page)
    _components/       # Private components for this route
      link-list.tsx    # Feature component using shadcn/ui
      link-form.tsx    # Feature component using shadcn/ui
components/
  ui/                  # shadcn/ui components (auto-generated)
    button.tsx
    card.tsx
    input.tsx
```

## 🔑 Key Principles

1. **No custom UI primitives** - Use shadcn/ui for all buttons, inputs, cards, etc.
2. **Compose, don't create** - Build features by composing shadcn/ui components
3. **Customize when needed** - Modify shadcn/ui components in `/components/ui/` or use className
4. **Maintain consistency** - All UI elements should use the same component library

---

For component-specific documentation and examples, refer to the [shadcn/ui documentation](https://ui.shadcn.com/).
