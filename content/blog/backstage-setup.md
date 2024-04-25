---
title: Setting up a local Backstage instance
date: "2024-04-25"
draft: false
slug: "/backstage-setup-04-2024/"
category: "Tooling"
tags:
  - "JavaScript"
  - "Explainer"
  - "Web Development"
  - "Backstage"
  - "Tooling"
description: "How do I get an MVP of Backstage up and running?"
---

[Backstage](https://backstage.io), a tool for building developer portals, is evolving quickly and breaking stuff. Great for them! Not so great if you, like me, are trying to create content for a workshop about what it is and how to use it. The docs have yet to catch up with all the [new changes](https://backstage.io/docs/releases/v1.26.0) and there are more coming. When things didn't "just work," I turned to the [repo's issues](https://github.com/backstage/backstage/issues/) and [the Discord](https://discord.com/channels/687207715902193673/705123584468582400) for help. 

This post outlines how I got a local Backstage instance (v1.26.0) set up on Mac (Sonoma 14.4.1) with GitHub OAuth.

I did the basic set-up package per [the set-up docs](https://backstage.io/docs/getting-started/#1-create-your-backstage-app).

```bash
npx @backstage/create-app@latest
cd <app-name> && yarn dev
```
This starts up the back _and_ front ends. To stop the processes -- I always forget this so I'm writing it here to remind my future self -- type `command-C` into the terminal _twice_. Once for front end, once for back end.

No problem up to this point. I could sign in as a guest and see the demo:

![Basic Backstage demo UI](https://backstage.io/assets/images/portal-b6d936acea71e18b0f5a39d78b9c0195.png)

##  Signing in with GitHub
I wanted to link my GitHub to be able to use the Backstage feature I'm currently researching (creating components from templates). The Backstage docs suggested using GitHub OAuth to sign in and the [made it pretty easy to follow](https://backstage.io/docs/getting-started/config/authentication/). 

I chose to have both sign-in UI options on my local instance, so my `packages/app/src/App.tsx` is slightly different from the one in the docs. Note that the prop is called `providers` with an S and the value passed is an array, not an object.

```jsx
// packages/app/src/App.tsx

  components: {
    SignInPage: props => 
      <SignInPage 
        {...props}   
        auto 
        providers={['guest', {
        id: 'github-auth-provider',
          title: 'GitHub',
          message: 'Sign in using GitHub',
          apiRef: githubAuthApiRef,
      }]} />,
  },

``` 

This all worked for me - I had both sign-in options available and guest worked, but GitHub didn't.

### `Unknown auth provider 'github'`

Upon clicking the sign in button for GitHub, a pop-up showed me this error in a big JSON object:
```
{"error":{"name":"NotFoundError","message":"Unknown auth provider 'github'",
```

Deep in this [thread](https://github.com/backstage/backstage/issues/23748#issuecomment-2014867583), I saw that in the newest version of Backstage, you've got to import an auth module for whatever provider you're using.
```jsx
// packages/backend/src/index.ts

backend.add(import('@backstage/plugin-auth-backend-module-github-provider')); 
```
This information is sort of hidden in [the migration guide](https://backstage.io/docs/backend-system/building-backends/migrating/) and I never would have found it myself. Thanks to that line, I was able to see my GitHub icon in the pop-up and try to sign in. But then got a new error.

### `Login failed; caused by Error: The GitHub provider is not configured to support sign-in` 

I trawled the closed issues on the Backstage repo and saw that adding resolvers to the `app-config.yaml` file solved this for me:

```yaml
// app-config.yaml

auth:
  environment: development
  providers:
    guest: {}
    github:
      development:
        clientId: <CLIENT_ID>
        clientSecret: <CLIENT_SECRET>
+        signIn:
+          resolvers:
+            - resolver: emailMatchingUserEntityProfileEmail
+            - resolver: emailLocalPartMatchingUserEntityName
+            - resolver: usernameMatchingUserEntityName
```
Lo and behold, a new error!

### `Login failed; caused by Error: Login failed, user profile does not contain an email`

To solve this, 
1. I went into [my GitHub settings](https://github.com/settings/emails),
1. unchecked `Keep my email addresses private`,
1. went to [my profile page](https://github.com/settings/profile), 
1. and chose an email to make public 
1. then clicked `Update profile` at the bottom of the page.

I `command-C`'d twice, saved and restarted everything, and was able to sign into my GitHub! Hurrah! 


## Resources 

A [Backstage upgrade helper](https://backstage.github.io/upgrade-helper/?from=1.23.4&to=1.24.0) was sugggested in another comment and I imagine could be useful as the project continues to evolve.

This [issue about 1.24 breaking Github auth](https://github.com/backstage/backstage/issues/23748) was the origin of most of these solutions but [this fix](https://github.com/backstage/backstage/issues/23748#issuecomment-2012007166) did nothing for me because I didn't know where to import `getApi` from and [this one](https://github.com/backstage/backstage/issues/23748#issuecomment-2011502415), which suggests changing the authorization callback URL in the OAuth set-up on GitHub, didn't make any difference for me. Both URLs worked fine.