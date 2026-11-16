# Build a Premium Kerala Hindu Wedding Invitation Website

Act as a senior frontend engineer and creative web designer. Build a polished, production-quality wedding invitation microsite using the requirements below.

The goal is to create an elegant, cinematic digital wedding invitation inspired by contemporary Kerala aesthetics. This should feel like thoughtfully designed wedding stationery brought to life on the web — not a generic wedding template.

## 1. Technology Stack

Use:

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Motion (Framer Motion) for animations
- Lucide React for icons
- Next.js Image component where appropriate

Use clean, reusable React components and sensible project organization.

Do not introduce unnecessary dependencies.

## 2. Design Direction

**Visual identity: Contemporary Kasavu**

The website represents a Hindu Kerala wedding, but the visual language should be modern, restrained and sophisticated.

The design should communicate Kerala's cultural identity through materials, subtle ornamental details and visual references — not stereotypical decorations.

### Colour palette

Use this palette as the starting point:

- Warm ivory: `#F8F3E9`
- Soft sand: `#E8DCC5`
- Antique kasavu gold: `#B69A69`
- Muted green: `#6C7358`
- Deep teak brown: `#633B32`

Ivory should dominate. Gold should be used sparingly for borders, fine details, separators and accents. Deep brown should provide typography contrast.

Muted green is optional and should never dominate the design.

### Visual references

Use subtle references to:

- Kasavu fabric and its gold borders
- Traditional Kerala woodwork
- Brass nilavilakku
- Jasmine flowers
- Traditional ornamental geometry

Do not use these elements excessively or combine them into a stereotypical Kerala-themed collage.

### Strictly avoid

- Bollywood-style Indian wedding aesthetics
- Excessive gold gradients
- Bright red and gold colour combinations
- Giant temple illustrations
- Kathakali faces, elephants, houseboats or coconut trees as decorative clichés
- Excessive floral borders
- Overly ornamental backgrounds
- Generic Bootstrap wedding template styling
- Too many cards, boxes and rounded containers

The overall result should feel premium, editorial, minimal and distinctly Kerala-inspired.

## 3. Typography

Use two complementary typefaces.

**Display typography:**

- Elegant serif typeface.
- Consider Cormorant Garamond or Playfair Display.
- Use for couple names, section headings and prominent invitation text.

**Body typography:**

- Clean sans-serif such as DM Sans.
- Use for event information, descriptions, addresses and interactive controls.

Typography should be one of the main visual design elements.

Use generous spacing, clear hierarchy and restrained font weights.

The couple's names should feel like premium printed wedding stationery.

## 4. Website Experience

Build a single-page wedding invitation with a cinematic opening followed by a continuous vertical scrolling experience.

There should be NO fixed navigation bar, sidebar or conventional website menu.

Visitors should experience the invitation naturally through scrolling.

Only the following elements may remain floating:

- A compact music control.
- A subtle share control.

The website should feel like an invitation, not a conventional corporate website.

## 5. Opening Experience

Create a full-screen invitation cover.

### Initial state

The visitor should see:

- Warm ivory background.
- A custom couple monogram in the centre.
- Couple names.
- Wedding date.
- A fine kasavu-inspired ornamental border or subtle decorative detail.
- A clear "Open Invitation" action.

Keep the composition balanced and spacious.

The monogram should be configurable through the wedding data. It can also be generated from the couple's names when no explicit monogram is supplied.

### Opening interaction

When the visitor clicks "Open Invitation":

1. The cover transitions away using a smooth fade.
2. The monogram and opening typography transition subtly.
3. A couple portrait placeholder is revealed.
4. Couple names and a short invitation message appear.
5. The main invitation becomes visible.
6. Background music starts after this explicit user interaction, if enabled.

Use subtle opacity and transform animations.

Do not use excessive 3D effects, spinning animations, dramatic page flips or long transitions.

The opening should feel deliberate, refined and emotionally engaging.

## 6. Main Invitation Sections

Build the following sections in this order.

### A. Couple Introduction

This is the emotional centre of the invitation.

Include:

- Large couple portrait placeholder.
- Couple names.
- Short introductory message.
- Elegant typographic composition.

Use a portrait placeholder for now. Do not depend on real photography.

### B. Invitation Message

A short, elegant invitation message.

The content should be configurable.

Keep this section minimal and editorial.

Do not generate lengthy fictional romantic stories.

### C. Wedding Details

Display the wedding information clearly.

Include configurable fields for:

- Wedding date.
- Day of the week.
- Muhurtham time.
- Ceremony time.
- Event title.
- Additional event details, if any.

Support multiple events through an array in the data model.

The layout should be elegant and easy to scan.

### D. Venue

Include:

- Venue image placeholder.
- Venue name.
- Full address.
- Google Maps URL.
- Directions action.

