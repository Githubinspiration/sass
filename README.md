
<h1 align='center'>Saas UI</h1>

<p align='center'>The React component library for Startups</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@saas-ui/react">
    <img src="https://img.shields.io/npm/v/@saas-ui/react" alt="NPM">
  </a>
  <a href="https://www.npmjs.com/package/@saas-ui/react">
    <img src="https://img.shields.io/npm/dm/@saas-ui/react.svg" alt="npm downloads">
  </a>
  <img alt="MIT License" src="https://img.shields.io/github/license/saas-js/saas-ui"/>
  <a href="https://twitter.com/intent/follow?screen_name=saas_js">
    <img src="https://img.shields.io/twitter/follow/saas_js?style=social&logo=twitter" alt="follow on Twitter">
  </a>
</p>

<hr />

Saas UI is an advanced component library that helps you build essential SaaS functionality in hours instead of weeks.

It's build on top of Chakra UI and fully written in Typescript.

This repository contains all [open source components](/packages), aswell as the [documentation website](apps/website/pages/docs).

## Documentation

You can find the documentation on our website:

https://www.saas-ui.dev/docs/introduction

## Contributing & Support

Want to help? Great! Saas UI Core is almost ready, but we need more feedback to fine tune the final release.

If you like to support the project financially consider [Pre-ordering Saas UI Pro](https://appulse.gumroad.com/l/saas-ui-pro-pre-order), all funds will go to the further development of Saas UI. This will give you access to the development version and our private Discord server. As an early adopter you will get 50% discount on the final price, life-time access, free updates and a lot of love ❤️.

## Roadmap

Saas UI core v1.0 will be released in June.

Saas UI pro is in private beta. [Pre-order](https://appulse.gumroad.com/l/saas-ui-pro-pre-order) to get early access.

### Core

30+ essential open source components build on top of Chakra UI.
Including fully functional auth screens, forms (with react-hook-form), modal manager, and much more.

- [x] Finish all v1 core components and hooks
- [x] Full test coverage
- [x] React 18 support

### Pro

A premium frontend starter pack designed for SaaS products.
Complete source code available in a monorepo that can serve as a starting point for your project.

![theme-tokens](https://user-images.githubusercontent.com/32583/172424112-72bacfdd-17df-4024-81db-690dc47d0c81.png)

- [x] Example SaaS app (NextJS & Electron)
- [x] Authentication screens (Supabase/Magic/Clerk/Custom)
- [x] App layout
- [x] DataGrid with filtering/pagination
- [x] User profiles
- [x] Charts / Sparklines
- [x] Settings pages
- [x] Feature flags
- [x] Billing/subscription management (Paddle)
- [x] Mock graph api (MSW)
- [x] Custom color schemes

#### In progress
- [ ] Example pages (CRM, Inbox, CRUD)
- [ ] Onboarding flows
- [ ] Upselling flows (Trials, upgrades, etc)
- [ ] Saas UI themes
- [ ] File uploads

## Storybook

https://storybook.saas-ui.pro

Or run locally:

```bash
yarn storybook
```

## Build

```bash
yarn build:packages
```

## Website

Before running the website you need to build the props-docs by running this.

```bash
yarn build:props-docs
```

After that run the website with this command.

```bash
yarn w website dev
```

or

```bash
cd apps/website && yarn dev
```

## License

All code in this repository, accept for the Saas UI branding assets are licensed under MIT.
