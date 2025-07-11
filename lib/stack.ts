import { StackClientApp, StackServerApp } from '@stackframe/stack'

export const stackClientApp = new StackClientApp({
  tokenStore: 'nextjs-cookie',
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID || 'your-project-id',
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY || 'your-publishable-key',
})

export const stackServerApp = new StackServerApp({
  tokenStore: 'nextjs-cookie',
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID || 'your-project-id',
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY || 'your-publishable-key',
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY || 'your-secret-key',
})