The directions action should open the configured map URL.

### E. Closing Section

Create an elegant closing composition with:

- A warm thank-you message.
- Couple names or monogram.
- RSVP action.
- Calendar action.
- WhatsApp share action.
- A subtle decorative closing detail.

The closing should feel like the final page of a beautifully designed invitation.

## 7. Interactive Overlays

The main page remains a continuous scroll.

Practical actions should open elegant overlays rather than navigating visitors to separate pages.

Implement:

### RSVP Modal

Include:

- Guest name.
- Attendance confirmation.
- Number of guests.
- Optional message.

Use a responsive presentation:

- Bottom sheet on mobile.
- Centred modal on desktop.

For now, implement mock submission behaviour with client-side validation and a success state.

Do not pretend submissions are persisted to a database.

### Wishes Modal

Include:

- Guest name.
- Message field.
- Submit action.
- A few sample wishes for visual testing.

Use mock data and local component state for now.

Do not implement a fake backend.

### Calendar Action

Generate an `.ics` calendar file using the wedding event data.

The event title, date, time, location and description must come from the central data source.

Support an accurate event start and end time.

### WhatsApp Sharing

Create a WhatsApp share URL using the configured invitation title, couple names and website URL.

Do not hardcode the actual website URL. Read it from configuration.

### Modal Behaviour

All overlays must:

- Have smooth but subtle entrance and exit transitions.
- Close through an explicit close button.
- Close on backdrop click.
- Support Escape key.
- Prevent background scrolling while open.
- Be accessible with appropriate focus handling and ARIA attributes.

## 8. Background Music

Implement background music with a small floating music control.

Requirements:

- Music is disabled or paused before the visitor opens the invitation.
- Start playback only after the visitor clicks "Open Invitation".
- Display the correct play/pause state.
- Allow visitors to pause and resume.
- Keep music state consistent while scrolling and opening modals.
- Handle missing audio files gracefully.
- Respect browser autoplay restrictions.
- Pause playback when the document becomes hidden if appropriate.
- Respect reduced-motion and accessibility preferences where relevant.

Music URL and enablement must come from the central data source.

Do not hardcode audio paths inside components.

## 9. Centralized Data Architecture

This is a critical requirement.

**Every wedding-specific detail must come from one centralized, strongly typed data source.**

Do not hardcode wedding content inside individual UI components.

For now, use static placeholder data. There is no backend or CMS requirement.

Create:

`src/data/wedding.ts`

Define a strongly typed wedding configuration object.

The data model should cover:

- Couple names.
- Monogram.
- Couple introduction.
- Portrait image paths.
- Invitation title.
- Invitation message.
- Wedding date.
- Display date.
- Ceremony information.
- Muhurtham.
- Multiple events.
- Venue name.
- Venue address.
- Venue image.
- Google Maps URL.
- Music URL.
- Music enablement.
- RSVP enablement.
- Wishes enablement.
- Calendar enablement.
- WhatsApp sharing enablement.
- Website URL.
- SEO title and description.
- Closing message.

Use sensible TypeScript interfaces or types.

Example structure:

```ts
export const wedding = {
   couple: {
      partnerOne: "Partner One",
      partnerTwo: "Partner Two",
      monogram: "P & P",
      introduction: "Together with our families...",
      portrait: "/images/placeholders/couple.jpg",
   },

   invitation: {
      title: "A Celebration of Love",
      message: "We joyfully invite you...",
      date: "2027-01-01",
      displayDate: "Friday, 1 January 2027",
   },

   events: [
      {
         id: "wedding",
         title: "Wedding Ceremony",
         date: "2027-01-01",
         startTime: "10:30",
         endTime: "11:00",
         muhurtham: "10:30 AM – 11:00 AM",
      },
   ],

   venue: {
      name: "Venue Name",
      address: "Venue address, Kerala, India",
      mapUrl: "",
      image: "/images/placeholders/venue.jpg",
   },

   media: {
      musicUrl: "/audio/wedding-music.mp3",
      enableMusic: true,
   },

   features: {
      enableRsvp: true,
      enableWishes: true,
      enableCalendar: true,
      enableWhatsappShare: true,
   },

   website: {
      url: "",
      title: "Wedding Invitation",
      description: "A celebration of love.",
   },

   closing: {
      message: "We would love to celebrate with you.",
   },
};
```

This is an illustrative starting point. Expand or refine the model as necessary.

All sample details must be obviously replaceable placeholders. Do not accidentally present sample information as real wedding information.

### Data consumption

- The page should compose the invitation sections.
- Pass relevant data into components through props.
- Components should not independently import the global wedding data.
- Feature visibility should be controlled through configuration.
- Derived information such as monograms, calendar content and share messages should be generated from the configuration.
- Keep the model flexible enough to add or remove events without rewriting the UI.

