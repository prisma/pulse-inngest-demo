# Pulse & Inngest Demo Project

This is a simple demo project, to show how you might set up Prisma Pulse with Inngest and NextJS, to run real-time, durable workflows with your serverless app.

This demo repo accompanies the blog article: [Build real-time, durable workflows with Pulse and Inngest](https://prisma.io/blog/build-real-time-durable-workflows-with-pulse-and-inngest)

## Prerequisites
To successfully run the project, you will need the following:

- An [Inngest](https://app.inngest.com/sign-up?ref=prisma-pulse-blog-post&utm_source=prisma&utm_medium=website&utm_campaign=prisma_pulse) account
- The **connection string** of a Pulse-ready database (if you don't have one yet, you can configure your database following the instructions in our [docs](https://www.prisma.io/docs/pulse/database-setup) or [use a Railway template](https://railway.app/template/pulse-pg?referralCode=VQ09uv))
- A **Pulse API key** which you can get by enabling Pulse in a project in your [Prisma Data Platform](https://pris.ly/pdp) account (learn more in the [docs](https://www.prisma.io/docs/platform/concepts/environments#api-keys))

If you would like to deploy the project live, you will also need:

- [A free Vercel account](https://vercel.com)
- [A free Railway account](https://railway.app)

## Get started

Pulse streams change events from your Postgres database and submit events to Inngest to trigger workflows and jobs.

NextJS is used in this demo app to be able to run the Inngest workflows, and also to provide a helpful UI for adding records to the database.

Follow the steps below to get both set up and running.

### Run locally

#### Pulse

1. Go into the `pulse` directory, and install dependencies: `npm install`
1. Rename the `.env.example` file to `.env` and set up your environment variables:
    1. `DATABASE_URL` is the connection string to your database (the same as above)
    1. `PULSE_API_KEY` is found in your [Prisma Data Platform](https://console.prisma.io/sign-up) account. See [the Pulse documentation](https://www.prisma.io/docs/platform/about#environment) for help in getting your API key.
    1. `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` are used to authenticate the service to Inngest in order to submit events. You hopefully set this up in an earlier step.
1. The Prisma schema file in this project contains a single User model. You can map this model to the database and create the corresponding User table using the following command: `npx prisma migrate dev --name init`
1. Generate the Prisma client: `npx prisma generate`
1. Run the Pulse service:
    1. `yarn build`
    1. `yarn start`

#### NextJS

1. Step into the `nextjs` directory, and install dependencies: `npm install`
1. Rename the `.env.example` file to `.env` and set up your environment variables:
    - `DATABASE_URL` is the connection string to your database
1. Generate the Prisma client: `npx prisma generate`
1. Run the NextJS service locally: `npm run dev` 
1. In a separate tab, run the Inngest service locally: `npx inngest-cli@latest dev` 
    - Open the Inngest DevServer at https://localhost:8288
1. Open a browser and navigate to https://localhost:3000


#### Run a test

You can run this complete demo app by setting up all services and then adding a user to the database. Pulse will detect the database change and submit the event to Inngest, which will, in turn, run a demo workflow.

1. Make sure all services are running (see instructions above for running each service)
    1. NextJS service
    2. Inngest service
    3. Pulse service
1. Open https://localhost:3000 in your browser - you should see a simple UI with a form
1. Enter a user name and email address, then click the button
1. Watch your terminal logs to observe the events. Prisma Pulse will detect the database change that was applied by NextJS, and submit an event to Inngest. Inngest will pick up the event, and initiate a workflow to onboard the new user. The code will not send real emails, but will simply demonstrate the functionality of the workflow.


### Deploy live

#### Pulse

1. Add this project to a new GitHub repo (you can use the same one as earlier)
1. Set up a new project and deploy live with Railway (you can test for free with a Hobby account)
    1. Don’t forget to include the `DATABASE_URL`, `PULSE_API_KEY`, `INNGEST_SIGNING_KEY` and `INNGEST_EVENT_KEY` environment variables

#### NextJS

1. Add this project to a new GitHub repo
1. Set up a new project and [deploy live with Vercel](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy) (you can test for free with a Hobby account)
    1. Don’t forget to include your `DATABASE_URL`
1. Sync your Vercel App with the [Inngest Vercel Integration](https://www.inngest.com/docs/deploy/vercel#deploying-to-vercel)
1. Create and save [an Inngest Event Key](https://www.inngest.com/docs/events/creating-an-event-key) and [Signing Key](https://www.inngest.com/docs/platform/signing-keys) to use in the next step (setting up Pulse)


#### Run a test

1. After deploying all services live (according to above instructions), browse to the URL given to your deployment by Vercel. It should look something like `your-app.vercel.app`
1. Add a user by entering a name and email address, then click the button
1. Take a look at the Vercel runtime logs and the Railway logs to observe the events as they are executed


## Getting help

Some helpful links in case you need help:

- [Prisma Documentation](https://www.prisma.io/docs)
- [Inngest Docs](https://www.inngest.com/docs)
- [Prisma Discord server](https://pris.ly/discord)
- [Inngest Discord server](https://inngest.com/discord)