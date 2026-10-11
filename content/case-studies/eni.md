# Case study: Elizabeth Norman International

> Draft for the Leyline site. Facts are drawn from the project repo (`~/code/liz`). Liz has given permission to use ENI's name. Anything marked **[check]** still needs confirming.

## One line

A specialist recruiter's website, rebuilt so candidates and employers find their route in one click, and so the team can update it without a developer.

## Client

Elizabeth Norman International (ENI): specialist recruiter for insight, research and analytics, founded 1989.

## The problem

- **Hard to use.** A 2022 WordPress site with nine equal menu items, a generic headline and job search buried under a long marketing page.
- **Hard to apply.** Candidates had to create an account and password before applying for a role.
- **Out of date.** Closed jobs stayed published, test pages were public, and one article showed an error in place of its image.
- **Hard to run.** The person who had run the site was unavailable, and the team found WordPress admin overwhelming. Changing a client logo meant editing theme files.

## What we did

**Website**
- Redesigned Home, Find a role, job pages, Hire talent, About, Inclusive hiring, Resources, client stories and articles, keeping ENI's colours and logo.
- Cut the main menu from nine items to five, with one route each for candidates and employers.
- Simplified applications to a single form with an optional CV: no account, no password.
- Added 117 redirects, so every old link still lands somewhere useful.
- Stopped search engines listing closed jobs; the sitemap now holds current roles only.
- Removed an analytics tracker nobody was using.
- Checked 26 pages on desktop and mobile, with automated accessibility tests on every release.

**Editing**
- **Client logos.** A single screen to add, name, reorder or remove a logo; it updates Home and Hire talent together. Live.
- **Articles and pages.** A simplified workspace for writing an article and updating the main pages through labelled fields, without navigating WordPress menus. Live.

## Outcome

- A logo change now takes 2 minutes instead of a developer.
- Old links kept working, with no loss of applications or enquiries during release.
- Live 3–4 October 2026.

Quote: none yet. Add one if Liz provides it.

## Live site

[elizabethnorman.com](https://elizabethnorman.com)

| Before | After |
|---|---|
| `eni/before-home.jpg` (August 2026) | `eni/after-home.jpg` (live, October 2026) |

More before/after pairs (job page, employers, about) are in `~/code/liz/exports/comparison-captures/` if the case study needs them.

## Scale (for the "project sizes" block)

Small: a website refresh plus a simplified editor on the client's existing WordPress. About 4 weeks of active work. The calendar span was 7 weeks, including a 4-week pause waiting on the client. **[check: price band]**