The objective is that changing the data file should be enough to update the entire invitation.

## 10. Suggested Project Structure

Use a clean, maintainable structure similar to:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── invitation/
│   │   ├── InvitationCover.tsx
│   │   ├── CoupleSection.tsx
│   │   ├── InvitationMessage.tsx
│   │   ├── EventDetails.tsx
│   │   ├── VenueSection.tsx
│   │   └── ClosingSection.tsx
│   │
│   ├── overlays/
│   │   ├── RsvpModal.tsx
│   │   ├── WishesModal.tsx
│   │   └── ModalShell.tsx
│   │
│   ├── shared/
│   │   ├── MusicControl.tsx
│   │   ├── ShareControl.tsx
│   │   └── SectionDivider.tsx
│   │
│   └── ui/
│
├── data/
│   └── wedding.ts
│
├── hooks/
│   └── useWeddingAudio.ts
│
├── lib/
│   ├── calendar.ts
│   └── sharing.ts
│
└── types/
    └── wedding.ts

public/
├── images/
│   └── placeholders/
└── audio/
```

You may improve this structure if there is a clear architectural reason.

Avoid unnecessary abstractions and overengineering.

## 11. Placeholder Assets

Do not spend time sourcing or generating actual wedding photographs.

Use attractive placeholder assets for:

- Couple portrait.
- Venue photograph.
- Any optional decorative imagery.

Create placeholders with the correct aspect ratios and image treatment so real images can replace them later without changing the layouts.

Do not use broken image URLs.

Use local placeholders or reliable local CSS-based placeholders.

The design must still look polished with placeholder assets.

## 12. Responsive Design

Mobile-first implementation is essential.

The website will primarily be opened through WhatsApp links on mobile devices.

Requirements:

- Excellent mobile experience.
- Proper viewport handling.
- Responsive typography.
- Comfortable touch targets.
- No horizontal overflow.
- Correct image cropping.
- Responsive overlays.
- Desktop layouts should feel intentionally designed, not merely stretched mobile layouts.

Do not constrain the entire website to a narrow mobile-only frame on desktop.

Use a suitable content width and generous whitespace.

## 13. Animation and Performance

Use Motion for subtle animation.

Animation guidelines:

- Gentle fade-ins.
- Small vertical reveal movements.
- Smooth invitation-cover transition.
- Subtle image reveal.
- Viewport-based section animations.
- Smooth modal transitions.

Avoid:

- Excessive parallax.
- Constant decorative movement.
- Large numbers of animated particles.
- Heavy animation libraries beyond the selected stack.
- Animations that delay access to wedding details.

Respect `prefers-reduced-motion`.

Optimize images and avoid unnecessary client-side rendering.

Use server components wherever possible. Keep interactive components as client components only when required.

## 14. SEO and Sharing

Configure metadata using the centralized wedding data.

Include:

- Dynamic page title.
- Meta description.
- Open Graph title.
- Open Graph description.
- Open Graph image placeholder.
- Twitter card metadata.

The invitation should generate a good preview when shared through WhatsApp and other messaging platforms.

## 15. Accessibility and Quality

Ensure:

- Semantic HTML.
- Accessible buttons and forms.
- Proper keyboard navigation.
- Visible focus states.
- Appropriate colour contrast.
- Accessible modal interactions.
- Reduced-motion support.
- Graceful handling of missing optional assets.

Avoid unnecessary console errors and hydration mismatches.

## 16. Reference Website

Use the supplied `a.html` wedding invitation as a reference for the overall invitation concept and functionality.

Preserve the useful ideas:

- A dedicated invitation cover.
- An explicit "Open Invitation" interaction.
- A transition into the main invitation.
- A vertical scrolling experience.
- Clearly presented wedding and venue details.
- Music control.
- RSVP and wishes interactions.
- Calendar functionality.
- WhatsApp sharing.

However, do not copy its visual design, CSS, layout, implementation or decorative styling.

The new website must have its own cohesive Contemporary Kasavu identity.

## 17. Final Expected Result

Build a complete, functional, visually polished wedding invitation website.

Prioritize these qualities in order:

1. Excellent visual design and composition.
2. A memorable but restrained opening experience.
3. Elegant typography and spacing.
4. Excellent mobile responsiveness.
5. Clean and maintainable component architecture.
6. Fully centralized wedding content.
7. Functional interactive overlays and actions.
8. Performance and accessibility.

Do not stop after creating a static mockup.

Implement the actual interactions, responsive layouts, data model and transitions.

Use realistic placeholder content and assets.

Before finishing, verify the application runs, all sections render correctly, feature toggles work, overlays behave correctly and the website remains polished at mobile and desktop sizes.

The final result should feel like a premium digital wedding invitation designed specifically for a contemporary Hindu Kerala wedding — understated, warm, personal and timeless.
