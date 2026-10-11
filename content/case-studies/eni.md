# Case study: Elizabeth Norman International

> Draft for the Leyline site. Facts are drawn from the project repo (`~/code/liz`); anything marked **[check]** needs confirming before publication, including ENI's permission to be named.

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
- **Page text.** Key page copy (headings, mission, introductions) is edited through labelled fields instead of raw layout code. Live **[check exact extent]**.
- **Articles and pages workspace.** A simplified screen for writing an article, updating a page and reviewing the job board. Built and tested; rollout awaits ENI's decision (mid-November). **[check before claiming]**

## Outcome

- Live 3–4 October 2026, about seven weeks from first audit (12 August). Follow-up changes went live on 6–7 October.
- Old links kept working, with no loss of applications or enquiries during release.
- "Liz is very happy with it." **[check: get a direct quote from Liz, with permission]**
- **[check: any measurable result since launch, e.g. applications per week or time to publish an article]**

## Screenshots

Before/after pairs already exist in `~/code/liz/exports/comparison-captures/`:

| Use | Before | After |
|---|---|---|
| Hero | `01-home-live-fold.png` | `01-home-refresh-fold.png` |
| Job page | `04-role-live-fold.png` | `04-role-refresh-fold.png` |
| Employers | `05-employers-live-fold.png` | `05-employers-refresh-fold.png` |
| Logo editor | — | `audit/post-launch-2026-10-03/production-logo-editor.jpg` (crop: it shows a staff name and unrelated plugin warnings) |

## Scale (for the "project sizes" block)

Medium: website redesign plus an editing tool, roughly 7 weeks, on the client's existing WordPress. **[check: price band]**
