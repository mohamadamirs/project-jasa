# Implementation Plan: Issue #2 - Redesign Hero and Services Section

## Objective
Redesign the Hero and Services sections in `src/pages/index.astro` to improve clarity, user engagement, and adhere to premium UI/UX standards as outlined in the Technical Design.

## Scope & Impact
- **Target File:** `src/pages/index.astro`
- **Impact:** Updates the visual presentation and copy of the primary landing page sections.

## Implementation Steps

### 1. Hero Section Redesign
- Update the headline and sub-headline for stronger, more direct copy (e.g., "Bangun Ekosistem Digital Premium untuk Bisnis Anda").
- Enhance the background visuals with subtle, modern tech patterns (dots/grid) while maintaining a clean aesthetic.
- Ensure CTA buttons have distinct visual hierarchy (Primary vs. Secondary) and utilize `active:scale-95`.

### 2. Services Section Redesign
- Restructure the service cards from simple text blocks to feature-rich cards.
- Add a bulleted list of 2-3 key features for each service (e.g., "Desain Premium", "SEO Ready", "Fast Loading").
- Apply `.hover-lift` and `.shine-effect` to the service cards to elevate the premium feel.

## Verification & Workflow
1. Create a new branch using git: `git checkout -b feature/redesign-hero-services`.
2. Implement the redesigned Hero and Services sections in `src/pages/index.astro`.
3. Verify the layout and functionality (especially on mobile breakpoints).
4. Run `npm run build` to ensure the project builds successfully.
5. Stage changes: `git add src/pages/index.astro`.
6. Commit changes: `git commit -m "feat(ui): redesign hero and services sections for better UX"`.
7. Push changes: `git push origin feature/redesign-hero-services`.
8. Create a Pull Request using GitHub CLI: `gh pr create --title "feat(ui): redesign hero and services sections" --body "Redesigned Hero and Services sections as per Issue #2 to improve clarity and user engagement."`.