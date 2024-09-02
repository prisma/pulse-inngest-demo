import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse';
import { Inngest } from 'inngest';

const apiKey: string = process.env.PULSE_API_KEY ?? '';
const prisma = new PrismaClient().$extends(withPulse({ apiKey }));

const eventKey: string = process.env.INNGEST_EVENT_KEY ?? '';
const inngest = new Inngest({ id: 'pulse-inngest-router', eventKey });

process.on('SIGINT', () => {
  process.exit(0);
});

async function main() {
  const stream = await prisma.user.stream({
    name: 'new-users-stream', // Add a stream name to enable delivery guarantee
    create: {}, // Filter for all 'create' events
  });

  process.on('exit', (code) => {
    console.log('Stopping stream');
    stream.stop();
  });

  for await (const event of stream) {
    inngest.send({
      id: event.id, // Use the unique event ID to enable idempotency
      name: `db/user.created`,
      data: event, // Add the Pulse change event
    });
  }
}

main();
